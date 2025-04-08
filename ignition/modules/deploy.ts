import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" }); // Adjust if needed
console.log("PUBLIC_ADDRESS:", process.env.PUBLIC_ADDRESS)
const RealMeTokenModule = buildModule("RealMeTokenModule", (m) => {
  // Use the RealMeToken contract address from the environment variable
  const realMeTokenAddress = m.contract("RealMeToken", [String(process.env.PUBLIC_ADDRESS)]);
  
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
