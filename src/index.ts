import "dotenv/config";
import { Telegraf, Context, session } from "telegraf";
import { SQLite } from "@telegraf/session/sqlite";
import { assertExists } from "./utils/asserts.js";
import OpenAI from "openai";
import { message } from "telegraf/filters";
import assistant from "../artifacts/assistant.json" assert { type: "json" };
import { createServer } from "node:http";
import { handleRun } from "./openai/handle-run.js";
import { isAddress } from "./utils/address.js";

interface SingularityContext extends Context {
  openai: OpenAI;
  thread: OpenAI.Beta.Thread;
  assistant: OpenAI.Beta.Assistant;
  session: {
    creditAccountAddress: string;
    threadId: string;
  };
}

const telegraf = new Telegraf<SingularityContext>(
  assertExists(process.env.TELEGRAM_BOT_TOKEN)
);

const store = SQLite<SingularityContext["session"]>({
  filename: "/litefs/singularity.db",
});

telegraf.use(session({ store: store as any }));

telegraf.use(async (ctx, next) => {
  const openai = new OpenAI({
    apiKey: assertExists(process.env.OPENAI_API_KEY),
  });
  ctx.openai = openai;
  if (ctx.session) {
    ctx.thread = await openai.beta.threads.retrieve(ctx.session.threadId);
  } else {
    ctx.thread = await openai.beta.threads.create();
    ctx.session = {
      threadId: ctx.thread.id,
      creditAccountAddress: "",
    };
  }
  ctx.assistant = await openai.beta.assistants.retrieve(assistant.id);
  return next();
});

telegraf.command("start", async (ctx) => {
  console.log("start command received", ctx.chat.id);
  await ctx.reply(
    "Welcome to GearboxGPT! I am here to help you use the Gearbox Protocol ⚙️🤖 Please enter your credit account address to get started.",
    {
      reply_markup: {
        force_reply: true,
      },
    }
  );
});

telegraf.command("forget", async (ctx) => {
  console.log("forget command received", ctx.chat.id);
  const newThread = await ctx.openai.beta.threads.create();
  ctx.session.threadId = newThread.id;
  await ctx.reply(
    "I've wiped my memory of our past conversations. Let's start over. 😇"
  );
});

telegraf.on(message("text"), async (ctx) => {
  console.log("message received", ctx.chat.id, ctx.message.text, ctx.session);

  if (isAddress(ctx.message.text) && !ctx.session.creditAccountAddress) {
    ctx.session.creditAccountAddress = ctx.message.text;
    return await ctx.reply(
      "Thank you! You can now start using Gearbox Singularity. 🥳"
    );
  }

  const prevRuns = await ctx.openai.beta.threads.runs.list(ctx.thread.id);

  let runId: string | undefined;
  let thinkMsg: Awaited<ReturnType<typeof ctx.reply>> | undefined;

  for (const prevRun of prevRuns.data) {
    if (prevRun.status === "in_progress") {
      thinkMsg = await ctx.reply(
        "Hold on, I'm still thinking about your previous request... 🤔"
      );
      runId = prevRun.id;
      break;
    }
  }

  if (!runId) {
    await ctx.openai.beta.threads.messages.create(ctx.thread.id, {
      role: "user",
      content: ctx.message.text,
    });

    const run = await ctx.openai.beta.threads.runs.create(ctx.thread.id, {
      assistant_id: ctx.assistant.id,
    });
    runId = run.id;

    thinkMsg = await ctx.reply("Let me think... 🤔");
  }

  let result;

  try {
    ({ result } = await handleRun({
      openai: ctx.openai,
      runId,
      threadId: ctx.thread.id,
    }));
  } catch (err) {
    console.error(err);
    result = "failed";
  } finally {
    if (thinkMsg) {
      await ctx.telegram.deleteMessage(ctx.chat.id, thinkMsg.message_id);
    }
  }

  if (result === "failed") {
    await ctx.reply(
      "Sorry, I could not understand your request. Please try again."
    );
    return;
  }

  const messages = await ctx.openai.beta.threads.messages.list(ctx.thread.id, {
    order: "desc",
    limit: 1,
  });

  if (messages.data[0].content[0].type === "text") {
    await ctx.reply(messages.data[0].content[0].text.value);
  } else {
    await ctx.replyWithPhoto(
      `https://beta.openai.com/files/${messages.data[0].content[0].image_file.file_id}`
    );
  }
});

const server = createServer(
  await telegraf.createWebhook({
    domain: "https://singularity.fly.dev",
  })
);

server.listen(3000, "0.0.0.0", undefined, () => {
  console.log("Listening on port 3000");
});
