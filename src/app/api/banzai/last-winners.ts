import _ from 'lodash';
import { parseEther, formatEther } from 'viem';
import poolsConf from '@/config/pools';

const ETH_API_KEY: string | undefined = process.env.ETH_API_KEY;
const BSC_API_KEY: string | undefined = process.env.BSC_API_KEY;

export const config: { api: { bodyParser: boolean } } = {
  api: {
    bodyParser: false,
  },
};

const allowedChains: string[] = ['eth', 'bsc'];
let lastUpdated: number | false = false;
let cache: _.List<any> | null | undefined = [];

function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

async function reloadData(pool: { title?: string; address: any; stake: any; stakeWei?: string }, chain: string): Promise<void> {
  let url: string = `https://api.${chain === 'eth' ? 'etherscan' : 'bscscan'}.com/v2/api?module=account`;
  url += `&chainId=${chain === 'eth' ? '1' : '56'}`;
  url += `&action=txlistinternal&address=${pool.address}&page=1&offset=5&sort=desc`;
  url += `&apikey=${chain === 'eth' ? ETH_API_KEY : BSC_API_KEY}`;

  const req: Response | false = await fetch(url).catch((err) => {
    console.log('FAILED', err);
    return false;
  });

  if (req && req.ok) {
    const data: { result?: Array<{ value: bigint; hash: any; blockNumber: any; from: any; to: any; timeStamp: number; isError: any }> } = await req.json();
    console.log('DATA', data);
    if (data.result) {
      data.result.forEach((i) => {
        const d = {
          value: formatEther(i.value),
          hash: i.hash,
          block: i.blockNumber,
          from: i.from,
          to: i.to,
          chain,
          timestamp: i.timeStamp * 1,
        };

        if (d.value === `${pool.stake * 9}` && !Number(i.isError)) cache?.push(d);
      });
    }
  }
}

const handler = async (req: any, res: { status(arg0: number): { (): void; new(): void; json(arg0: { winners: any }): void; }; }; }) => {
  const now: number = Date.now();

  if (!lastUpdated || !cache || now > lastUpdated + 3 * 60 * 1000) {
    lastUpdated = now;
    cache = [];

    await Promise.allSettled(
      poolsConf.eth.map((pool) => reloadData(pool, 'eth'))
    );

    await Promise.allSettled(
      poolsConf.bsc.map((pool) => reloadData(pool, 'bsc'))
    );

    const c: Array<any> = _.orderBy(cache, ['timestamp'], ['desc']);
    cache = c;

  } else {
    console.log('Use cache');
  }

  res.status(200).json({ winners: cache.slice(0, 8) });
};

export default handler;