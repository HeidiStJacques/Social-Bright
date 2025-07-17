import React, { useState } from 'react';
import { format } from 'date-fns';

const initialTasks = [
  {
    id: 1,
    view: 'title',
    title: 'Follow up with guardian',
    description: 'Call to confirm medication schedule.',
    dueDate: '2025-07-08',
    status: 'To Do',
  },
  {
    id: 2,
    view: 'client',
    clientName: 'Jane Doe',
    task: 'Complete eligibility paperwork',
    dueDate: '2025-07-10',
    status: 'In Progress',
    subtasks: [
      { label: 'Print MEA form', checked: false },
      { label: 'Upload income proof', checked: true },
    ],
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [newTaskType, setNewTaskType] = useState('title');

  const toggleSubtask = (taskId, subIndex) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s, i) =>
                i === subIndex ? { ...s, checked: !s.checked } : s
              ),
            }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    return filter === 'All' || task.status === filter;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'name') {
      return (a.title || a.task || '').localeCompare(b.title || b.task || '');
    } else {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = () => {
    const newId = Date.now();
    const base = {
      id: newId,
      dueDate: '',
      status: 'To Do',
    };

    if (newTaskType === 'title') {
      setTasks([
        ...tasks,
        { ...base, view: 'title', title: 'New Task', description: '' },
      ]);
    } else {
      setTasks([
        ...tasks,
        {
          ...base,
          view: 'client',
          clientName: 'New Client',
          task: 'New Client Task',
          subtasks: [],
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 text-black text-sm">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">Tasks</h1>

        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setNewTaskType('title')}
              className={`px-3 py-1 text-sm rounded border ${
                newTaskType === 'title'
                  ? 'bg-[#007B94] text-white'
                  : 'text-[#007B94] border-[#007B94] bg-white hover:bg-[#007B94]/10'
              }`}
            >
              Title View
            </button>
            <button
              onClick={() => setNewTaskType('client')}
              className={`px-3 py-1 text-sm rounded border ${
                newTaskType === 'client'
                  ? 'bg-[#007B94] text-white'
                  : 'text-[#007B94] border-[#007B94] bg-white hover:bg-[#007B94]/10'
              }`}
            >
              Client View
            </button>
          </div>

          <button
            onClick={addTask}
            className="px-3 py-1 text-sm rounded bg-[#007B94] text-white hover:bg-[#00657a]"
          >
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-1 border rounded text-sm text-black"
          >
            <option>All</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-1 border rounded text-sm text-black"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              {task.view === 'title' ? (
                <>
                  <h2 className="text-sm font-semibold">{task.title}</h2>
                  <p className="text-sm text-gray-800">{task.description}</p>
                </>
              ) : (
                <>
                  <h2 className="text-sm font-semibold">{task.clientName}</h2>
                  <p className="text-sm text-gray-800 mb-2">{task.task}</p>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-gray-800">
                    {task.subtasks?.map((sub, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={sub.checked}
                          onChange={() => toggleSubtask(task.id, i)}
                        />
                        <span className={sub.checked ? 'line-through' : ''}>
                          {sub.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-2 flex flex-wrap items-center justify-between text-sm">
                <div className="text-gray-700">
                  Due:{' '}
                  {task.dueDate
                    ? format(new Date(task.dueDate), 'MMM d, yyyy')
                    : '—'}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === task.id ? { ...t, status: e.target.value } : t
                        )
                      )
                    }
                    className="border rounded p-1 text-sm text-black"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
