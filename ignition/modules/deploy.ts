import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RealMeTokenModule = buildModule("RealMeTokenModule", (m) => {
  // Use the existing RealMeToken contract at this address
  // Deploy MyToken3 first
  const realMeTokenAddress = m.contract("RealMeToken", ["0xf4a2452d358F8232236a5C3235873fbB34463303"]);
  // Deploy a new Ballot contract for each poll with unique IDs
  const ballot1 = m.contract(
    "Ballot",
    [["Candidate 1", "Candidate 2", "Candidate 3","Candidate 4"], realMeTokenAddress],
    { id: "Ballot1" } // Unique ID for first poll
  );

  const ballot2 = m.contract(
    "Ballot",
    [["Option A", "Option B", "Option C","Option D"], realMeTokenAddress],
    { id: "Ballot2" } // Unique ID for second poll
  );

  return { ballot1, ballot2 };
});

export default RealMeTokenModule;
