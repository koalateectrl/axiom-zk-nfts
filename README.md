# Axiom Quickstart

## Setup Part 1 (Deploying Contracts)

The steps below assume that you have Node.js and Typescript installed on your machine.

1. Install dependencies `npm i` and `forge install`
2. Create a .env file and copy + paste the contents of .env.example into it. Fill this with your information.
3. Deploy the contract `DummyToken1`.
   1. `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/DummyToken1.sol:DummyToken1`
4. Verify the contract `DummyToken1`.
   1. `forge verify-contract --etherscan-api-key <ETHERSCAN_API_KEY> --chain-id 11155111 <DummyToken1Addr> DummyToken1`
5. Deploy the contract `DummyToken2`.
   1. `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/DummyToken2.sol:DummyToken2`
6. Verify the contract `DummyToken2`.
   1. `forge verify-contract --etherscan-api-key <ETHERSCAN_API_KEY> --chain-id 11155111 <DummyToken2Addr> DummyToken2`
7. Deploy the Axiom callback contract `ChangeColorClient`.
   1. `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/ChangeColorClient.sol:ChangeColorClient --constructor-args 0x83c8c0B395850bA55c830451Cfaca4F2A667a983 11155111`
8. Verify the contract `ChangeColorClient`.
   1. `forge verify-contract --etherscan-api-key <ETHERSCAN_API_KEY> --chain-id 11155111 --constructor-args $(cast abi-encode "constructor(address,uint64)" 0x83c8c0B395850bA55c830451Cfaca4F2A667a983 11155111) <ChangeColorClientAddr> ChangeColorClient`
9. Deploy the NFT contract `ZKColors`.
   1.  `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/ZKColors.sol:ZKColors --constructor-args <ChangeColorClientAddr>`
10. Verify the NFT contract `ZKColors`.
   1. `forge verify-contract --etherscan-api-key <ETHERSCAN_API_KEY> --chain-id 11155111 --constructor-args $(cast abi-encode "constructor(address)" <ChangeColorClientAddr>) <ZKColorsAddr> ZKColors`
11. Call the `updateNFTAddr` function in `ChangeColorClientAddr` to point it to the `ZKColors` address.
    1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <ChangeColorClientAddr> "updateNFTAddr(address)" <ZKColorsAddr> --rpc-url <ALCHEMY_ENDPOINT>`

## Setup Part 2 (Minting Tokens)

1. Mint N DummyToken1s to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <DummyToken1Address> "mint(uint256)" <N> --rpc-url <ALCHEMY_ENDPOINT>`
2. Mint M DummyToken2s to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <DummyToken2Address> "mint(uint256)" <M> --rpc-url <ALCHEMY_ENDPOINT>`
3. Mint an NFT to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <ZKColorsAddr> "mint()" --rpc-url <ALCHEMY_ENDPOINT>`

## Generate ZKP

1. Compile circuit and generate `compiled.json`.
   1. `npx axiom circuit compile app/axiom/balance.circuit.ts --provider <ALCHEMY_ENDPOINT>`
2. Generate proof.
   1. `npx axiom circuit prove app/axiom/data/compiled.json app/axiom/data/inputs.json --provider <ALCHEMY_ENDPOINT>`
3. Generate query parameters used to call `AxiomV2Query`.
   1. `npx axiom circuit query-params <ChangeColorClientAddr> --sourceChainId 11155111 --refundAddress <Your EOA Address> --provider <ALCHEMY_ENDPOINT>`
4. Send the query on-chain
   1. `cast send --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> --value <payment value> 0x83c8c0B395850bA55c830451Cfaca4F2A667a983 <sendQueryCalldata>` where `sendQueryCalldata` is the value in the calldata field from the json output file `sendQuery.json` that was generated from the previous step.



## Sample Addresses

- DummyToken1: 0xd04D6724Fb95BAda8ef799Ff3E2Cb4728c9f145D
- DummyToken2: 0x8B17E3629C1253805dbDBAFee6C7382aB5F1Bf75
- ChangeColorClient: 0xf4bE653537F157Ea1139d4405203C17e7F7445d0
- ZKColors: 0xa98Da97faE6234b515415fF8BD9496F53E0cBa3b



# Dev-Frontend Setup

## Part 1: Fill out environment variables
- Fill out /axiom-zk-nfts/.env.example, save as .env
- Fill out /axiom-zk-nfts/app/.env.local.example, save as .env.local

## Part 2: Send dummy tokens / nft to your account
1. Create a Sepolia address, accessible by browser (metamask, walletconnect)
2. Send dummy tokens to your address:
   1. Mint N DummyToken1s to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <DummyToken1Address> "mint(uint256)" <N> --rpc-url <ALCHEMY_ENDPOINT>`
3. Mint M DummyToken2s to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <DummyToken2Address> "mint(uint256)" <M> --rpc-url <ALCHEMY_ENDPOINT>`
4. Mint an NFT to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <ZKColorsAddr> "mint()" --rpc-url <ALCHEMY_ENDPOINT>`

## Part 3: Start the development environment
1. Open the '/app' directory in the terminal
2. Enter 'npm start dev'