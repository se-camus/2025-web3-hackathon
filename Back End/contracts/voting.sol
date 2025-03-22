// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import {myToken5} from "./minting_contract.sol"; // Import your token contract

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
    myToken5 public myToken; // Declare MyToken3 contract address

    // This declares a new complex type which will
    // be used for variables later.
    struct Voter {
        bool voted; // if true, that person already voted
        uint vote; // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name; // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    mapping(address => Voter) public voters; // Store voter information
    Proposal[] public proposals; // Array of proposals

    /**
     * @dev Constructor to set the token contract and initialize proposals.
     * @param proposalNames names of proposals
     * @param tokenAddress Address of the deployed MyToken3 contract
     */
    constructor(string[] memory proposalNames, address tokenAddress) {
        myToken = myToken5(tokenAddress); // Set the token contract address
        
        for (uint i = 0; i < proposalNames.length; i++) {
            bytes32 proposalName = stringToBytes32(proposalNames[i]);
            proposals.push(Proposal({name: proposalName, voteCount: 0}));
        }
    }


    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param proposal index of proposal in the proposals array
     */
    function vote(uint proposal) external {
        require(myToken.balanceOf(msg.sender) > 0, "You must own a token to vote."); // Token ownership check

        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        sender.voted = true;
        sender.vote = proposal;
        
        proposals[proposal].voteCount += 1;
    }

    /**
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /**
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }

    /**
     * @dev Helper function, converts a string to bytes32
     * @param source string to convert
     * @return result bytes32 representation of the string
     */
    function stringToBytes32(
        string memory source
    ) internal pure returns (bytes32 result) {
        bytes memory temp = bytes(source);
        if (temp.length > 32) {
            revert("String too long, exceeds 32 bytes");
        }

        assembly {
            result := mload(add(temp, 32))
        }
    }
}
