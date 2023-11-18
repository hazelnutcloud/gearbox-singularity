import { getContract } from "viem";
import { viemClient } from "../viem-client.js";

export const addresses = {
  chains: [
    {
      address: "0xdc21000028bbe39b113b1cd08d675590d1582cc7",
      chainId: 1,
    },
  ],
} as const;

export function getDataCompressorContract(chainId: number) {
  const address = addresses.chains.find((c) => c.chainId === chainId)?.address;
  if (!address) {
    return null;
  }
  return getContract({
    abi: DATA_COMPRESSOR_ABI,
    address,
    publicClient: viemClient,
  });
}

export const DATA_COMPRESSOR_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_addressProvider", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "CallerNotConfiguratorException", type: "error" },
  { inputs: [], name: "CallerNotControllerException", type: "error" },
  { inputs: [], name: "CallerNotPausableAdminException", type: "error" },
  { inputs: [], name: "CallerNotUnpausableAdminException", type: "error" },
  { inputs: [], name: "RegisteredCreditManagerOnlyException", type: "error" },
  { inputs: [], name: "RegisteredPoolOnlyException", type: "error" },
  { inputs: [], name: "ZeroAddressException", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newController",
        type: "address",
      },
    ],
    name: "NewController",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "acl",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "cmDescriptions",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractsRegister",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "controller",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_creditManager", type: "address" },
      { internalType: "address", name: "_allowedContract", type: "address" },
    ],
    name: "getAdapter",
    outputs: [{ internalType: "address", name: "adapter", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_creditManager", type: "address" },
      { internalType: "address", name: "borrower", type: "address" },
    ],
    name: "getCreditAccountData",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isSuccessful", type: "bool" },
          {
            internalType: "address[]",
            name: "priceFeedsNeeded",
            type: "address[]",
          },
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "address", name: "borrower", type: "address" },
          { internalType: "address", name: "creditManager", type: "address" },
          { internalType: "string", name: "cmName", type: "string" },
          { internalType: "address", name: "creditFacade", type: "address" },
          { internalType: "address", name: "underlying", type: "address" },
          { internalType: "uint256", name: "debt", type: "uint256" },
          {
            internalType: "uint256",
            name: "cumulativeIndexLastUpdate",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "cumulativeQuotaInterest",
            type: "uint128",
          },
          { internalType: "uint256", name: "accruedInterest", type: "uint256" },
          { internalType: "uint256", name: "accruedFees", type: "uint256" },
          { internalType: "uint256", name: "totalDebtUSD", type: "uint256" },
          { internalType: "uint256", name: "totalValue", type: "uint256" },
          { internalType: "uint256", name: "totalValueUSD", type: "uint256" },
          { internalType: "uint256", name: "twvUSD", type: "uint256" },
          {
            internalType: "uint256",
            name: "enabledTokensMask",
            type: "uint256",
          },
          { internalType: "uint256", name: "healthFactor", type: "uint256" },
          { internalType: "uint256", name: "baseBorrowRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "aggregatedBorrowRate",
            type: "uint256",
          },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "balance", type: "uint256" },
              { internalType: "bool", name: "isForbidden", type: "bool" },
              { internalType: "bool", name: "isEnabled", type: "bool" },
              { internalType: "bool", name: "isQuoted", type: "bool" },
              { internalType: "uint256", name: "quota", type: "uint256" },
              { internalType: "uint16", name: "quotaRate", type: "uint16" },
              {
                internalType: "uint256",
                name: "quotaCumulativeIndexLU",
                type: "uint256",
              },
            ],
            internalType: "struct TokenBalance[]",
            name: "balances",
            type: "tuple[]",
          },
          { internalType: "uint64", name: "since", type: "uint64" },
          { internalType: "uint256", name: "cfVersion", type: "uint256" },
          { internalType: "uint40", name: "expirationDate", type: "uint40" },
          { internalType: "address[]", name: "activeBots", type: "address[]" },
          { internalType: "uint256", name: "maxApprovedBots", type: "uint256" },
          {
            components: [
              { internalType: "uint8", name: "tokenIndex", type: "uint8" },
              { internalType: "uint40", name: "maturity", type: "uint40" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            internalType: "struct ScheduledWithdrawal[2]",
            name: "schedultedWithdrawals",
            type: "tuple[2]",
          },
        ],
        internalType: "struct CreditAccountData",
        name: "result",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "borrower", type: "address" }],
    name: "getCreditAccountsByBorrower",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isSuccessful", type: "bool" },
          {
            internalType: "address[]",
            name: "priceFeedsNeeded",
            type: "address[]",
          },
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "address", name: "borrower", type: "address" },
          { internalType: "address", name: "creditManager", type: "address" },
          { internalType: "string", name: "cmName", type: "string" },
          { internalType: "address", name: "creditFacade", type: "address" },
          { internalType: "address", name: "underlying", type: "address" },
          { internalType: "uint256", name: "debt", type: "uint256" },
          {
            internalType: "uint256",
            name: "cumulativeIndexLastUpdate",
            type: "uint256",
          },
          {
            internalType: "uint128",
            name: "cumulativeQuotaInterest",
            type: "uint128",
          },
          { internalType: "uint256", name: "accruedInterest", type: "uint256" },
          { internalType: "uint256", name: "accruedFees", type: "uint256" },
          { internalType: "uint256", name: "totalDebtUSD", type: "uint256" },
          { internalType: "uint256", name: "totalValue", type: "uint256" },
          { internalType: "uint256", name: "totalValueUSD", type: "uint256" },
          { internalType: "uint256", name: "twvUSD", type: "uint256" },
          {
            internalType: "uint256",
            name: "enabledTokensMask",
            type: "uint256",
          },
          { internalType: "uint256", name: "healthFactor", type: "uint256" },
          { internalType: "uint256", name: "baseBorrowRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "aggregatedBorrowRate",
            type: "uint256",
          },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "balance", type: "uint256" },
              { internalType: "bool", name: "isForbidden", type: "bool" },
              { internalType: "bool", name: "isEnabled", type: "bool" },
              { internalType: "bool", name: "isQuoted", type: "bool" },
              { internalType: "uint256", name: "quota", type: "uint256" },
              { internalType: "uint16", name: "quotaRate", type: "uint16" },
              {
                internalType: "uint256",
                name: "quotaCumulativeIndexLU",
                type: "uint256",
              },
            ],
            internalType: "struct TokenBalance[]",
            name: "balances",
            type: "tuple[]",
          },
          { internalType: "uint64", name: "since", type: "uint64" },
          { internalType: "uint256", name: "cfVersion", type: "uint256" },
          { internalType: "uint40", name: "expirationDate", type: "uint40" },
          { internalType: "address[]", name: "activeBots", type: "address[]" },
          { internalType: "uint256", name: "maxApprovedBots", type: "uint256" },
          {
            components: [
              { internalType: "uint8", name: "tokenIndex", type: "uint8" },
              { internalType: "uint40", name: "maturity", type: "uint40" },
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            internalType: "struct ScheduledWithdrawal[2]",
            name: "schedultedWithdrawals",
            type: "tuple[2]",
          },
        ],
        internalType: "struct CreditAccountData[]",
        name: "result",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_creditManager", type: "address" },
    ],
    name: "getCreditManagerData",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "cfVersion", type: "uint256" },
          { internalType: "address", name: "creditFacade", type: "address" },
          {
            internalType: "address",
            name: "creditConfigurator",
            type: "address",
          },
          { internalType: "address", name: "underlying", type: "address" },
          { internalType: "address", name: "pool", type: "address" },
          { internalType: "uint256", name: "totalDebt", type: "uint256" },
          { internalType: "uint256", name: "totalDebtLimit", type: "uint256" },
          { internalType: "uint256", name: "baseBorrowRate", type: "uint256" },
          { internalType: "uint256", name: "minDebt", type: "uint256" },
          { internalType: "uint256", name: "maxDebt", type: "uint256" },
          {
            internalType: "uint256",
            name: "availableToBorrow",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "collateralTokens",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "targetContract",
                type: "address",
              },
              { internalType: "address", name: "adapter", type: "address" },
            ],
            internalType: "struct ContractAdapter[]",
            name: "adapters",
            type: "tuple[]",
          },
          {
            internalType: "uint256[]",
            name: "liquidationThresholds",
            type: "uint256[]",
          },
          { internalType: "bool", name: "isDegenMode", type: "bool" },
          { internalType: "address", name: "degenNFT", type: "address" },
          {
            internalType: "uint256",
            name: "forbiddenTokenMask",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "maxEnabledTokensLength",
            type: "uint8",
          },
          { internalType: "uint16", name: "feeInterest", type: "uint16" },
          { internalType: "uint16", name: "feeLiquidation", type: "uint16" },
          {
            internalType: "uint16",
            name: "liquidationDiscount",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "feeLiquidationExpired",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "liquidationDiscountExpired",
            type: "uint16",
          },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint16", name: "rate", type: "uint16" },
              {
                internalType: "uint16",
                name: "quotaIncreaseFee",
                type: "uint16",
              },
              { internalType: "uint96", name: "totalQuoted", type: "uint96" },
              { internalType: "uint96", name: "limit", type: "uint96" },
              { internalType: "bool", name: "isActive", type: "bool" },
            ],
            internalType: "struct QuotaInfo[]",
            name: "quotas",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "interestModel",
                type: "address",
              },
              { internalType: "uint256", name: "version", type: "uint256" },
              { internalType: "uint16", name: "U_1", type: "uint16" },
              { internalType: "uint16", name: "U_2", type: "uint16" },
              { internalType: "uint16", name: "R_base", type: "uint16" },
              { internalType: "uint16", name: "R_slope1", type: "uint16" },
              { internalType: "uint16", name: "R_slope2", type: "uint16" },
              { internalType: "uint16", name: "R_slope3", type: "uint16" },
              {
                internalType: "bool",
                name: "isBorrowingMoreU2Forbidden",
                type: "bool",
              },
            ],
            internalType: "struct LinearModel",
            name: "lirm",
            type: "tuple",
          },
          { internalType: "bool", name: "isPaused", type: "bool" },
        ],
        internalType: "struct CreditManagerData",
        name: "result",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreditManagersV2List",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "cfVersion", type: "uint256" },
          { internalType: "address", name: "creditFacade", type: "address" },
          {
            internalType: "address",
            name: "creditConfigurator",
            type: "address",
          },
          { internalType: "address", name: "underlying", type: "address" },
          { internalType: "address", name: "pool", type: "address" },
          { internalType: "uint256", name: "totalDebt", type: "uint256" },
          { internalType: "uint256", name: "totalDebtLimit", type: "uint256" },
          { internalType: "uint256", name: "baseBorrowRate", type: "uint256" },
          { internalType: "uint256", name: "minDebt", type: "uint256" },
          { internalType: "uint256", name: "maxDebt", type: "uint256" },
          {
            internalType: "uint256",
            name: "availableToBorrow",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "collateralTokens",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "targetContract",
                type: "address",
              },
              { internalType: "address", name: "adapter", type: "address" },
            ],
            internalType: "struct ContractAdapter[]",
            name: "adapters",
            type: "tuple[]",
          },
          {
            internalType: "uint256[]",
            name: "liquidationThresholds",
            type: "uint256[]",
          },
          { internalType: "bool", name: "isDegenMode", type: "bool" },
          { internalType: "address", name: "degenNFT", type: "address" },
          {
            internalType: "uint256",
            name: "forbiddenTokenMask",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "maxEnabledTokensLength",
            type: "uint8",
          },
          { internalType: "uint16", name: "feeInterest", type: "uint16" },
          { internalType: "uint16", name: "feeLiquidation", type: "uint16" },
          {
            internalType: "uint16",
            name: "liquidationDiscount",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "feeLiquidationExpired",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "liquidationDiscountExpired",
            type: "uint16",
          },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint16", name: "rate", type: "uint16" },
              {
                internalType: "uint16",
                name: "quotaIncreaseFee",
                type: "uint16",
              },
              { internalType: "uint96", name: "totalQuoted", type: "uint96" },
              { internalType: "uint96", name: "limit", type: "uint96" },
              { internalType: "bool", name: "isActive", type: "bool" },
            ],
            internalType: "struct QuotaInfo[]",
            name: "quotas",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "interestModel",
                type: "address",
              },
              { internalType: "uint256", name: "version", type: "uint256" },
              { internalType: "uint16", name: "U_1", type: "uint16" },
              { internalType: "uint16", name: "U_2", type: "uint16" },
              { internalType: "uint16", name: "R_base", type: "uint16" },
              { internalType: "uint16", name: "R_slope1", type: "uint16" },
              { internalType: "uint16", name: "R_slope2", type: "uint16" },
              { internalType: "uint16", name: "R_slope3", type: "uint16" },
              {
                internalType: "bool",
                name: "isBorrowingMoreU2Forbidden",
                type: "bool",
              },
            ],
            internalType: "struct LinearModel",
            name: "lirm",
            type: "tuple",
          },
          { internalType: "bool", name: "isPaused", type: "bool" },
        ],
        internalType: "struct CreditManagerData[]",
        name: "result",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_pool", type: "address" }],
    name: "getPoolData",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "address", name: "underlying", type: "address" },
          { internalType: "address", name: "dieselToken", type: "address" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "uint256",
            name: "baseInterestIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableLiquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expectedLiquidity",
            type: "uint256",
          },
          { internalType: "uint256", name: "totalBorrowed", type: "uint256" },
          { internalType: "uint256", name: "totalDebtLimit", type: "uint256" },
          {
            components: [
              {
                internalType: "address",
                name: "creditManager",
                type: "address",
              },
              { internalType: "uint256", name: "borrowed", type: "uint256" },
              { internalType: "uint256", name: "limit", type: "uint256" },
              {
                internalType: "uint256",
                name: "availableToBorrow",
                type: "uint256",
              },
            ],
            internalType: "struct CreditManagerDebtParams[]",
            name: "creditManagerDebtParams",
            type: "tuple[]",
          },
          { internalType: "uint256", name: "totalAssets", type: "uint256" },
          { internalType: "uint256", name: "totalSupply", type: "uint256" },
          { internalType: "uint256", name: "supplyRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "baseInterestRate",
            type: "uint256",
          },
          { internalType: "uint256", name: "dieselRate_RAY", type: "uint256" },
          { internalType: "uint256", name: "withdrawFee", type: "uint256" },
          {
            internalType: "uint256",
            name: "lastBaseInterestUpdate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseInterestIndexLU",
            type: "uint256",
          },
          { internalType: "uint256", name: "version", type: "uint256" },
          { internalType: "address", name: "poolQuotaKeeper", type: "address" },
          { internalType: "address", name: "gauge", type: "address" },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint16", name: "rate", type: "uint16" },
              {
                internalType: "uint16",
                name: "quotaIncreaseFee",
                type: "uint16",
              },
              { internalType: "uint96", name: "totalQuoted", type: "uint96" },
              { internalType: "uint96", name: "limit", type: "uint96" },
              { internalType: "bool", name: "isActive", type: "bool" },
            ],
            internalType: "struct QuotaInfo[]",
            name: "quotas",
            type: "tuple[]",
          },
          {
            components: [
              { internalType: "address", name: "zapper", type: "address" },
              { internalType: "address", name: "tokenIn", type: "address" },
              { internalType: "address", name: "tokenOut", type: "address" },
            ],
            internalType: "struct ZapperInfo[]",
            name: "zappers",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "interestModel",
                type: "address",
              },
              { internalType: "uint256", name: "version", type: "uint256" },
              { internalType: "uint16", name: "U_1", type: "uint16" },
              { internalType: "uint16", name: "U_2", type: "uint16" },
              { internalType: "uint16", name: "R_base", type: "uint16" },
              { internalType: "uint16", name: "R_slope1", type: "uint16" },
              { internalType: "uint16", name: "R_slope2", type: "uint16" },
              { internalType: "uint16", name: "R_slope3", type: "uint16" },
              {
                internalType: "bool",
                name: "isBorrowingMoreU2Forbidden",
                type: "bool",
              },
            ],
            internalType: "struct LinearModel",
            name: "lirm",
            type: "tuple",
          },
          { internalType: "bool", name: "isPaused", type: "bool" },
        ],
        internalType: "struct PoolData",
        name: "result",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolsV1List",
    outputs: [
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "address", name: "underlying", type: "address" },
          { internalType: "address", name: "dieselToken", type: "address" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "name", type: "string" },
          {
            internalType: "uint256",
            name: "baseInterestIndex",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableLiquidity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expectedLiquidity",
            type: "uint256",
          },
          { internalType: "uint256", name: "totalBorrowed", type: "uint256" },
          { internalType: "uint256", name: "totalDebtLimit", type: "uint256" },
          {
            components: [
              {
                internalType: "address",
                name: "creditManager",
                type: "address",
              },
              { internalType: "uint256", name: "borrowed", type: "uint256" },
              { internalType: "uint256", name: "limit", type: "uint256" },
              {
                internalType: "uint256",
                name: "availableToBorrow",
                type: "uint256",
              },
            ],
            internalType: "struct CreditManagerDebtParams[]",
            name: "creditManagerDebtParams",
            type: "tuple[]",
          },
          { internalType: "uint256", name: "totalAssets", type: "uint256" },
          { internalType: "uint256", name: "totalSupply", type: "uint256" },
          { internalType: "uint256", name: "supplyRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "baseInterestRate",
            type: "uint256",
          },
          { internalType: "uint256", name: "dieselRate_RAY", type: "uint256" },
          { internalType: "uint256", name: "withdrawFee", type: "uint256" },
          {
            internalType: "uint256",
            name: "lastBaseInterestUpdate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseInterestIndexLU",
            type: "uint256",
          },
          { internalType: "uint256", name: "version", type: "uint256" },
          { internalType: "address", name: "poolQuotaKeeper", type: "address" },
          { internalType: "address", name: "gauge", type: "address" },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint16", name: "rate", type: "uint16" },
              {
                internalType: "uint16",
                name: "quotaIncreaseFee",
                type: "uint16",
              },
              { internalType: "uint96", name: "totalQuoted", type: "uint96" },
              { internalType: "uint96", name: "limit", type: "uint96" },
              { internalType: "bool", name: "isActive", type: "bool" },
            ],
            internalType: "struct QuotaInfo[]",
            name: "quotas",
            type: "tuple[]",
          },
          {
            components: [
              { internalType: "address", name: "zapper", type: "address" },
              { internalType: "address", name: "tokenIn", type: "address" },
              { internalType: "address", name: "tokenOut", type: "address" },
            ],
            internalType: "struct ZapperInfo[]",
            name: "zappers",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "interestModel",
                type: "address",
              },
              { internalType: "uint256", name: "version", type: "uint256" },
              { internalType: "uint16", name: "U_1", type: "uint16" },
              { internalType: "uint16", name: "U_2", type: "uint16" },
              { internalType: "uint16", name: "R_base", type: "uint16" },
              { internalType: "uint16", name: "R_slope1", type: "uint16" },
              { internalType: "uint16", name: "R_slope2", type: "uint16" },
              { internalType: "uint16", name: "R_slope3", type: "uint16" },
              {
                internalType: "bool",
                name: "isBorrowingMoreU2Forbidden",
                type: "bool",
              },
            ],
            internalType: "struct LinearModel",
            name: "lirm",
            type: "tuple",
          },
          { internalType: "bool", name: "isPaused", type: "bool" },
        ],
        internalType: "struct PoolData[]",
        name: "result",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_creditManager", type: "address" },
      { internalType: "address", name: "borrower", type: "address" },
    ],
    name: "hasOpenedCreditAccount",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newController", type: "address" },
    ],
    name: "setController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_cm", type: "address" },
      { internalType: "string", name: "description", type: "string" },
    ],
    name: "setCreditManagerDescription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
