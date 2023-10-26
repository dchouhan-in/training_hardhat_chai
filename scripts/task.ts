import { task } from "hardhat/config";

task("balances", "Prints the balances of all the addresses!")
    .addParam("contract", "contract address")
    .addParam("count", "number of addresses to query!")
    .setAction(async (arg) => {

        const signers: Array<any> = await ethers.getSigners()
        const contract = await ethers.getContractAt("ERC20Token", arg.contract)

        for (const signer of signers.slice(0, arg.count)) {
            const balance = await contract.balanceOf(signer.address)
            console.log(signer.address, "-", balance);
        }

    })

