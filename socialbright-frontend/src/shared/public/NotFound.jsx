import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@components/Navbar';

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-24 text-black">
        <div className="bg-white p-8 rounded-xl shadow max-w-md text-center">
          <h1 className="text-5xl font-bold text-[#007B94] mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#007B94] text-white px-5 py-2 rounded font-medium text-sm hover:bg-[#00657a] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
