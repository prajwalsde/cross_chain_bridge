// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LockContract {
    address public admin;
    mapping(bytes32 => bool) public processedTransactions;

    event Deposit(address indexed user, uint256 amount, bytes32 txHash);

    constructor() {
        admin = msg.sender;
    }

    function deposit(uint256 amount) external {
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, amount, block.timestamp));
        require(!processedTransactions[txHash], "Transaction already processed");

        processedTransactions[txHash] = true;
        emit Deposit(msg.sender, amount, txHash);
    }

    function releaseTokens(address user, uint256 amount, bytes32 txHash) external {
        require(msg.sender == admin, "Only admin can release funds");
        require(!processedTransactions[txHash], "Transaction already processed");

        processedTransactions[txHash] = true;
        // Logic to release funds (e.g., transfer ERC20 tokens)
    }
}
