// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DummyToken1 is ERC20 {
    constructor() ERC20("DummyToken1", "DUMMY1") {}

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
