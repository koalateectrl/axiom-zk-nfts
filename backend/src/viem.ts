import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.RPC_URL ?? 'http://localhost:8545'),
});
