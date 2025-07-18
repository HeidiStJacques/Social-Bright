import { useNavigate } from 'react-router-dom';
import { useTenant } from '@shared/context/TenantContext';

export function useLogout() {
  const navigate = useNavigate();
  const { setTenantId, setTenantName } = useTenant();

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout failed:', err);
    }

    localStorage.removeItem('access_token');
    setTenantId(null);
    setTenantName(null);

    navigate('/login');
  };

  return logout;
}
