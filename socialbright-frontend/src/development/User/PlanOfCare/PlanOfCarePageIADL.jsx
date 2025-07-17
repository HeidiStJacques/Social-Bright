import React from 'react';

export default function PlanOfCarePageIADL({ form, setForm }) {
  const handleIADLChange = (item, level) => {
    setForm((prev) => ({
      ...prev,
      iadl: {
        ...prev.iadl,
        [item]: level,
      },
    }));
  };

  const handleFourOrMoreChange = (value) => {
    setForm((prev) => ({
      ...prev,
      iadl: {
        ...prev.iadl,
        assistanceWithFourOrMore: value,
      },
    }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 my-6 rounded-2xl shadow-md text-sm text-black space-y-6">
      <h2 className="text-lg font-bold">Incidental Activities of Daily Living</h2>

      {[
        'Appointments',
        'Cleaning',
        'Finance',
        'Laundry',
        'MealPreparation',
        'Shopping',
        'Telephone',
        'Transportation',
      ].map((item) => {
        const formattedLabel = item.replace(/([A-Z])/g, ' $1').trim();
        return (
          <div key={item}>
            <p className="font-semibold mb-1">{formattedLabel}</p>
            <div className="flex flex-wrap gap-4">
              {['Independent', 'Minimal Assistance', 'Moderate Assistance', 'Total Assistance'].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`iadl-${item}`}
                    className="h-4 w-4"
                    checked={form.iadl?.[item] === level}
                    onChange={() => handleIADLChange(item, level)}
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {/* Assistance with 4 or more IADLs */}
      <div>
        <label className="block font-semibold mb-2">
          Does participant need assistance with 4 or more IADLs?
        </label>
        <select
          value={form.iadl?.assistanceWithFourOrMore || ''}
          onChange={(e) => handleFourOrMoreChange(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="">--Please Select--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </section>
  );
}
