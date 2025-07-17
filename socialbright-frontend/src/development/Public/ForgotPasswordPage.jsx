import React, { useState } from 'react';
import Navbar from '@components/Navbar';
import { useTenant } from '@context/TenantContext';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setTenantId } = useTenant();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional tenant logic here
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20 px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-sm p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-bold text-center text-black mb-4">
            Reset Password
          </h2>

          {submitted ? (
            <p className="text-center text-sm text-gray-700">
              If this email is associated with an account, a reset link will be sent.
            </p>
          ) : (
            <>
              <label htmlFor="email" className="block text-sm text-black mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-1.5 mb-3 border border-gray-300 rounded text-black focus:ring-2 focus:ring-[#007B94] focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-1.5 bg-[#007B94] text-white text-sm font-semibold rounded hover:bg-[#00657a] transition"
              >
                Send Link
              </button>
            </>
          )}

          <div className="text-center mt-4">
            <a
              href="/login"
              className="text-[#007B94] text-sm hover:underline transition"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
