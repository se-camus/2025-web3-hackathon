import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyModule = buildModule("MyModule", (m) => {
  const myToken = m.contract("myToken", ["0xf4a2452d358F8232236a5C3235873fbB34463303"]);
  return { myToken };
});

export default MyModule;