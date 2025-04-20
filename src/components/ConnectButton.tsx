'use client';

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { useReown } from 'reown';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useReown();

  if (isConnected && address) {
    return (
      <div className="flex gap-4">
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {ensName ?? address.substring(0, 6) + '...' + address.substring(38)}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => openConnectModal()}
      className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    >
      Connect Wallet
    </button>
  );
}
