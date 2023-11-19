import OpenAI from "openai";
import coingeckoCoins from "../../artifacts/coingecko-coins.json" assert { type: "json" };
import { getDataCompressorContract } from "../contracts/data-compressor.js";
import { jsonBigIntSerializer } from "../utils/json-bigint.js";

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
      if (!json[coin.id] || !json[coin.id].usd) {
        throw new Error("Failed to fetch price");
      }
      return json[coin.id].usd!.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 5,
      });
    },
  },
  {
    name: "get_pools",
    description:
      "Get information about all pools in gearbox protocol where passive lenders can earn low-risk APY by lending single-assets",
    parameters: {
      type: "object",
      properties: {},
    },
    async callback() {
      const contract = getDataCompressorContract(1);
      if (!contract) throw new Error("Failed to get contract");

      const poolsList = await contract.read.getPoolsV1List();

      return JSON.stringify(poolsList, jsonBigIntSerializer);
    },
  },
  {
    name: "get_strategies",
    description:
      "Get information about all strategies in gearbox protocol where active traders can use leverage to trade or farm on different assets",
    parameters: {
      type: "object",
      properties: {},
    },
    async callback() {
      // TODO: implement
      const hardCodedStrategies = [
        {
          name: "Convex TriCRV",
          maxRoi: "108.72%",
          collateralAssets: ["crvUSD", "ETH", "CRV", "crvUSDETHCRV"],
          maxLeverage: "6x",
        },
        {
          name: "Lido stETH",
          maxRoi: "26.20%",
          collateralAssets: ["ETH", "STETH", "USDC", "DAI"],
          maxLeverage: "18x",
        },
        {
          name: "Convex Lusd3Crv",
          maxRoi: "3.08%",
          collateralAssets: ["LUSD", "DAI", "USDC", "USDT", "3Crv"],
          maxLeverage: "10x",
        },
        {
          name: "Convex Frax3Crv",
          maxRoi: "1.29%",
          collateralAssets: ["FRAX", "USDC", "USDT", "DAI", "FRAX3CRV"],
          maxLeverage: "10x",
        },
        {
          name: "Convex FRAXUSDC",
          maxRoi: "47.27%",
          collateralAssets: ["FRAX", "USDC", "DAI", "crvFRAX", "WBTC"],
          maxLeverage: "10x",
        },
        {
          name: "Convex 3crypto",
          maxRoi: "50.24%",
          collateralAssets: ["USDC", "ETH", "WBTC", "crvUSDTWBTCWETH"],
          maxLeverage: "8x",
        },
        {
          name: "Convex LDOETH",
          maxRoi: "3.59%",
          collateralAssets: ["LDO", "ETH", "LDOETH", "STETH"],
          maxLeverage: "6x",
        },
        {
          name: "Convex CVXETH",
          maxRoi: "99.97%",
          collateralAssets: ["CRV", "ETH", "CVX", "crvCVXETH", "STETH"],
          maxLeverage: "6x",
        },
        {
          name: "Yearn DAI",
          maxRoi: "31.80%",
          collateralAssets: ["DAI", "USDC", "ETH", "WBTC"],
          maxLeverage: "10x",
        },
      ];
      return JSON.stringify(hardCodedStrategies);
    },
  },
  {
    name: "enter_strategy",
    description: "Enter one of the strategies in gearbox protocol",
    parameters: {
      type: "object",
      properties: {
        strategy: {
          type: "string",
          description: "The name of the strategy to enter",
        },
        leverage: {
          type: "string",
          description: "The amount of leverage to use",
        },
        collateral: {
          type: "string",
          description: "The amount of collateral to use",
        },
      },
      required: ["strategy", "leverage", "collateral"],
    },
    async callback(
      params: {
        strategy: string;
        leverage: string;
        collateral: string;
      },
      creditAccountAddress?: string
    ) {
      // TODO: implement
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "Strategy entered successfully";
    },
  },
] satisfies (OpenAI.Beta.Assistants.AssistantCreateParams.AssistantToolsFunction["function"] & {
  callback: (...args: any[]) => Promise<unknown>;
})[];
