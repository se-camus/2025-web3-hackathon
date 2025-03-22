import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RealMeTokenModule = buildModule("RealMeTokenModule", (m) => {
  // Use the existing RealMeToken contract at this address
  const realMeTokenAddress = "0x45E654E9Bd6921c444287D85530cD1f5072df711";

  // Deploy a new Ballot contract for each poll with unique IDs
  const ballot1 = m.contract(
    "Ballot",
    [["Candidate 1", "Candidate 2", "Candidate 3"], realMeTokenAddress],
    { id: "Ballot1" } // Unique ID for first poll
  );

  const ballot2 = m.contract(
    "Ballot",
    [["Option A", "Option B", "Option C"], realMeTokenAddress],
    { id: "Ballot2" } // Unique ID for second poll
  );

  return { ballot1, ballot2 };
});

export default RealMeTokenModule;
