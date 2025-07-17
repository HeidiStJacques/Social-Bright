import React, { useState } from 'react';
import { useTenant } from '@context/TenantContext';

export default function StatusForm() {
  const { tenantName } = useTenant();

  const [formData, setFormData] = useState({
    today: '',
    statusDate: '',
    billingStatus: [],
    billingComments: '',
    sendEmailTo: '',
    closureReason: '',
    closureNotes: '',
    programUsed: '',
  });

  const billingOptions = [
    'Open Financial', 'Closed Financial', 'MEA Overdue',
    'Medical Suspension Under 30 Days', 'Medical Suspension Over 30 Days',
    'Social Suspension Under 30 Days', 'Social Suspension Over 30 Days',
    'Closed CFI', 'Closed Medicaid', 'Case Management Closed',
    'Case Management Re-Established', 'No Benefit Plan',
    'No Service Authorization', 'New Referral', 'Other',
  ];

  const programOptions = [
    '-- Select Program --',
    'State Medicaid Portal',
    'Medicaid Managed Care',
    'Private Program',
    'Other',
  ];

  const staffOptions = [
    '-- Please Select --',
    'Jane Smith',
    'John Doe',
    'Alex Admin',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const list = prev.billingStatus.includes(value)
          ? prev.billingStatus.filter((item) => item !== value)
          : [...prev.billingStatus, value];
        return { ...prev, billingStatus: list };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="bg-gray-100 p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Status Form ({tenantName || 'Tenant'})</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black font-sans">
        <div>
          <label className="block">Today's Date</label>
          <input
            type="date"
            name="today"
            value={formData.today}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block">Status Date</label>
          <input
            type="date"
            name="statusDate"
            value={formData.statusDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block">Program Used</label>
          <select
            name="programUsed"
            value={formData.programUsed}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            {programOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Billing Status</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {billingOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="billingStatus"
                  value={option}
                  checked={formData.billingStatus.includes(option)}
                  onChange={handleChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block">Billing Comments</label>
          <textarea
            name="billingComments"
            value={formData.billingComments}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block">Send Staff Email Notification</label>
          <select
            name="sendEmailTo"
            value={formData.sendEmailTo}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            {staffOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Closure Reason</label>
          <input
            name="closureReason"
            value={formData.closureReason}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block">Closure Notes</label>
          <textarea
            name="closureNotes"
            value={formData.closureNotes}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Save
        </button>
      </form>
    </div>
  );
}
