import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.SEPOLIA_URL!,
        blockNumber: 4547153,
      },
      chainId: Number(process.env.CHAIN_ID)
      , mining: {
        mempool: {
          order: "fifo"
        },
        interval: [100, 1000]
      }
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      chainId: Number(process.env.CHAIN_ID),
      loggingEnabled: true,
      accounts: {
        mnemonic: process.env.MNEMONIC!.split("_").join(" ")
      },
      gasPrice: 3000,
      gasMultiplier: 1.5,
      timeout: 40000
    }
  },
  solidity: {
    compilers: [{
      version: "0.8.19", settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
    {
      version: "0.8.21", settings: {
        optimizer: {
          enabled: false
        }
      }
    }
    ]
  },
  paths: {
    sources: "./contracts/erc20",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;


require("./scripts/task")