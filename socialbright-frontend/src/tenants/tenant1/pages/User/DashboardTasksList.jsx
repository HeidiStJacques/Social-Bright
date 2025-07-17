import React from 'react';

export default function DashboardTasksList({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-gray-500">No tasks assigned.</p>;
  }

  return (
    <ul className="mt-2 space-y-2">
      {tasks.map((task, index) => (
        <li key={index} className="bg-white p-3 shadow rounded-md">
          <div className="font-semibold">{task.client_name}</div>
          <div className="text-sm text-gray-600">{task.title}</div>
          <div className="text-sm">Due: {new Date(task.due_date).toLocaleDateString()}</div>
          <div className="text-sm text-blue-600">Status: {task.status}</div>
        </li>
      ))}
    </ul>
  );
}
