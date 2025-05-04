import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ethereumdashboard/ui/button';

import { FlameIcon } from 'lucide-react';



export default function NotFound() {
  return (
    <div className="bg-gray-800 px-4 py-10 text-gray-300 shadow-lg sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-100">404</h1>
        <FlameIcon size={96} />
        <h2 className="mb-6 text-3xl font-semibold text-gray-300">
          Page Not Found
        </h2>
        <p className="mb-8 text-xl text-gray-400">
          Oops! The page you are looking for does not exist on this app.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            className="transform rounded-md bg-gradient-to-r from-gray-600 to-gray-400 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:from-gray-500 hover:to-gray-300"
            asChild
          >
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-6 py-3 text-base font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
