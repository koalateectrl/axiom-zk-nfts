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
} from "@axiom-crypto/client";

// For type safety, define the input types to your circuit here.
// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  token1Addr: CircuitValue;
  token2Addr: CircuitValue;
  userAddr: CircuitValue;
}

// Default inputs to use for compiling the circuit. These values should be different than the inputs fed into
// the circuit at proving time.
export const defaultInputs = {
  "blockNumber": 5473850,
  "token1Addr": "0x898A7c662f7D1aD119A168C688E11148189b1b72",
  "token2Addr": "0xfbD52Ea21Ddff75EE829BEbA42A483Bf23622DD7",
  "userAddr": "0xcD39fEbf4709c7727a72B8C177D141771a9c9554"
}

// The function name `circuit` is searched for by default by our Axiom CLI; if you decide to 
// change the function name, you'll also need to ensure that you also pass the Axiom CLI flag 
// `-f <circuitFunctionName>` for it to work
export const circuit = async (inputs: CircuitInputs) => {
  
  // TODO: replace hardcoded value with keccak256(h(address) | bytes32(0)) where h pads address with 0's up to 32 bytes
  const balanceStorageSlot = 21488382805312895015594397440099327839306139524904766072632750833650216184378;


  // TODO: grabbed only a block number and the one 50 blocks ahead, need to remove hard-coding
  const storageBeforeToken1 = getStorage(inputs.blockNumber, inputs.token1Addr);
  const slotBeforeValue1 = await storageBeforeToken1.slot(balanceStorageSlot);
  const storageAfterToken1 = getStorage(add(inputs.blockNumber, 50), inputs.token1Addr);
  const slotAfterValue1 = await storageAfterToken1.slot(balanceStorageSlot);



  const storageBeforeToken2 = getStorage(inputs.blockNumber, inputs.token2Addr);
  const slotBeforeValue2 = await storageBeforeToken2.slot(balanceStorageSlot);
  const storageAfterToken2 = getStorage(add(inputs.blockNumber, 50), inputs.token2Addr);
  const slotAfterValue2 = await storageAfterToken2.slot(balanceStorageSlot);

  
  addToCallback(inputs.blockNumber);
  addToCallback(inputs.token1Addr);
  addToCallback(inputs.token2Addr);
  addToCallback(inputs.userAddr);

  addToCallback(slotBeforeValue1);
  addToCallback(slotAfterValue1);
  addToCallback(slotBeforeValue2);
  addToCallback(slotAfterValue2);

};