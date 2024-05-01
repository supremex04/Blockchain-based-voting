const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("Voting", (m) => {

  const Voting = m.contract("Voting", [["Test1", "Test2", "Test3"], 1000]);
  return { Voting };
});
