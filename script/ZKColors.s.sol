// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {ZKColors} from "src/ZKColors.sol";

contract ZKColorsScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_SEPOLIA");
        vm.startBroadcast(deployerPrivateKey);

        ZKColors colors = new ZKColors();

        console.log(address(colors));

        vm.stopBroadcast();
    }
}
