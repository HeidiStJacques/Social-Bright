import React from 'react';

export default function PlanOfCarePageSubstanceUse({ form, setForm }) {
  const handleRadioChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      substanceUse: {
        ...prev.substanceUse,
        [key]: value,
      },
    }));
  };

  return (
    <section className="bg-white text-sm text-black p-4 sm:p-6 my-6 rounded-2xl shadow-md space-y-6">
      <h2 className="text-lg font-bold">Substance Use</h2>

      {/* Nicotine Use */}
      <div>
        <label className="block font-semibold mb-1">Nicotine</label>
        <select
          className="w-full max-w-sm border rounded-md p-2"
          value={form.substanceUse?.nicotine || ''}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              substanceUse: {
                ...prev.substanceUse,
                nicotine: e.target.value,
              },
            }))
          }
        >
          <option value="">--Please Select--</option>
          <option value="Presently">Presently</option>
          <option value="Formerly">Formerly</option>
          <option value="Occasionally">Occasionally</option>
          <option value="Never">Never</option>
        </select>
      </div>

      {/* Yes/No Questions */}
      {[
        { label: 'Have you ever abused alcohol?', key: 'alcoholAbuse' },
        { label: 'Have you ever abused prescription drugs?', key: 'prescriptionAbuse' },
        { label: 'Do you have a history of withdrawals?', key: 'withdrawalHistory' },
        { label: 'Have you had treatment for alcohol and/or drug addiction problems?', key: 'treatmentHistory' },
        { label: 'Do any of these issues prevent the participant from receiving services?', key: 'serviceBarrier' },
      ].map(({ label, key }) => (
        <div key={key}>
          <label className="block font-semibold mb-1">{label}</label>
          <div className="flex gap-4">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`substance-${key}`}
                  className="h-4 w-4"
                  checked={form.substanceUse?.[key] === option}
                  onChange={() => handleRadioChange(key, option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Comments */}
      <div>
        <label className="block font-semibold mb-1">Comments:</label>
        <textarea
          rows={4}
          className="w-full border rounded-md p-2"
          value={form.substanceUse?.comments || ''}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              substanceUse: {
                ...prev.substanceUse,
                comments: e.target.value,
              },
            }))
          }
        />
      </div>
    </section>
  );
}
