'use client';
import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
} from '@reown/appkit/react';
import { networks } from '@/config/network';

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { caipNetwork, switchNetwork } = useAppKitNetwork();

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };
  return (
    <div>
      <button
        className="text-small mr-5 mb-5 rounded-full bg-indigo-800 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-900"
        onClick={() => open()}
      >
        Open
      </button>
      <button
        className="text-small mr-5 mb-5 rounded-full bg-indigo-800 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-900"
        onClick={handleDisconnect}
      >
        Disconnect
      </button>
      <button
        className="text-small rounded-full bg-indigo-800 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-900"
        onClick={() => {
          const len = networks.length;
          let net_index: number = 0;
          const networkName = caipNetwork?.name;
          for (let i = 0; i < len; i++) {
            if (networks[i].name == networkName) {
              net_index = i;
              break;
            }
          }
          switchNetwork(networks[(net_index + 1) % len]);
        }}
      >
        Switch Network
      </button>
    </div>
  );
};
