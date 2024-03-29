// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "solady/tokens/ERC721.sol";
import {Base64} from "solady/utils/Base64.sol";

contract ZKColors is ERC721 {
    enum Colors {
        BLACK, // Haven't used Axiom yet
        RED, // Larger average balance for Token1
        GREEN, // Larger average balance for Token2
        BLUE // Same average balance for Token1 and Token2
    }

    uint256 private _tokenId = 1;

    mapping(uint256 tokenId => Colors color) public colors;

    address private immutable callbackClient;

    modifier onlyCallbackClient() {
        require(msg.sender == callbackClient);
        _;
    }

    constructor(address _callbackClient) {
        callbackClient = _callbackClient;
    }

    /// @dev Returns the token collection name.
    function name() public pure override returns (string memory) {
        return "ZKColors";
    }

    /// @dev Returns the token collection symbol.
    function symbol() public pure override returns (string memory) {
        return "ZKC";
    }

    /// @dev Returns base64-encoded SVG with the token ID's color.
    function _getImage(uint256 id) private view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 3000 3000">',
                            '<rect width="100%" height="100%" fill="',
                            colors[id] == Colors.BLACK
                                ? "black"
                                : colors[id] == Colors.RED
                                    ? "red"
                                    : colors[id] == Colors.GREEN
                                        ? "green"
                                        : "blue",
                            '" />',
                            "</svg>"
                        )
                    )
                )
            );
    }

    /// @dev Returns the Uniform Resource Identifier (URI) for token `id`.
    function tokenURI(uint256 id) public view override returns (string memory) {
        string memory json = string.concat(
            '{"name": "ZKColors","description":"ZK Color Changing NFT Using Axiom","image":"',
            _getImage(id),
            '"}'
        );

        return string.concat("data:application/json;utf8,", json);
    }

    function mint() external {
        uint256 id = _tokenId;

        _mint(msg.sender, id);

        // Defaults to a value of 0, which is BLACK for the Colors enum.

        // Increment token ID for the next minter.
        ++_tokenId;
    }

    function updateColor(
        uint256 id,
        uint256 averageBalanceToken1,
        uint256 averageBalanceToken2
    ) external onlyCallbackClient {
        if (averageBalanceToken1 > averageBalanceToken2) {
            colors[id] = Colors.RED;
        } else if (averageBalanceToken2 > averageBalanceToken1) {
            colors[id] = Colors.GREEN;
        } else if (averageBalanceToken1 > 0) {
            // In this arm, averageBalanceToken1 == averageBalanceToken2
            colors[id] = Colors.BLUE;
        }
    }
}
