// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoteNFT.sol";

contract Voting {
    VoteNFT public nftContract;
    mapping(uint256 => bool) public hasVoted;
    mapping(address => bool) public userHasVoted;
    uint256 public voteCount;

    event Voted(address voter, uint256 tokenId);

    constructor(address _nftAddress) {
        nftContract = VoteNFT(_nftAddress);
        voteCount = 0;
    }

    function verifyAndVote(uint256 tokenId) public {
        require(nftContract.ownerOf(tokenId) == msg.sender, unicode"Vous ne possédez pas ce NFT.");
        require(!hasVoted[tokenId], unicode"Ce NFT a déjà été utilisé pour voter.");
        require(!userHasVoted[msg.sender], unicode"Vous avez déjà voté.");
        
        hasVoted[tokenId] = true;
        userHasVoted[msg.sender] = true;
        voteCount++;
        
        emit Voted(msg.sender, tokenId); // Émettre un événement
    }
}
