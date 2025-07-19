import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const API_BASE = 'http://localhost:8000';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('due_date');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`, getAuthHeaders());
      console.log("✅ tasks fetched:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async () => {
    try {
      const newTask = {
        task: 'New Task',
        status: 'To Do',
        due_date: '',
        client_id: null,
        subtasks: [],
      };
      const res = await axios.post(`${API_BASE}/api/tasks`, newTask, getAuthHeaders());
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (taskId, updatedFields) => {
    try {
      const existing = tasks.find((t) => t.id === taskId);
      const updatedTask = { ...existing, ...updatedFields };
      const res = await axios.put(`${API_BASE}/api/tasks/${taskId}`, updatedTask, getAuthHeaders());
      setTasks((prev) => prev.map((t) => (t.id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE}/api/tasks/${taskId}`, getAuthHeaders());
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const toggleSubtask = (taskId, subIndex) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !task.subtasks) return;

    const updatedSubtasks = task.subtasks.map((s, i) =>
      i === subIndex ? { ...s, checked: !s.checked } : s
    );
    updateTask(taskId, { subtasks: updatedSubtasks });
  };

  const filteredTasks = tasks.filter(
    (task) => filter === 'All' || task.status === filter
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'name') {
      return (a.task || '').localeCompare(b.task || '');
    }
    return new Date(a.due_date) - new Date(b.due_date);
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16 text-black text-sm">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">Client Tasks</h1>

        {/* Controls */}
        <div className="flex justify-end mb-4">
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
            <option value="due_date">Sort by Due Date</option>
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
              <h2 className="text-sm font-semibold">{task.client_name || 'General'}</h2>
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

              <div className="mt-2 flex flex-wrap items-center justify-between text-sm">
                <div className="text-gray-700">
                  Due:{' '}
                  {task.due_date
                    ? format(new Date(task.due_date), 'MMM d, yyyy')
                    : '—'}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(e) => updateTask(task.id, { status: e.target.value })}
                    className="border rounded p-1 text-sm text-black"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                  <button
                    onClick={() => deleteTask(task.id)}
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
