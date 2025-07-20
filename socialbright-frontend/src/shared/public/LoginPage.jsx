import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

import Navbar from '@components/Navbar';
import { useTenant } from '@shared/context/TenantContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setTenantId, setTenantName } = useTenant();

  // ...no changes at the top

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await axios.post('http://localhost:8000/api/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { user, access_token } = response.data;
    const token = access_token;

    if (!user || !user.roles || user.roles.length === 0) {
      throw new Error('Unauthorized: no valid roles');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setTenantId(user.tenant_id);
    setTenantName(user.tenant_name);

    if (user.roles.includes('superuser')) {
      navigate('/superuser/dashboard');
    } else if (user.roles.includes('admin')) {
      navigate('/admin/dashboard');
    } else if (user.roles.includes('case_manager')) {
      navigate('/dashboard');
    } else {
      throw new Error('Unauthorized: role not recognized');
    }

  } catch (err) {
    console.error('Login failed:', err);
    setError('Invalid email or password.');
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20 px-2">
        <form onSubmit={handleLogin} className="bg-white w-full max-w-sm p-6 rounded-lg shadow">
          <h1 className="text-xl font-bold text-center text-black mb-4">Login</h1>

          {error && (
            <div className="mb-3 text-red-600 text-sm text-center bg-red-50 border border-red-200 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <label htmlFor="email" className="block text-sm text-black mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1.5 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007B94] text-black"
          />

          <label htmlFor="password" className="block text-sm text-black mb-1">Password</label>
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1.5 pr-16 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007B94] text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#007B94] text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2 accent-[#007B94]"
            />
            <label htmlFor="rememberMe" className="text-sm text-black">Remember Me</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-1.5 rounded text-white font-semibold flex items-center justify-center text-sm transition ${
              loading ? 'bg-[#00657a] cursor-not-allowed' : 'bg-[#007B94] hover:bg-[#00657a]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>

          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-[#007B94] text-sm hover:underline transition">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
