import { expect } from "chai";
import { artifacts, ethers } from "hardhat";
import { ERC20Token } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

// const ERC20Token = artifacts.require("ERC20Token");




describe("ERC20 contract", () => {
    let hardhatToken: ERC20Token
    let tokenName = "TEST"

    let tokenSymbol = "TS"
    let owner: HardhatEthersSigner
    let address1: HardhatEthersSigner
    let address2: HardhatEthersSigner


    before("Deploy Contract!", async () => {
        [owner, address1, address2] = await ethers.getSigners();

        hardhatToken = await ethers.deployContract("ERC20Token", [tokenName, tokenSymbol], owner);
        await hardhatToken.waitForDeployment();

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })

    it("should have the correct name and symbol", async () => {
        const name = await hardhatToken.name();
        const symbol = await hardhatToken.symbol();
        expect(name).to.equal(tokenName)
        expect(symbol).to.equal(tokenSymbol)
    });

    it("should have the correct total supply", async () => {
        const totalSupply = await hardhatToken.totalSupply();
        expect(totalSupply).to.equal(1000)
    });

    it("should have the correct decimals", async () => {
        const decimals = await hardhatToken.decimals();
        expect(decimals).to.equal(6)
    });

    it("should mint tokens to the owner", async () => {
        await (await hardhatToken._mint(owner, 100)).wait()
        const balance = await hardhatToken.balanceOf(owner)
        expect(balance).equal(1100)
    });

    it("should transfer tokens between accounts", async () => {
        const amount = 100;
        const initialBalanceOwner = await hardhatToken.balanceOf(owner);
        const initialBalanceRecipient = await hardhatToken.balanceOf(address1);

        await (await hardhatToken.transfer(address1, amount, { from: owner })).wait();


        const finalBalanceOwner = await hardhatToken.balanceOf(owner);
        const finalBalanceRecipient = await hardhatToken.balanceOf(address1);

        expect(Number(finalBalanceOwner)).equal(Number(initialBalanceOwner) - amount);
        expect(Number(finalBalanceRecipient)).equal(Number(initialBalanceRecipient) + amount);
    });

    it("should approve and transfer tokens on behalf of an owner", async () => {

        const amount = 50;

        // Approve the spender to spend tokens on behalf of the owner
        await (await hardhatToken.approve(address1, amount, { from: owner })).wait();

        // Check the allowance
        const allowance = await hardhatToken.allowance(owner, address1);

        expect(allowance).equal(amount);

        // Transfer tokens from the owner to another account using the approved spender
        const initialBalanceOwner = await hardhatToken.balanceOf(owner);

        await (await hardhatToken.connect(address1).transferFrom(owner, address2, amount)).wait();

        const finalBalanceOwner = await hardhatToken.balanceOf(owner);
        const finalBalanceRecipient = await hardhatToken.balanceOf(address2);

        expect(
            finalBalanceOwner).equal(Number(initialBalanceOwner) - amount) // initial balance should be reduced by amount of the owner

        expect(
            finalBalanceRecipient).equal(amount) // Recipient had 0 tokens, 50 were transferred
    });



});
