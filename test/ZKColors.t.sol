// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import {ZKColors} from "src/ZKColors.sol";

contract ZKColorsTest {
    ZKColors public immutable colors =
        new ZKColors(0x83c8c0B395850bA55c830451Cfaca4F2A667a983);
}
