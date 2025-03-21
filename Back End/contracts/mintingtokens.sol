// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniqueIdentityToken is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;  // Auto-incrementing token ID
    mapping(string => uint256) public uniqueIDToToken; // Maps government unique ID to token ID

    event TokenMinted(address indexed owner, uint256 tokenId, string uniqueID);

    constructor() ERC721("UniqueIdentityToken", "UIT") {}

    /**
     * @dev Mints a new token for a verified user.
     * @param recipient The wallet address of the user.
     * @param uniqueID A unique ID from the government API.
     * @param tokenURI Metadata URI (e.g., IPFS link to identity verification proof).
     */
    function mintToken(address recipient, string memory uniqueID, string memory tokenURI) external onlyOwner {
        require(uniqueIDToToken[uniqueID] == 0, "This unique ID already has a token");

        _nextTokenId++; 
        uint256 tokenId = _nextTokenId;

        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        uniqueIDToToken[uniqueID] = tokenId;

        emit TokenMinted(recipient, tokenId, uniqueID);
    }

    /**
     * @dev Checks if a unique ID is already registered.
     */
    function isRegistered(string memory uniqueID) external view returns (bool) {
        return uniqueIDToToken[uniqueID] != 0;
    }
}
