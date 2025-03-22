import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyModule3 = buildModule("MyModule3", (m) => {
  const myToken3 = m.contract("MyToken3", ["0xf4a2452d358F8232236a5C3235873fbB34463303"]);
  return { myToken3 };
});

export default MyModule3;