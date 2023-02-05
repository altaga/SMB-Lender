// SPDX-License-Identifier: MIT

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

pragma solidity >=0.8.0 <0.9.0;

contract SMBLending {
    address public owner = 0x8245233c51CC5f8f655b6d3A093E9Cae32489607;
    address public client;
    address public USDCcontract = 0xc1908C35eF76b7642e20e650EC9274Ab5FA68c84;
    uint256 public amount;
    uint256 public ir;
    uint256 public status = 0;

    /*
        Status numbers
        0 - pending
        1 - active
        2 - rejected
        3 - completed
    */

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier isClient() {
        require(msg.sender == client);
        _;
    }

    modifier isOwners() {
        require(msg.sender == client || msg.sender == owner);
        _;
    }

    constructor() {
        client = msg.sender;
    }

    // Setup

    function setupAccept(uint256 _amount, uint256 _ir) public isOwner {
        require(status == 0);
        amount = _amount * 1000000000000000000;
        ir = _ir;
        status = 1;
    }

    function setupReject() public isOwner {
        require(status == 0);
        status = 2;
    }

    function setupCompleted() public isOwner {
        require(status == 1);
        uint256 contractBalance = getBalanceECR20(USDCcontract);
        uint256 minBalance = checkMin();
        require(minBalance <= contractBalance);
        transferECR20(minBalance, owner, USDCcontract);
        transferECR20((contractBalance - minBalance), client, USDCcontract);
        status = 3;
    }

    // Payments

    function checkMin() public view returns (uint256) {
        return (amount * (ir + 100)) / 100;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getBalanceECR20(address s_contract) public view returns (uint256) {
        ERC20 ERC20Contract = ERC20(s_contract);
        return ERC20Contract.balanceOf(address(this));
    }

    function transferNative(uint256 value, address payable to)
        public
        payable
        isOwners
    {
        require(address(this).balance >= value);
        to.transfer(value);
    }

    function transferECR20(
        uint256 value,
        address to,
        address s_contract
    ) public isOwners {
        ERC20 ERC20Contract = ERC20(s_contract);
        require(ERC20Contract.balanceOf(address(this)) >= value);
        ERC20Contract.transfer(to, value);
    }

    // Transfer money in the contract ONLY FOR TESTING

    function garbage() public payable isOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {} // Recieve Payments

    fallback() external payable {} // Recieve Payments if recieve doesn't work
}

contract ERC20 {
    function transfer(address to, uint256 amount)
        public
        virtual
        returns (bool)
    {}

    function balanceOf(address account) public view virtual returns (uint256) {}
}