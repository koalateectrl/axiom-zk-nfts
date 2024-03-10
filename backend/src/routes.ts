import errs from 'restify-errors';
import { publicClient } from './viem';
import {
  COMPOUND_TOKENS,
  AAVE_TOKENS,
  MAINNET_BLOCKS_PER_DAY,
  BALANCE_OF_ABI,
} from './constants';

/// Checks whether the given account is a valid Ethereum address.
const isValidAccount = (account: `0x${string}`) =>
  account && account.length === 42;

/// Returns an array of 7 block numbers to query the user's balance over.
const getBalanceQueryBlocks = async () => {
  const currentBlockNumber = await publicClient.getBlockNumber();

  return [...new Array(7)].map((_, index) => {
    return currentBlockNumber - MAINNET_BLOCKS_PER_DAY * BigInt(index);
  });
};

// Create an object where the keys are the token addresses, and
// values are a list of user token balances over the past 7 days.
const makeEmptyBalancesObject = (tokens: `0x${string}`[]) =>
  tokens.reduce(
    (acc, val) => ({
      ...acc,
      [val]: [],
    }),
    {}
  );

/// Get account balances for a list of tokens over the past 7 days/block periods.
const getBalances = async (account: `0x${string}`, tokens: `0x${string}`[]) => {
  const balanceQueryBlocks = await getBalanceQueryBlocks();
  const balances: {
    [key: `0x${string}`]: BigInt[];
  } = makeEmptyBalancesObject(tokens);

  for (let i = 0; i < tokens.length; ++i) {
    for (let j = 0; j < balanceQueryBlocks.length; ++j) {
      const balance: any = await publicClient.readContract({
        address: tokens[i],
        abi: BALANCE_OF_ABI,
        functionName: 'balanceOf',
        blockNumber: balanceQueryBlocks[j],
        args: [account],
      });

      balances[tokens[i]].push(balance);
    }
  }

  return balances;
};

export default (app: any) => {
  app.get('/compound/balances/:account', async (req: any, res: any) => {
    const { account } = req.params;

    if (!isValidAccount(account)) {
      res.send(new errs.BadRequestError('Invalid account'));
    } else {
      try {
        res.json(await getBalances(account, COMPOUND_TOKENS));
      } catch (err) {
        res.send(new errs.BadRequestError(err));
      }
    }
  });

  app.get('/aave/balances/:account', async (req: any, res: any) => {
    const { account } = req.params;

    if (!isValidAccount(account)) {
      res.send(new errs.BadRequestError('Invalid account'));
    } else {
      try {
        res.json(await getBalances(account, AAVE_TOKENS));
      } catch (err) {
        res.send(new errs.BadRequestError(err));
      }
    }
  });
};
