// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Register {
    address owner;
    uint256 public counter = 0;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _; // Close Modifier
    }

    struct Information {
        address client;
        address clientContract;
        uint256 amount;
        string status;
        string info;
    }

    mapping(address => Information) public register;
    mapping(uint256 => address) public registerCounter;

    constructor() {
        owner = msg.sender;
    }

    function addNew(
        address _clientContract,
        uint256 _amount,
        string memory _info
    ) public {
        registerCounter[counter] = msg.sender;
        counter++;
        register[msg.sender] = Information(
            msg.sender,
            _clientContract,
            _amount,
            "pending",
            _info
        );
    }

    function acceptLending(address _client) public onlyOwner {
        register[_client].status = "accepted";
    }

    function rejectLending(address _client) public onlyOwner {
        register[_client].status = "rejected";
    }

    function completeLending(address _client) public onlyOwner {
        register[_client].status = "completed";
    }

    // Transfer money in the contract.

    function garbage() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
