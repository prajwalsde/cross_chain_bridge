// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BridgeContract {
    address public admin;
    mapping(bytes32 => bool) public processedTransactions;

    event TokensReleased(address indexed user, uint256 amount, bytes32 txHash);

    constructor() {
        admin = msg.sender;
    }

    function releaseTokens(address user, uint256 amount, bytes32 txHash) external {
        require(msg.sender == admin, "Only admin can release tokens");
        require(!processedTransactions[txHash], "Transaction already processed");

        processedTransactions[txHash] = true;
        emit TokensReleased(user, amount, txHash);
    }
}
