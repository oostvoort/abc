import { MUDChain, latticeTestnet, mudFoundry } from "@latticexyz/common/chains";
import { polygonMumbai, foundry } from "@wagmi/chains";

const polygonMumbaiOverride = {
  ...polygonMumbai,
  rpcUrls: {
    ...polygonMumbai.rpcUrls,
    default: {
      http: [
        "https://rpc-mumbai.maticvigil.com",
        "https://polygon-mumbai-bor.publicnode.com",
        "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      ],
      webSocket: [
        "wss://polygon-mumbai.gateway.tenderly.co"
      ]
    },
    public: {
      http: [
        "https://rpc-mumbai.maticvigil.com",
        "https://polygon-mumbai-bor.publicnode.com",
        "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      ],
      webSocket: [
        "wss://polygon-mumbai.gateway.tenderly.co"
      ]
    },
  }
}

const forkserver = {
  ...foundry,
  id: 439956433674,
  rpcUrls: {
    default: {
      http: [
        "https://fork.oostvoort.work",
      ],
      webSocket: [
        "wss://fork.oostvoort.work"
      ]
    },
    public: {
      http: [
        "https://fork.oostvoort.work",
      ],
      webSocket: [
        "wss://fork.oostvoort.work"
      ]
    },
  }
}

// If you are deploying to chains other than anvil or Lattice testnet, add them here
let supportedChains: MUDChain[] = [forkserver, polygonMumbaiOverride, latticeTestnet];

if (import.meta.env.DEV) {
  supportedChains = [mudFoundry, ...supportedChains]
}

export { supportedChains }
