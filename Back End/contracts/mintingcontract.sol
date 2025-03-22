pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => bool) private _uniqueIdUsed;

    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {
        transferOwnership(initialOwner);
    }

    function safeMint(uint256 uniqueId, address to) public onlyOwner returns (uint256) {
        require(!_uniqueIdUsed[uniqueId], "Unique ID has already been used");

        uint256 tokenId = _nextTokenId++;
        _uniqueIdUsed[uniqueId] = true;

        _safeMint(to, tokenId);
        return tokenId;
    }

    function isUniqueIdUsed(uint256 uniqueId) public view returns (bool) {
        return _uniqueIdUsed[uniqueId];
    }
}
