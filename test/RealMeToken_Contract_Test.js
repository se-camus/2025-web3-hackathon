const { expect } = require("chai");


console.log(ethers.version);
describe("RealMeToken Contract", function () {
  let RealMeToken, realMeToken, owner, otherAccount;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    RealMeToken = await ethers.getContractFactory("RealMeToken");
    realMeToken = await RealMeToken.deploy(owner.address);
    await realMeToken.waitForDeployment();
  });

  it("Should deploy the contract and set the correct owner", async function () {
    expect(await realMeToken.owner()).to.equal(owner.address);
  });

  it("Should mint tokens correctly", async function () {
    const recipient = otherAccount.address;
    const uniqueID = 1;

    await realMeToken.safeMint(uniqueID, recipient);
    expect(await realMeToken.balanceOf(recipient)).to.equal(1);
  
    await expect(realMeToken.safeMint(uniqueID, recipient)).to.be.revertedWith("Unique ID has already been used");
  });

  it("Should not allow non-owners to mint tokens", async function () {
    const recipient = otherAccount.address;
    const uniqueID = 2;

    await expect(
      realMeToken.connect(otherAccount).safeMint(uniqueID,recipient)
    ).to.be.reverted;
  });
});