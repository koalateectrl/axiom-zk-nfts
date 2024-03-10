// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "solady/tokens/ERC721.sol";
import {Base64} from "solady/utils/Base64.sol";

contract ZKColors is ERC721 {
    enum Colors {
        RED,
        GREEN
    }

    mapping(uint256 tokenId => Colors color) private _colors;

    /// @dev Returns the token collection name.
    function name() public pure override returns (string memory) {
        return "ZKColors";
    }

    /// @dev Returns the token collection symbol.
    function symbol() public pure override returns (string memory) {
        return "ZKC";
    }

    function _getImage(uint256 id) private view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 3000 3000">',
                    '<rect width="100%" height="100%" fill="',
                    _colors[id] == Colors.RED ? "red" : "green",
                    '" />',
                    "</svg>"
                )
            );
    }

    /// @dev Returns the Uniform Resource Identifier (URI) for token `id`.
    function tokenURI(uint256 id) public view override returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "ZKColors',
            '",',
            '"description": "Axiom ZK intensive cohort #2 by KoalateeCtrl, ppmoon69, SaganLives, and Naruto11.",',
            '"image_data": "',
            _getImage(id),
            '"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }
}
