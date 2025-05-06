// pages/404.js
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-6xl font-bold text-white">404</h1>
      <p className="mb-12 text-3xl text-white">Page not found</p>
      <div className="rounded-lg bg-slate-900/20 p-8 shadow-inner shadow-md backdrop-blur-lg">
        <p className="mb-6 text-lg text-gray-200">
          It seems like you're lost. Don't worry, we'll help you get back on
          track.
        </p>
        <a
          href="/"
          className="rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-600"
        >
          Return to Homes
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
