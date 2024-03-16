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
  "blockNumber": 5493970,
  "token1Addr": "0x898A7c662f7D1aD119A168C688E11148189b1b72",
  "token2Addr": "0xfbD52Ea21Ddff75EE829BEbA42A483Bf23622DD7",
  "userAddr": "0xcD39fEbf4709c7727a72B8C177D141771a9c9554",
  "tokenId": 1
}

// The function name `circuit` is searched for by default by our Axiom CLI; if you decide to 
// change the function name, you'll also need to ensure that you also pass the Axiom CLI flag 
// `-f <circuitFunctionName>` for it to work
export const circuit = async (inputs: CircuitInputs) => {


  const mappingBeforeToken1 = getSolidityMapping(sub(inputs.blockNumber, 1000), inputs.token1Addr, 0);
  const balanceBefore1 = await mappingBeforeToken1.nested([inputs.userAddr]);
  const mappingAfterToken1 = getSolidityMapping(inputs.blockNumber, inputs.token1Addr, 0);
  const balanceAfter1 = await mappingAfterToken1.nested([inputs.userAddr]);

  const averageBalanceToken1 = div(add(balanceBefore1.toCircuitValue(), balanceAfter1.toCircuitValue()), 2);

  const mappingBeforeToken2 = getSolidityMapping(sub(inputs.blockNumber, 1000), inputs.token2Addr, 0);
  const balanceBefore2 = await mappingBeforeToken2.nested([inputs.userAddr]);
  const mappingAfterToken2 = getSolidityMapping(inputs.blockNumber, inputs.token2Addr, 0);
  const balanceAfter2 = await mappingAfterToken2.nested([inputs.userAddr]);
  const averageBalanceToken2 = div(add(balanceBefore2.toCircuitValue(), balanceAfter2.toCircuitValue()), 2);
  
  addToCallback(inputs.blockNumber);
  addToCallback(inputs.token1Addr);
  addToCallback(inputs.token2Addr);
  addToCallback(inputs.userAddr);
  addToCallback(inputs.tokenId);

  addToCallback(averageBalanceToken1);
  addToCallback(averageBalanceToken2);

};