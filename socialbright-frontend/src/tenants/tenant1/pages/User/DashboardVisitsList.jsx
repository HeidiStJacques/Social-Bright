import React from 'react';

export default function DashboardVisitsList({ visits }) {
  if (!visits || visits.length === 0) {
    return <p className="text-sm text-gray-500">No upcoming visits.</p>;
  }

  return (
    <ul className="mt-2 space-y-2">
      {visits.map((visit, index) => (
        <li key={index} className="bg-white p-3 shadow rounded-md">
          <div className="font-semibold">{visit.client_name}</div>
          <div className="text-sm text-gray-600">
            {new Date(visit.start_time).toLocaleString()}
          </div>
          <div className="text-sm">{visit.description}</div>
        </li>
      ))}
    </ul>
  );
}
