# Axiom Quickstart

## Setup Part 1 (Deploying Contracts)

The steps below assume that you have Node.js and Typescript installed on your machine.

1. Install dependencies `npm i` and `forge install`
2. Create a .env file and copy + paste the contents of .env.example into it. Fill this with your information.
3. Deploy the contract `DummyToken1`.
   1. `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/DummyToken1.sol:DummyToken1`
4. Deploy the contract `DummyToken2`.
   1. `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/DummyToken2.sol:DummyToken2`
5. Deploy the Axiom callback contract `ChangeColorClient`.
   1. `forge create --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> src/ChangeColorClient.sol:ChangeColorClient --constructor-args 0x83c8c0B395850bA55c830451Cfaca4F2A667a983 11155111`

## Setup Part 2 (Minting Tokens)

1. Mint N DummyToken1s to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <DummyToken1Address> "mint(uint256)" <N> --rpc-url <ALCHEMY_ENDPOINT>`
2. Mint M DummyToken2s to your address.
   1. `cast send --private-key <SEPOLIA_PRIVATE_KEY> <DummyToken2Address> "mint(uint256)" <M> --rpc-url <ALCHEMY_ENDPOINT>`

## Generate ZKP

1. Compile circuit and generate `compiled.json`.
   1. `npx axiom circuit compile app/axiom/balance.circuit.ts --provider <ALCHEMY_ENDPOINT>`
2. Generate proof.
   1. `npx axiom circuit prove app/axiom/data/compiled.json app/axiom/data/inputs.json --provider <ALCHEMY_ENDPOINT>`
3. Generate query parameters used to call `AxiomV2Query`.
   1. `npx axiom circuit query-params <ChangeColorClientAddr> --sourceChainId 11155111 --refundAddress <Your EOA Address> --provider <ALCHEMY_ENDPOINT>`
4. Send the query on-chain
   1. `cast send --rpc-url <ALCHEMY_ENDPOINT> --private-key <SEPOLIA_PRIVATE_KEY> --value <payment value> 0x83c8c0B395850bA55c830451Cfaca4F2A667a983 <sendQueryCalldata>` where `sendQueryCalldata` is the value in the calldata field from the json output file `sendQuery.json` that was generated from the previous step.



