// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DummyToken2 is ERC20 {
    constructor() ERC20("DummyToken2", "DUMMY2") {}

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
