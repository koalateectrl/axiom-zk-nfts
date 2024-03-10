# axiom-project-backend

## Versions

Node.js v18.19.0
npm 10.2.3

## Setup

The steps below assume that you have Node.js and Typescript installed on your machine.

1. Install dependencies `npm i`.
2. Create a .env file and copy + paste the contents of .env.example into it. Define the `RPC_URL` variable with an Alchemy or Infura endpoint.
3. Run the server `npm run dev`.
4. Test that everything is set up by visiting `http://localhost:3000/compound/balances/0x7f714b13249BeD8fdE2ef3FBDfB18Ed525544B03` in your browser. You should see the balances of the largest cUSDCv3 holder -- feel free to replace the address with any other account that has a balance.
