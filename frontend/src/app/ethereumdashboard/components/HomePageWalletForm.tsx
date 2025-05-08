'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import addressValidator from '../utils/functions/addressValidator';
import { Input } from './ui/input';
import { Button } from './ui/button';

// Custom Component for working with the Home Page Wallet Form
export default function HomePageWalletForm() {
  const walletAddressRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Function for handling form submissions
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addressValidator(walletAddressRef.current!.value.trim())) {
      router.push(`/wallet-activity/${walletAddressRef.current!.value.trim()}`);
    } else {
      setError('Invalid wallet address. Please check and try again.');
    }
  };

  // Return JSX code for working with the Home Page Wallet Form Component
  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Enter Wallet Address"
          ref={walletAddressRef}
          className="flex-grow rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
          max={42}
          min={42}
        />
        <Button
          type="submit"
          className="transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
        >
          Search! &raquo;
        </Button>
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
}
