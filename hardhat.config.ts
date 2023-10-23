import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      loggingEnabled: true,
      accounts: [{ privateKey: process.env.PRIVATE_KEY!, balance: 10e21.toString() }],
      forking: {
        url: process.env.SEPOLIA_URL!,
        blockNumber: 18413100,
      },
      chainId: Number(process.env.CHAIN_ID)
      , mining: {
        mempool: {
          order: "fifo"
        },
        interval: [3000, 10e3]
      }
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      chainId: Number(process.env.CHAIN_ID),
      loggingEnabled: true,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        passphrase: process.env.PASS_PHRASE
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
  }
};

export default config;

