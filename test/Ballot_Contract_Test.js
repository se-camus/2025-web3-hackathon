
const { expect } = require("chai");

describe("Ballot Contract", function () {
  let Ballot, ballot, realMeToken, owner, otherAccount;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();

    // Deploy RealMeToken
    const RealMeToken = await ethers.getContractFactory("RealMeToken");
    realMeToken = await RealMeToken.deploy(owner);
    await realMeToken.waitForDeployment();

    // Deploy Ballot
    Ballot = await ethers.getContractFactory("Ballot");
    const proposals = ["Proposal 1", "Proposal 2", "Proposal 3"];
    ballot = await Ballot.deploy(
      proposals,
      realMeToken.getAddress(),
    );
    await ballot.waitForDeployment();
  });

  it("Should initialize with the correct proposals", async function () {
    const proposal1 = await ballot.proposals(0);
    const proposal2 = await ballot.proposals(1);
    const proposal3 = await ballot.proposals(2);
    function formatBytes32String(text) {
      const buffer = Buffer.alloc(32); // Create a buffer of 32 bytes
      buffer.write(text); // Write the string into the buffer
      return "0x" + buffer.toString("hex"); // Convert the buffer to a hex string
    }
    const proposalsformat = [
      formatBytes32String("Proposal 1"),
      formatBytes32String("Proposal 2"),
      formatBytes32String("Proposal 3"),
    ];
  
    expect([proposal1[0], proposal2[0], proposal3[0]]).to.deep.equal(proposalsformat);
    expect([proposal1[1], proposal2[1], proposal3[1]]).to.deep.equal([0n,0n,0n]);
  });
  
  it("Should not allow voting with no token", async function () {

    await expect(ballot.connect(otherAccount).vote(2)).to.be.revertedWith("You must own a token to vote.");
  });
  it("Should allow voting with a token", async function () {
    const uniqueID = 1;
await realMeToken.safeMint(uniqueID, otherAccount.address);
    expect(await realMeToken.balanceOf(otherAccount.address)).to.equal(1);

    await ballot.connect(otherAccount).vote(0); // Vote for Proposal 1

    const proposal = await ballot.proposals(0);
    expect(proposal[1]).to.equal(1n); // Check that Proposal 1 has 1 vote
  });

  it("Should not allow double voting", async function () {
    const uniqueID = 1;
await realMeToken.safeMint(uniqueID, otherAccount.address);
    expect(await realMeToken.balanceOf(otherAccount.address)).to.equal(1);
    await ballot.connect(otherAccount).vote(0); // Vote for Proposal 1
    const proposal = await ballot.proposals(0);
    expect(proposal[1]).to.equal(1n); // Check that Proposal 1 has 1 vote

    await expect(ballot.connect(otherAccount).vote(0)).to.be.revertedWith("You already voted.");
  });
});
// Mint a token to the voter
