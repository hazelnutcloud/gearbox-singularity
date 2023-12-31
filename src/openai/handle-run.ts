import OpenAI from "openai";
import { functions } from "./functions.js";

export type HandleRunResult =
  | {
      result: "completed";
      runId: string;
    }
  | {
      result: "failed";
    };

export async function handleRun({
  threadId,
  runId,
  openai,
  creditAccountAddress,
}: {
  threadId: string;
  runId: string;
  openai: OpenAI;
  creditAccountAddress: string;
}): Promise<HandleRunResult> {
  const status = await openai.beta.threads.runs.retrieve(threadId, runId);

  if (status.status === "completed") {
    return { result: "completed", runId };
  } else if (status.status === "requires_action") {
    if (!status.required_action) return { result: "failed" };

    const outputPromises: { toolCallId: string; promise: Promise<any> }[] = [];

    for (const toolCall of status.required_action.submit_tool_outputs
      .tool_calls) {
      const callback = functions.find(
        (f) => f.name === toolCall.function.name
      )?.callback;
      if (!callback) return { result: "failed" };
      const args = JSON.parse(toolCall.function.arguments);
      const output = callback(args, creditAccountAddress);
      outputPromises.push({ promise: output, toolCallId: toolCall.id });
    }
    let toolOutputs: { tool_call_id: string; output: any }[] = [];
    try {
      toolOutputs = await Promise.all(
        outputPromises.map(async ({ promise, toolCallId }) => {
          return {
            tool_call_id: toolCallId,
            output: await promise,
          };
        })
      );
    } catch (err) {
      console.error(err);
      return { result: "failed" };
    }

    const newRun = await openai.beta.threads.runs.submitToolOutputs(
      threadId,
      runId,
      {
        tool_outputs: toolOutputs,
      }
    );
    return await handleRun({
      threadId,
      runId: newRun.id,
      openai,
      creditAccountAddress,
    });
  } else if (status.status === "failed") {
    return { result: "failed" };
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await handleRun({ threadId, runId, openai, creditAccountAddress });
  }
}
