import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const viemClient = createPublicClient({
  transport: http(),
  chain: mainnet,
  batch: {
    multicall: true,
  },
});
