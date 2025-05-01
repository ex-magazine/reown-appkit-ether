import React from 'react';

const ContentSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Why Choose AppKit Connect?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover how AppKit Connect simplifies blockchain integration and
            empowers your DApp development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 100-6 3 3 0 000 6zm0 0a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              Seamless Wallet Integration
            </h3>
            <p className="text-gray-600">
              Connect to Web3 wallets effortlessly with built-in tools like
              Web3Modal and Wagmi.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              EVM Compatibility
            </h3>
            <p className="text-gray-600">
              Works seamlessly with Ethereum, Polygon, Flare, and other
              EVM-compatible blockchains.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800">
              Easy Smart Contract Interaction
            </h3>
            <p className="text-gray-600">
              Use prebuilt hooks like <code>useReadContract</code> and{' '}
              <code>useWriteContract</code>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
