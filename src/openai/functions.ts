import OpenAI from "openai";

export const functions = [
  {
    name: "get_asset_price",
    description: "Get the current price of an asset",
    parameters: {
      type: "object",
      properties: {
        asset: {
          type: "string",
          description: "The symbol of the asset to get the price of",
        },
      },
      required: ["asset"],
    },
    callback: async (params: { asset: string }) => {
      return "2,000";
    },
  },
] satisfies (OpenAI.Beta.Assistants.AssistantCreateParams.AssistantToolsFunction["function"] & {
  callback: (...args: any[]) => Promise<unknown>;
})[];
