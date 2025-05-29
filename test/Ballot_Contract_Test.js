const { expect } = require("chai");

// Helper function to format strings into bytes32
function formatBytes32String(text) {
  const buffer = Buffer.alloc(32); // Create a buffer of 32 bytes
  buffer.write(text); // Write the string into the buffer
  return "0x" + buffer.toString("hex"); // Convert the buffer to a hex string
}

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
    ballot = await Ballot.deploy(proposals, realMeToken.getAddress());
    await ballot.waitForDeployment();
  });

  it("Should initialize with the correct proposals", async function () {
    const proposal1 = await ballot.proposals(0);
    const proposal2 = await ballot.proposals(1);
    const proposal3 = await ballot.proposals(2);

    const expectedProposals = [
      formatBytes32String("Proposal 1"),
      formatBytes32String("Proposal 2"),
      formatBytes32String("Proposal 3"),
    ];

    expect([proposal1[0], proposal2[0], proposal3[0]]).to.deep.equal(expectedProposals);
    expect([proposal1[1], proposal2[1], proposal3[1]]).to.deep.equal([0n, 0n, 0n]);
  });

  it("Should initialize with 10 proposals", async function () {
    [owner, otherAccount] = await ethers.getSigners();

    // Deploy RealMeToken
    const RealMeToken = await ethers.getContractFactory("RealMeToken");
    realMeToken = await RealMeToken.deploy(owner);
    await realMeToken.waitForDeployment();

    // Deploy Ballot with 10 proposals
    const proposals = Array.from({ length: 10 }, (_, i) => `Proposal ${i + 1}`);
    ballot = await Ballot.deploy(proposals, realMeToken.getAddress());
    await ballot.waitForDeployment();

    const expectedProposals = proposals.map(formatBytes32String);

    const actualProposals = await Promise.all(
      proposals.map((_, i) => ballot.proposals(i).then((p) => p[0]))
    );

    expect(actualProposals).to.deep.equal(expectedProposals);
  });

  it("Should not allow voting with no token", async function () {
    await expect(ballot.connect(otherAccount).vote(2)).to.be.revertedWith("You must own a token to vote.");
  });

  it("Should allow voting with a token", async function () {
    const uniqueID = 1;

    // Mint a token to the voter
    await realMeToken.safeMint(uniqueID, otherAccount.address);
    expect(await realMeToken.balanceOf(otherAccount.address)).to.equal(1);

    // Vote for Proposal 1
    await ballot.connect(otherAccount).vote(0);

    const proposal = await ballot.proposals(0);
    expect(proposal[1]).to.equal(1n); // Check that Proposal 1 has 1 vote
  });

  it("Should not allow double voting", async function () {
    const uniqueID = 1;

    // Mint a token to the voter
    await realMeToken.safeMint(uniqueID, otherAccount.address);
    expect(await realMeToken.balanceOf(otherAccount.address)).to.equal(1);

    // First vote
    await ballot.connect(otherAccount).vote(0);
    const proposal = await ballot.proposals(0);
    expect(proposal[1]).to.equal(1n); // Check that Proposal 1 has 1 vote

    // Attempt to vote again
    await expect(ballot.connect(otherAccount).vote(0)).to.be.revertedWith("You already voted.");
  });
  it("Should not allow voting for non-existent proposal", async function () {
    const uniqueID = 1;

    // Mint a token to the voter
    await realMeToken.safeMint(uniqueID, otherAccount.address);
    expect(await realMeToken.balanceOf(otherAccount.address)).to.equal(1);

    // Attempt to vote for a non-existent proposal
    await expect(ballot.connect(otherAccount).vote(10)).to.be.revertedWithPanic(0x32); // This is the panic code for Array accessed at an out-of-bounds or negative index
  });
});
