const { expect } = require("chai");

describe("RealMeToken Contract", function () {
  let RealMeToken, realMeToken, owner, otherAccount;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
    otherAccount = signers[1];
    RealMeToken = await ethers.getContractFactory("RealMeToken");
    realMeToken = await RealMeToken.deploy(owner.address);
    await realMeToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy the contract and set the correct owner", async function () {
      expect(await realMeToken.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should mint tokens correctly", async function () {
      const recipient = otherAccount.address;
      const uniqueID = 1;
      await realMeToken.safeMint(uniqueID, recipient);
      expect(await realMeToken.balanceOf(recipient)).to.equal(1);
    });

    it("Should not be able to mint two tokens with the same unique ID", async function () {
      const recipient = otherAccount.address;
      const uniqueID = 1;
      await realMeToken.safeMint(uniqueID, recipient);
      await expect(realMeToken.safeMint(uniqueID, recipient)).to.be.revertedWith("Unique ID has already been used");
    });

    it("Should not allow non-owners to mint tokens", async function () {
      const recipient = otherAccount.address;
      const uniqueID = 2;
      await expect(
        realMeToken.connect(otherAccount).safeMint(uniqueID, recipient)
      ).to.be.reverted;
    });

    it("Should allow the owner to mint to multiple addresses", async function () {
      const signers = await ethers.getSigners();
      const recipients = [signers[2].address, signers[3].address, signers[4].address];
      const uniqueIDs = [3, 4, 5];
      for (let i = 0; i < recipients.length; i++) {
        await realMeToken.safeMint(uniqueIDs[i], recipients[i]);
        expect(await realMeToken.balanceOf(recipients[i])).to.equal(1);
      }
    });
  });
});