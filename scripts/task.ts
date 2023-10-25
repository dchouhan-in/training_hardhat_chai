import { ethers } from "hardhat";
import { task } from "hardhat/config";

task("balances", "Prints the balances of all the addresses!").addParam("contract", "contract address").setAction(async (arg) => {

    const [address1, address2, address3, address4] = await ethers.getSigners()

    const contract = await ethers.getContractAt("ERC20Token", arg.contract)

    const balanceOf1 = await contract.balanceOf(address1.address)
    const balanceOf2 = await contract.balanceOf(address2.address)
    const balanceOf3 = await contract.balanceOf(address3.address)
    const balanceOf4 = await contract.balanceOf(address4.address)

    console.log("address1 - ", balanceOf1);
    console.log("address2 - ", balanceOf2);
    console.log("address3 - ", balanceOf3);
    console.log("address4 - ", balanceOf4);
})