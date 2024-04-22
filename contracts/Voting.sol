// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voting{
    struct Candidate{
        string name;
        uint256 voteCount;
    }
    Candidate[] public candidates;
    const address owner;
    mapping (address -> bool) public voters;

    uint256 votingStartTime;
    uint256 votingEndTime;

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes){
        for (uint256 i = 0; i < _candidateNames.length; i++){
            candidates.push(
                Candidate({
                    name: _candidateNames[i],
                    voteCount: 0
                })
            );
        }
        owner = msg.sender;
        votingStartTime = block.timestamp;
        votingEndTime = votingStartTime + (_durationInMinutes * 1 minutes );

    }
    // modifier is special function used to modify behaviour of other functions
    // For example, developers can use a modifier to check that a certain condition 
    // is met before allowing the function to execute. 

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    // here only owner can use this function
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
            owner = _name,
            voteCount = 0;
        }));
    }

    function vote(uint256 _candidateIndex) public {
        //  If the condition specified in require() evaluates to false, the function execution 
        // will revert, and any state changes made during the execution will be rolled back.
        require(!voters[msg.sender], "You have already voted!");
        require(_candidateIndex < candidates.length, "Index out of range!");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] == true;
    }

}

