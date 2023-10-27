import { ethers, run } from "hardhat";
import { ERC20Token } from "../typechain-types";

async function main() {

  const tokenName = "TEST"
  const tokenSymbol = "TS"

  const contract: ERC20Token = await ethers.deployContract("ERC20Token", [tokenName, tokenSymbol]);

  await contract.waitForDeployment();

  console.log(
    `contract deployed for token - , ${await contract.name()} | ${await contract.symbol()}`
  );

  console.log("Address - ", await contract.getAddress());

  await run("verify:verify", {
    address: await contract.getAddress(),
    constructorArguments: [tokenName, tokenSymbol],
  });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
