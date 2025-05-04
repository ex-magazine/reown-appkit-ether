'use client';

import { LoaderCircleIcon } from 'lucide-react';

import useMounted from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

import Container from '@/components/ethereumdapp/layout/container';
import Account from '@/components/ethereumdapp/account';
import Network from '@/components/ethereumdapp/network';
import SignMessage from '@/components/ethereumdapp/sign-message';
import SendTransaction from '@/components/ethereumdapp/send-transaction';
import SmartContractLauncher from '@/components/ethereumdapp/smart-contract-launcher';
import UnitConverter from '@/components/ethereumdapp/unit-converter';
import TransactionCenter from '@/components/ethereumdapp/transaction-center';

const MainSection = () => {
  const isMounted = useMounted();

  return (
    <Container>
      {isMounted && (
        <section
          className={cn(
            'grid grid-cols-1 gap-4 py-6',
            'md:grid-cols-2 md:items-start',
          )}
        >
          <div
            className={cn(
              'grid grid-cols-1 gap-4',
              'md:items-start',
              'xl:grid-cols-2',
            )}
          >
            <div className={cn('grid grid-cols-1 gap-4', 'md:items-start')}>
              <Account />
              <Network />
            </div>
            <div className={cn('grid grid-cols-1 gap-4', 'md:items-start')}>
              <TransactionCenter />
              <UnitConverter />
            </div>
          </div>
          <div
            className={cn(
              'grid grid-cols-1 gap-4',
              'md:items-start',
              'xl:grid-cols-2',
            )}
          >
            <div className={cn('grid grid-cols-1 gap-4', 'md:items-start')}>
              <SmartContractLauncher />
            </div>
            <div className={cn('grid grid-cols-1 gap-4', 'md:items-start')}>
              <SignMessage />
              <SendTransaction />
            </div>
          </div>
        </section>
      )}

      {!isMounted && (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-3.5rem)] p-8">
          <LoaderCircleIcon size={48} className="animate-spin" />
        </div>
      )}
    </Container>
  );
};

export default MainSection;
