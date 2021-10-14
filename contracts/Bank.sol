pragma solidity ^0.5.0;

contract Bank {
    mapping(address => uint) public balances;

    function deposit(uint amount) public {
        require(amount >= 0);
        balances[msg.sender] += amount;
    }

    function withdraw(uint amount) public {
        uint balance = balances[msg.sender];
        require(balance >= amount);
        balances[msg.sender] -= amount;
    }

    function getAccount() public view returns (uint) {
        return balances[msg.sender];
    }

}