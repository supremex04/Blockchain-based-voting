require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    sepolia: {
       url: process.env.RPC_URL,
       accounts: [process.env.PRIVATE_KEY],
      //  gas: 210000000,
      //  gasPrice: 800000000000,
    }
 },
};
