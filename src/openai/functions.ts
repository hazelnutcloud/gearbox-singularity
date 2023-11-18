import OpenAI from "openai";
import coingeckoCoins from "../../artifacts/coingecko-coins.json";

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
      const coin = coingeckoCoins.find(
        (coin) => coin.symbol.toLowerCase() === params.asset.toLowerCase()
      );
      if (!coin) {
        throw new Error("Unknown asset");
      }
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch price");
      }
      const json = (await res.json()) as { [key: string]: { usd?: number } };
      if (!json[coin.id]?.usd) {
        throw new Error("Failed to fetch price");
      }
      return json[coin.id].usd?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
] satisfies (OpenAI.Beta.Assistants.AssistantCreateParams.AssistantToolsFunction["function"] & {
  callback: (...args: any[]) => Promise<unknown>;
})[];
