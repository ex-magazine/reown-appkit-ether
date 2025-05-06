'use client';

import React, { useState } from 'react';

export default function SendNotification() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const sendNotification = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notification: {
            title,
            body,
            url: 'https://app.example.com', // example URL for the notification
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const enviroment = process.env.NODE_ENV === 'development';

  if (!enviroment) {
    return (
      <div className="mx-auto max-w-md rounded-md bg-gray-100 p-6 shadow-md">
        <p className="text-gray-700">
          The notification feature is only available in development mode.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-md bg-gray-100 p-6 shadow-md">
      <h1 className="mb-4 text-xl font-semibold">Send Notification</h1>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Enter notification title"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2"
          placeholder="Enter notification body"
        />
      </div>

      <button
        onClick={sendNotification}
        className={`w-full rounded-md bg-blue-500 p-2 text-white ${
          loading ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </button>

      {success && (
        <p className="mt-4 text-green-600">Notification sent successfully!</p>
      )}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
    </div>
  );
}
