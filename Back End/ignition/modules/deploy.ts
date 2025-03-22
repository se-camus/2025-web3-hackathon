import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RealMeTokenModule = buildModule("RealMeTokenModule", (m) => {
  const RealMeToken = m.contract("RealMeToken", ["0xf4a2452d358F8232236a5C3235873fbB34463303"]);
  return { RealMeToken };
});

export default RealMeTokenModule;