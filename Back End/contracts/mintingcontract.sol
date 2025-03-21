// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract myToken is ERC721, Ownable {   
    uint256 private _nextTokenId;
    mapping(bytes32 => uint256) private _idToToken; // Maps unique ID hash to token ID
    mapping(uint256 => address) private _tokenToUser; // Maps token ID to user

    constructor(address initialOwner)
        ERC721("UniqueIDNFT", "UIDNFT")
        Ownable(initialOwner)
    {}

    function safeMint(address to, string memory uniqueId) public onlyOwner returns (uint256) {
        bytes32 idHash = keccak256(abi.encodePacked(uniqueId));

        require(_idToToken[idHash] == 0, "ID already has a token");

        uint256 tokenId = _nextTokenId++;
        _idToToken[idHash] = tokenId;
        _tokenToUser[tokenId] = to;

        _safeMint(to, tokenId); // Mint to the owner first

        return tokenId;
    }

    function transferToUser(uint256 tokenId) public onlyOwner {
        address user = _tokenToUser[tokenId];
        require(user != address(0), "Token not assigned to user");
        require(ownerOf(tokenId) == msg.sender, "Token must be held by contract owner");

        _transfer(msg.sender, user, tokenId);
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = ownerOf(tokenId);
        
        // Restrict transfers unless it's the initial transfer from owner
        if (from != address(0) && from != owner()) {
            revert("Transfers not allowed after first assignment");
        }
        
        return super._update(to, tokenId, auth);
    }
}
