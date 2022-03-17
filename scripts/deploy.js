const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );

    // We get the contract to deploy
    const Greeter = await hre.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");
  
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();

    await greeter.deployed();
    await marketplace.deployed();

    console.log("Greeter deployed to:", greeter.address);
    console.log("Marketplace deployed to:", marketplace.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });