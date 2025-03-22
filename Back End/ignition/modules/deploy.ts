import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const deployModule = buildModule("DeployContracts2", (m) => {
  // Deploy MyToken3 first
  const myToken5 = m.contract("myToken5", ["0xf4a2452d358F8232236a5C3235873fbB34463303"]);

  // Deploy Ballot after MyToken3, using its address
  const ballot = m.contract("Ballot", [["Candidate 1", "Candiate 2", "Candiate 3"],myToken5]);

  return { myToken5, ballot };
});

export default deployModule;
