import OpenAI from "openai";

export const functions = [
  { name: "get_asset_price", parameters: {} },
] satisfies OpenAI.Beta.Assistants.AssistantCreateParams.AssistantToolsFunction["function"][];
