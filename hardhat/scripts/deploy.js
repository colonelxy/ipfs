const {ethers} = require("hardhat");
require("dotenv").config({path: ".env"});

async function main() {
  const metadataURL = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5";

  const punksContract = await ethers.getContractFactory("LW3Punks");

  const deployedContract = await punksContract.deploy(metadataURL);
  await deployedContract.deployed();

  console.log("Anwani ya Kandarasi ya LW3Punks ni:", deployedContract.address);
};

main()
.then(() => process.exit(0))
.catch((e) => {
  console.error(e)
  process.exit(1)
})