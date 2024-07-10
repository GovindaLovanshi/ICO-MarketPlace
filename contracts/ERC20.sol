// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "";

contract ERC20Token is ERC20{
    constructor()ERC20("TheblockchainCOd","ABC"){
        _mint(msg.sender,50000**10);
    }
}