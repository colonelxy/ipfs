const {ethers} = require("hardhat")
require("dotenv").config({path: ".env"})

async function main() {
  const metadataURL = "ipfs://Qmc6sj176D9QaWJrAtuZqdkafrhLrqEvRdkSTgBVm87STt"

  const PunksContract = await ethers.getContractFactory("LW3Punks")

  const deployedContract = await PunksContract.deploy(metadataURL)
  await deployedContract.deployed()

  console.log("Anwani ya Kandarasi ya LW3Punks ni:", deployedContract.address)
}

main()
.then(() => process.exit(0))
.catch((e) => {
  console.error(e)
  process.exit(1)
})