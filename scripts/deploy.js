// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

const hre = require("hardhat");

async function main() {
  const Voting =  await hre.ethers.getContractFactory("Voting");
  const Voting_ = await Voting.deploy(["Test1", "Test2", "Test3", "Test4"], 30);

  await Voting_.deployed();
  console.log(`Contract address: ${Voting_.address}`);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
