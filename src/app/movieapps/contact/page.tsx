'use client';

import { useState } from 'react';
import { Metadata } from '../Metadata';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      <Metadata
        seoTitle="Contact Us"
        seoDescription="Contact us for any queries"
        seoKeywords="contact, email, message"
      />

      <div className="min-h-screen bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 pt-[8vw]">
          <h1 className="mb-12 text-center text-4xl font-bold">Contact Us</h1>

          <div className="rounded-2xl bg-gray-800 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 transition-colors focus:border-red-500 focus:outline-none"
                  onChange={(e: any) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 transition-colors focus:border-red-500 focus:outline-none"
                  onChange={(e: any) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 transition-colors focus:border-red-500 focus:outline-none"
                  onChange={(e: any) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-cyan-500 px-6 py-3 font-medium transition-colors hover:bg-cyan-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
