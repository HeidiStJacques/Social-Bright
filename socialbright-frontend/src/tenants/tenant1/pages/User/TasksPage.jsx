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
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    client_id: '',
    task: '',
    status: 'To Do',
    subtasks: ['']
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const tenantId = localStorage.getItem('tenantId');

  useEffect(() => {
    fetchTasks();
    fetchClients();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`, getAuthHeaders());
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/clients/`, getAuthHeaders());
      setClients(res.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const handleTaskChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (i, value) => {
    const updated = [...taskForm.subtasks];
    updated[i] = value;
    setTaskForm({ ...taskForm, subtasks: updated });
  };

  const addSubtaskField = () => {
    setTaskForm({ ...taskForm, subtasks: [...taskForm.subtasks, ''] });
  };

  const submitTask = async () => {
    if (!taskForm.client_id || !taskForm.task) return alert("Client and Task are required");

    const subtasks = taskForm.subtasks.filter(s => s.trim() !== '').map(s => ({ label: s, checked: false }));

    const payload = {
      client_id: parseInt(taskForm.client_id),
      task: taskForm.task,
      status: taskForm.status,
      subtasks,
      due_date: '',
      user_id: user?.id,
      tenant_id: parseInt(tenantId),
    };

    try {
      const res = await axios.post(`${API_BASE}/api/tasks`, payload, getAuthHeaders());
      setTasks([...tasks, res.data]);
      setShowModal(false);
      setTaskForm({ client_id: '', task: '', status: 'To Do', subtasks: [''] });
    } catch (err) {
      console.error('Error submitting task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16 text-black text-sm">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center">Client Tasks</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1 text-sm rounded bg-[#007B94] text-white hover:bg-[#00657a]"
          >
            Add Task
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4">
              <h2 className="text-lg font-semibold mb-2">New Task</h2>

              <select
                name="client_id"
                value={taskForm.client_id}
                onChange={handleTaskChange}
                className="w-full p-2 border"
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.first_name} {c.last_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="task"
                value={taskForm.task}
                onChange={handleTaskChange}
                placeholder="Task description"
                className="w-full p-2 border"
              />

              <select
                name="status"
                value={taskForm.status}
                onChange={handleTaskChange}
                className="w-full p-2 border"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <div>
                <label className="font-semibold">Subtasks</label>
                {taskForm.subtasks.map((sub, i) => (
                  <input
                    key={i}
                    value={sub}
                    onChange={(e) => handleSubtaskChange(i, e.target.value)}
                    placeholder={`Subtask ${i + 1}`}
                    className="w-full p-2 mt-1 border"
                  />
                ))}
                <button
                  type="button"
                  onClick={addSubtaskField}
                  className="text-[#007B94] text-sm mt-2"
                >
                  + Add Subtask
                </button>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(false)} className="text-gray-600 hover:underline">Cancel</button>
                <button onClick={submitTask} className="bg-[#007B94] text-white px-4 py-1 rounded">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-4 mt-6">
          {tasks.map((task) => {
            const client = clients.find(c => c.id === task.client_id);
            const clientName = client ? `${client.first_name} ${client.last_name}` : 'Unknown';

            return (
              <div key={task.id} className="bg-white p-4 rounded shadow">
                <div className="font-bold">{task.task}</div>
                <div className="text-sm text-gray-600">Client: {clientName}</div>
                <div className="text-sm text-gray-600 mb-2">Status: {task.status}</div>
                <ul className="list-disc ml-5 text-sm text-gray-800">
                  {task.subtasks?.map((s, i) => (
                    <li key={i}>{s.label}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
