import React, { useState } from 'react';
import Navbar from '@components/Navbar';
import { useTenant } from '@context/TenantContext';

export default function PasswordResetPage() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { setTenantId } = useTenant();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Reset failed');

      setMessage(data.message || 'Password reset successful');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20 px-2">
        <form
          onSubmit={handleReset}
          className="bg-white w-full max-w-sm p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-bold text-center text-black mb-4">
            Reset Your Password
          </h2>

          <label htmlFor="token" className="block text-sm text-black mb-1">
            Reset Token
          </label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className="w-full px-3 py-1.5 mb-3 border border-gray-300 rounded text-black focus:ring-2 focus:ring-[#007B94] focus:outline-none"
          />

          <label htmlFor="newPassword" className="block text-sm text-black mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-1.5 mb-3 border border-gray-300 rounded text-black focus:ring-2 focus:ring-[#007B94] focus:outline-none"
          />

          <label htmlFor="confirm" className="block text-sm text-black mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full px-3 py-1.5 mb-3 border border-gray-300 rounded text-black focus:ring-2 focus:ring-[#007B94] focus:outline-none"
          />

          {error && (
            <p className="text-sm text-red-600 mb-2">{error}</p>
          )}
          {message && (
            <p className="text-sm text-green-600 mb-2">{message}</p>
          )}

          <button
            type="submit"
            className="w-full py-1.5 bg-[#007B94] text-white text-sm font-semibold rounded hover:bg-[#00657a] transition"
          >
            Reset Password
          </button>

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
