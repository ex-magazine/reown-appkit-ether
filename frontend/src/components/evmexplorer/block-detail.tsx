'use client';

import type { ChainType } from '@evmexplorer/utility';

import type { TransactionBlockscout } from '@evmexplorer/blockscout';
import {
  parseHash,
  getNetworkId,
  getNetworkName,
  parseWithER,
  parseWei,
  parseNumber,
  parseNumberFixed,
} from '@evmexplorer/utility';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Loading } from '@/components/evmexplorer/Loading';
import { PageSEO } from '@/components/evmexplorer/SEO';
import { TransactionName } from '@/components/evmexplorer/TransactionName';
import {
  useBlockInfoBlockscout,
  useBlockTransactionsBlockscout,
} from '@/hooks/evmexplorer/blockscout';
import { useBlockTransactions } from '@/hooks/evmexplorer/viem';
import { parseTxTypes } from '@/styles/parseTypes';

// export const BlocksDetail = () => {
export function BlocksDetail({ blockId }: { blockId: Number }) {
  const pathname = usePathname();

  const parts = pathname.split('/');
  const network = parts[parts.length - 2];
  const block = parts[parts.length - 1];

  const networkQuery: string = String(network);
  const path: string =
    '/evmexplorer/blocks/' + networkQuery + '/' + String(blockId);

  const blockNumber: number = Number(block);

  const chainId: number = getNetworkId(networkQuery) ?? 1;
  const networkName: ChainType = getNetworkName(chainId) ?? 'mainnet';

  const { data: blockInfo } = useBlockInfoBlockscout(blockNumber, chainId);

  const { data: blockTransactions } = useBlockTransactionsBlockscout(
    blockNumber,
    chainId,
  );

  const { data: blockDataViem } = useBlockTransactions(
    networkName,
    blockNumber,
  );

  return (
    <>
      <PageSEO path={path} />

      <div className="mx-auto w-full space-y-12 text-center">
        {blockInfo && (
          <div>
            <h1 className="text-2xl mt-2 sm:text-3xl md:text-4xl mb-2 text-blue-300 font-mono tracking-wide">
              {parseNumber(blockInfo.height)}
            </h1>

            <div className="font-serif text-base md:text-lg mt-1 md:mt-3 mb-6 sm:mb-10 text-blue-400">
              Miner
              <Link
                href={`/evmexplorer/contracts/${networkName}/${blockInfo.miner?.hash}`}
                className="has-tooltip ml-1 hover:text-blue-700 tracking-wide"
              >
                <span className="tooltip -ml-6">{blockInfo.miner?.hash}</span>
                {blockInfo.miner?.ens_domain_name ??
                  parseHash(blockInfo.miner?.hash)}
              </Link>
              <p className="font-sans mt-1 md:mt-2 tracking-tighter">
                {new Date(blockInfo.timestamp).toLocaleString()}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-6 text-center lg:grid-cols-3 mt-6 sm:mt-8 md:mt-10 lg:mt-16">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base sm:text-lg text-zinc-400 brightness-90">
                  Gas usage
                </dt>
                <dd className="order-first text-3xl font-extrabold sm:text-4xl from-violet-500 via-blue-500 to-green-500 bg-linear-to-r bg-clip-text text-transparent">
                  {parseNumber(blockInfo.gas_used)}
                </dd>
              </div>

              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base sm:text-lg text-zinc-400 brightness-90">
                  Average Gas per Transaction
                </dt>
                <dd className="order-first text-3xl font-extrabold sm:text-4xl from-green-500 via-emerald-500 to-blue-500 bg-linear-to-r bg-clip-text text-transparent">
                  {parseNumberFixed(
                    Number(blockInfo.gas_used) / blockInfo.transaction_count,
                  )}
                </dd>
              </div>

              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base sm:text-lg text-zinc-400 brightness-90">
                  Transactions
                </dt>
                <dd className="order-first text-3xl font-extrabold sm:text-4xl from-teal-500 via-blue-500 to-green-500 bg-linear-to-r bg-clip-text text-transparent">
                  {parseNumber(blockInfo.transaction_count)}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {blockTransactions ? (
          <div className="px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8 md:mt-10 lg:mt-16 fade-in-1s">
            <div className="bg-slate-100 text-left sm:mt-10 ring-4 ring-slate-400 rounded-lg">
              <table className="min-w-full divide-y font-medium">
                <thead className="text-gray-800 bg-slate-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-6"
                    >
                      Hash
                      <p className="mt-1">Type</p>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-sm font-semibold lg:table-cell"
                    >
                      Method Call (Tx Type)
                      <p>From</p>
                      <p>To</p>
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-sm font-semibold lg:table-cell"
                    >
                      Gas Used
                      <p className="mt-1">Gas Price</p>
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-sm font-semibold lg:table-cell"
                    >
                      Value
                      <p className="mt-1">Fee</p>
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-sm font-semibold"
                    >
                      Result
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {blockTransactions?.items.map(
                    (transaction: TransactionBlockscout, index: number) => (
                      <tr key={transaction.hash}>
                        <td className="border-t border-gray-400 py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <Link
                            href={`/evmexplorer/transactions/${network}/${transaction.hash}`}
                            className="hover:text-teal-400 font-mono text-sm font-semibold"
                          >
                            {parseHash(transaction.hash)}
                          </Link>
                          <p className="mt-1 text-xs">
                            {blockDataViem?.transactions[index].type}
                          </p>
                        </td>

                        <td className="border-t border-gray-400 px-3 py-3.5 text-sm text-gray-400 lg:table-cell">
                          <div>
                            {transaction.method ? (
                              <span
                                className={
                                  'px-2 sm:px-2.5 py-0.5 rounded-sm font-bold mb-2 text-gray-100 hover:text-white break-all ' +
                                  parseTxTypes(transaction.transaction_types)
                                    .background
                                }
                              >
                                {transaction.method}
                              </span>
                            ) : (
                              <span
                                className={
                                  'px-2 sm:px-2.5 py-0.5 rounded-sm font-bold mb-2 text-gray-100 hover:text-white break-words ' +
                                  parseTxTypes(transaction.transaction_types)
                                    .background
                                }
                              >
                                {
                                  parseTxTypes(transaction.transaction_types)
                                    .placeholder
                                }
                              </span>
                            )}
                          </div>

                          <TransactionName
                            network={networkName}
                            transactionAddressData={transaction.from}
                            isSender={true}
                          />

                          <TransactionName
                            network={networkName}
                            transactionAddressData={transaction.to}
                            isSender={false}
                          />
                        </td>
                        <td className="border-t border-gray-400 hidden px-3 py-3.5 text-sm text-zinc-500 lg:table-cell">
                          {parseNumber(transaction.gas_used)}
                          <p className="mt-2">
                            {parseWei(String(transaction.gas_price))} Gwei
                          </p>
                        </td>
                        <td className="border-t border-gray-400 hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell">
                          {parseWithER(
                            transaction.value,
                            transaction.exchange_rate,
                          )}{' '}
                          USD
                          {
                            <p className="mt-2">
                              {parseWithER(
                                transaction.fee.value,
                                transaction.exchange_rate,
                              )}{' '}
                              USD
                            </p>
                          }
                        </td>
                        <td className="border-t border-gray-400 hidden px-3 py-3.5 text-sm text-zinc-500">
                          {transaction?.result ?? '...fetching'}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-16">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}

export default BlocksDetail;
