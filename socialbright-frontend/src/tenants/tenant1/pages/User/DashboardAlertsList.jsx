import React from 'react';

export default function DashboardAlertsList({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <p className="text-sm text-gray-500">No active alerts.</p>;
  }

  return (
    <ul className="mt-2 space-y-2">
      {alerts.map((alert, index) => (
        <li key={index} className="bg-white p-3 shadow rounded-md border-l-4"
            style={{ borderColor: alert.type === 'Urgent' ? '#dc2626' : alert.type === 'Warning' ? '#facc15' : '#3b82f6' }}>
          <div className="font-semibold">{alert.client_name}</div>
          <div className="text-sm">{alert.message}</div>
          <div className="text-xs text-gray-500">{alert.type} • {new Date(alert.date).toLocaleDateString()}</div>
        </li>
      ))}
    </ul>
  );
}
