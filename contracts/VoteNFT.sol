// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VoteNFT is ERC721 {
    uint256 public tokenCounter;

    event NFTMinted(address recipient, uint256 tokenId);

    constructor() ERC721("VoteNFT", "VOTE") {
        tokenCounter = 0;
    }

    function mintNFT(address recipient) public returns (uint256) {
        tokenCounter++;
        _safeMint(recipient, tokenCounter);
        emit NFTMinted(recipient, tokenCounter); // Émettre un événement
        return tokenCounter;
    }
}
