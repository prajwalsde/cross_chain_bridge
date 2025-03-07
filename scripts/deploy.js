const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with address: ${deployer.address}`);

    // Deploy Lock Contract on Scroll
    const LockContract = await ethers.getContractFactory("LockContract");
    const lock = await LockContract.deploy();
    await lock.waitForDeployment();
    console.log(`Lock Contract deployed at: ${await lock.getAddress()}`);

    // Deploy Bridge Contract on Vanar
    const BridgeContract = await ethers.getContractFactory("BridgeContract");
    const bridge = await BridgeContract.deploy();
    await bridge.waitForDeployment();
    console.log(`Bridge Contract deployed at: ${await bridge.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
