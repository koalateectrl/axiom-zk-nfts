export const COMPOUND_TOKENS: `0x${string}`[] = [
  // cUSDCv3.
  '0xc3d688b66703497daa19211eedff47f25384cdc3',
  // cWETHv3.
  '0xa17581a9e3356d9a858b789d68b4d866e593ae94',
];

export const AAVE_TOKENS: `0x${string}`[] = [
  // Av3_USDC.
  '0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c',
  // Av3_WETH.
  '0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8',
  // Av3_wstETH.
  // '0x0B925eD163218f6662a35e0f0371Ac234f9E9371',
  // Av3_WBTC.
  // '0x5Ee5bf7ae06D1Be5997A1A72006FE6C607eC6DE8',
  // Av3_DAI
  // '0x018008bfb33d285247A21d44E50697654f754e63',
  // Av3_LINK
  // '0x5E8C8A7243651DB1384C0dDfDbE39761E8e7E51a',
  // Av3_AAVE
  // '0xA700b4eB416Be35b2911fd5Dee80678ff64fF6C9',
  // Av3_cbETH
  // '0x977b6fc5dE62598B08C85AC8Cf2b745874E8b78c',
  // Av3_USDT
  // '0x23878914EFE38d27C4D67Ab83ed1b93A74D4086a',
  // Av3_cbETH
  // '0x977b6fc5dE62598B08C85AC8Cf2b745874E8b78c'
  // Av3_USDT
  // '0x23878914EFE38d27C4D67Ab83ed1b93A74D4086a'
];
// 86400 seconds in a day, 12 second average block times.
export const MAINNET_BLOCKS_PER_DAY = 7200n;

export const BALANCE_OF_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
