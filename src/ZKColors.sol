// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "solady/tokens/ERC721.sol";

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

    /// @dev Returns the Uniform Resource Identifier (URI) for token `id`.
    function tokenURI(
        uint256 id
    ) public view override returns (string memory) {}
}
