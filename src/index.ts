import { Telegraf, Context } from "telegraf";
import { assertExists } from "./utils/asserts.js";
import OpenAI from "openai";
import { message } from "telegraf/filters";
import assistant from "../artifacts/assistant.json" assert { type: "json" };
import { createServer } from "node:http";
import { config } from "dotenv";
import { handleRun } from "./openai/handle-run.js";
config();

interface SingularityContext extends Context {
  openai: OpenAI;
  thread: OpenAI.Beta.Thread;
  assistant: OpenAI.Beta.Assistant;
}

const telegraf = new Telegraf<SingularityContext>(
  assertExists(process.env.TELEGRAM_BOT_TOKEN)
);

telegraf.use(async (ctx, next) => {
  const openai = new OpenAI({
    apiKey: assertExists(process.env.OPENAI_API_KEY),
  });
  ctx.openai = openai;
  ctx.thread = await openai.beta.threads.create();
  ctx.assistant = await openai.beta.assistants.retrieve(assistant.id);
  return next();
});

telegraf.command("start", (ctx) => {
  ctx.reply(
    "Welcome to Singularity! I am your personal assistant to the world of DeFi powered by the Gearbox Protocol. How can I help you today?"
  );
});

telegraf.on(message("text"), async (ctx) => {
  const message = await ctx.openai.beta.threads.messages.create(ctx.thread.id, {
    role: "user",
    content: ctx.message.text,
  });
  const run = await ctx.openai.beta.threads.runs.create(ctx.thread.id, {
    assistant_id: ctx.assistant.id,
  });

  const thinkMsg = await ctx.reply("Thinking...");

  const { result } = await handleRun({
    openai: ctx.openai,
    runId: run.id,
    threadId: ctx.thread.id,
  });

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

  await ctx.telegram.deleteMessage(ctx.chat.id, thinkMsg.message_id);

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
