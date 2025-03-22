import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RealMeTokenModule = buildModule("RealMeTokenModule", (m) => {
  // Deploy MyToken3 first
  const RealMeToken = m.contract("RealMeToken", ["0xf4a2452d358F8232236a5C3235873fbB34463303"]);

  // Deploy Ballot after MyToken3, using its address
  const ballot = m.contract("Ballot", [["Candidate 1", "Candiate 2", "Candiate 3"],RealMeToken]);

  return { RealMeToken, ballot };
});

export default RealMeTokenModule;
