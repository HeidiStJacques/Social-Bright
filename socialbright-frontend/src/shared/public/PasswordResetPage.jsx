import React, { useState, useEffect } from 'react';
import Navbar from '@components/Navbar';
import { useTenant } from '@context/TenantContext';
import { useNavigate } from 'react-router-dom';


export default function PasswordResetPage() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { setTenantId } = useTenant();
  const navigate = useNavigate();

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    if (urlToken) setToken(urlToken);
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirm) {
      setError('Passwords do not match');
      return;
    }

try {
const response = await fetch('http://localhost:8000/api/auth/reset-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    token,
    new_password: newPassword,
  }),
});


 let data = {};
try {
  data = await response.json();
} catch {
  data = {}; // response had no JSON body
}

if (!response.ok) {
  throw new Error(data.detail || 'Reset failed');
}

  setMessage(data.message || 'Password reset successful');

  // ✅ Redirect only after success
  setTimeout(() => {
    navigate('/login');
  }, 2000);
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

          {error && (
            <p className="text-sm text-red-600 mb-3 text-center">{error}</p>
          )}
          {message && (
            <p className="text-sm text-green-600 mb-3 text-center">{message}</p>
          )}

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
            className="w-full px-3 py-1.5 mb-4 border border-gray-300 rounded text-black focus:ring-2 focus:ring-[#007B94] focus:outline-none"
          />

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
