'use client';

import { useEffect } from 'react';
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from '@reown/appkit/react';
import { useClientMounted } from '@/hooks/useClientMount';

export const InfoList = () => {
  const kitTheme = useAppKitTheme();
  const state = useAppKitState();
  // const {address, caipAddress, isConnected, embeddedWalletInfo} = useAppKitAccount();
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
    useAppKitAccount();
  const events = useAppKitEvents();
  const walletInfo = useWalletInfo();
  const mounted = useClientMounted();
  useEffect(() => {
    console.log('Events: ', events);
  }, [events]);

  return !mounted ? null : (
    <>
      <div className="text-left">
        <h2 className="text-1xl font-bold tracking-tight sm:text-1xl">
          useAppKit
        </h2>
        <pre>
          Address: {address}
          <br />
          caip Address: {caipAddress}
          <br />
          Connected: {isConnected.toString()}
          <br />
          Account Type: {embeddedWalletInfo?.accountType}
          <br />
          {embeddedWalletInfo?.user?.email &&
            `Email: ${embeddedWalletInfo?.user?.email}\n`}
          {embeddedWalletInfo?.user?.username &&
            `Username: ${embeddedWalletInfo?.user?.username}\n`}
          {embeddedWalletInfo?.authProvider &&
            `Provider: ${embeddedWalletInfo?.authProvider}\n`}
        </pre>
      </div>

      <div className="text-left">
        <h2 className="text-1xl font-bold tracking-tight sm:text-1xl">Theme</h2>
        <pre>
          Theme: {kitTheme.themeMode}
          <br />
        </pre>
      </div>

      <div className="text-left">
        <h2 className="text-1xl font-bold tracking-tight sm:text-1xl">State</h2>
        <pre>
          activeChain: {state.activeChain}
          <br />
          activeChainID: {state.selectedNetworkId}
          <br />
          loading: {state.loading.toString()}
          <br />
          open: {state.open.toString()}
          <br />
        </pre>
      </div>

      <div className="text-left">
        <h2 className="text-1xl font-bold tracking-tight sm:text-1xl">
          WalletInfo
        </h2>
        <pre>
          Name: {walletInfo.walletInfo?.name?.toString()}
          <br />
        </pre>
      </div>
    </>
  );
};
