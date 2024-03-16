// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IZKColors is IERC721 {
    function updateColor(
        uint256 id,
        uint256 averageBalanceToken1,
        uint256 averageBalanceToken2
    ) external;
}
