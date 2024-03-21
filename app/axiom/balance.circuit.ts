import {
  add,
  sub,
  mul,
  div,
  checkLessThan,
  addToCallback,
  CircuitValue,
  CircuitValue256,
  constant,
  witness,
  getAccount,
  getStorage,
  getSolidityMapping,
} from "@axiom-crypto/client";

// For type safety, define the input types to your circuit here.
// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  token1Addr: CircuitValue;
  token2Addr: CircuitValue;
  userAddr: CircuitValue;
  tokenId: CircuitValue256;
}

// Default inputs to use for compiling the circuit. These values should be different than the inputs fed into
// the circuit at proving time.
export const defaultInputs = {
  "blockNumber": 5494070,
  "token1Addr": "0xd04D6724Fb95BAda8ef799Ff3E2Cb4728c9f145D",
  "token2Addr": "0x8B17E3629C1253805dbDBAFee6C7382aB5F1Bf75",
  "userAddr": "0xcD39fEbf4709c7727a72B8C177D141771a9c9554",
  "tokenId": 1
}

// The function name `circuit` is searched for by default by our Axiom CLI; if you decide to
// change the function name, you'll also need to ensure that you also pass the Axiom CLI flag
// `-f <circuitFunctionName>` for it to work
export const circuit = async (inputs: CircuitInputs) => {
  
  // Obtaining the average for token 1
  const currToken1Mapping = getSolidityMapping(inputs.blockNumber, inputs.token1Addr, 0);
  const currToken1Balance256 = await currToken1Mapping.nested([inputs.userAddr]);
  let sumToken1Balance = currToken1Balance256.toCircuitValue();

  for (let i = 1; i < 10; i++) {
      let token1Mapping = getSolidityMapping(sub(inputs.blockNumber, mul(i, 100)), inputs.token1Addr, 0);
      let token1Balance = await token1Mapping.nested([inputs.userAddr]);
      sumToken1Balance = add(sumToken1Balance, token1Balance.toCircuitValue());
  }

  const average1Balance = div(sumToken1Balance, 10);

  // Obtaining the average for token 2
  const currToken2Mapping = getSolidityMapping(inputs.blockNumber, inputs.token2Addr, 0);
  const currToken2Balance256 = await currToken2Mapping.nested([inputs.userAddr]);
  let sumToken2Balance = currToken2Balance256.toCircuitValue();

  for (let i = 1; i < 10; i++) {
      let token2Mapping = getSolidityMapping(sub(inputs.blockNumber, mul(i, 100)), inputs.token2Addr, 0);
      let token2Balance = await token2Mapping.nested([inputs.userAddr]);
      sumToken2Balance = add(sumToken2Balance, token2Balance.toCircuitValue());
  }

  const average2Balance = div(sumToken2Balance, 10);

  addToCallback(inputs.blockNumber);
  addToCallback(inputs.token1Addr);
  addToCallback(inputs.token2Addr);
  addToCallback(inputs.userAddr);
  addToCallback(inputs.tokenId);
  addToCallback(average1Balance);
  addToCallback(average2Balance);

};
