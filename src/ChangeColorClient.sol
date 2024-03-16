// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AxiomV2Client} from "@axiom-crypto/v2-periphery/client/AxiomV2Client.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IZKColors} from "./IZKColors.sol";

contract ChangeColorClient is AxiomV2Client, Ownable {
    /// @dev The unique identifier of the circuit accepted by this contract.
    // bytes32 immutable QUERY_SCHEMA;

    /// @dev The chain ID of the chain whose data the callback is expected to be called from.
    uint64 immutable SOURCE_CHAIN_ID;

    address public nftAddr;

    event CallBackValues(
        uint256 blockNumber,
        address token1Addr,
        address token2Addr,
        address userAddr,
        uint256 tokenId,
        uint256 averageBalanceToken1,
        uint256 afterVaaverageBalanceToken2
    );

    // Sepolia AxiomV2Query Proxy Address: 0x83c8c0B395850bA55c830451Cfaca4F2A667a983
    // Sepolia Source Chain Id: 11155111

    /// @notice Construct a new AverageBalance contract.
    /// @param  _axiomV2QueryAddress The address of the AxiomV2Query contract.
    /// @param  _callbackSourceChainId The ID of the chain the query reads from.
    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId
    )
        // bytes32 _querySchema
        AxiomV2Client(_axiomV2QueryAddress)
        Ownable(msg.sender)
    {
        // TODO: Check for Query Schema as well.
        // QUERY_SCHEMA = _querySchema;
        SOURCE_CHAIN_ID = _callbackSourceChainId;
    }

    function updateNFTAddr(address _nftAddr) external onlyOwner {
        nftAddr = _nftAddr;
    }

    /// @inheritdoc AxiomV2Client
    function _validateAxiomV2Call(
        AxiomCallbackType, // callbackType,
        uint64 sourceChainId,
        address, // caller,
        bytes32 querySchema,
        uint256, // queryId,
        bytes calldata // extraData
    ) internal view override {
        require(
            sourceChainId == SOURCE_CHAIN_ID,
            "Source chain ID does not match"
        );
        // require(querySchema == QUERY_SCHEMA, "Invalid query schema");
    }

    /// @inheritdoc AxiomV2Client
    function _axiomV2Callback(
        uint64, // sourceChainId,
        address, // caller,
        bytes32, // querySchema,
        uint256, // queryId,
        bytes32[] calldata axiomResults,
        bytes calldata // extraData
    ) internal override {
        address userAddr = address(uint160(uint256(axiomResults[3])));
        uint256 tokenId = uint256(axiomResults[4]);
        require(
            IZKColors(nftAddr).ownerOf(tokenId) == userAddr,
            "user does not own this NFT"
        );

        uint256 averageBalanceToken1 = uint256(axiomResults[5]);
        uint256 averageBalanceToken2 = uint256(axiomResults[6]);

        IZKColors(nftAddr).updateColor(
            tokenId,
            averageBalanceToken1,
            averageBalanceToken2
        );

        emit CallBackValues(
            uint256(axiomResults[0]),
            address(uint160(uint256(axiomResults[1]))),
            address(uint160(uint256(axiomResults[2]))),
            address(uint160(uint256(axiomResults[3]))),
            uint256(axiomResults[4]),
            uint256(axiomResults[5]),
            uint256(axiomResults[6])
        );
    }
}
