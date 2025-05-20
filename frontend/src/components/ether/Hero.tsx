import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 px-6 py-20">
      {/* Content Container */}
      <div className="relative z-10 tracking-tight flex w-full flex-col items-center text-center">
        {/* Heading */}
        <h1 className="mt-10 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Empower Your DApp Development
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
          Simplify wallet integration for Web3 applications with Reown AppKit.
          Build EVM compatible solutions and streamline blockchain wallet
          interactions seamlessly.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://github.com/ex-magazine/reown-appkit-ether"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-indigo-700 shadow-md transition duration-300 hover:bg-gray-100"
          >
            Explore on GitHub
          </a>
          <a
            href="#features"
            className="text-white rounded-full bg-indigo-800 px-8 py-3 text-lg font-semibold shadow-md transition duration-300 hover:bg-indigo-900"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          className="h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.7"
            d="M0,224L48,192C96,160,192,96,288,85.3C384,75,480,117,576,128C672,139,768,117,864,106.7C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
