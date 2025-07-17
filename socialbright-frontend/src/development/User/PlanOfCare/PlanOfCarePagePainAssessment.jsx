import React from 'react';

export default function PlanOfCarePagePainAssessment({ form, setForm }) {
  const handleCheckboxChange = (label) => {
    const updated = form.painTolerance.includes(label)
      ? form.painTolerance.filter((item) => item !== label)
      : [...form.painTolerance, label];

    setForm((prev) => ({ ...prev, painTolerance: updated }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 my-6 rounded-2xl shadow-md space-y-6 text-sm text-black">
      <h2 className="text-lg font-bold mb-2">Pain Assessment</h2>

      {/* Pain Level / Activity Tolerance */}
      <div>
        <label className="font-semibold block mb-2">Pain Level / Activity Tolerance</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'No Pain',
            'Can be ignored',
            'Interferes with tasks',
            'Interferes with concentration',
            'Requires bed rest',
          ].map((label) => (
            <label key={label} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={label}
                checked={form.painTolerance.includes(label)}
                onChange={() => handleCheckboxChange(label)}
                className="h-4 w-4"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location of Pain */}
      <div>
        <label className="font-semibold block mb-2">Location of pain</label>
        <input
          type="text"
          name="painLocation"
          value={form.painLocation}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Pain Scale */}
      <div>
        <label className="font-semibold block mb-2">On a scale of 1 - 10, level of pain?</label>
        <input
          type="number"
          name="painScale"
          min="1"
          max="10"
          value={form.painScale}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Pain Relief */}
      <div>
        <label className="font-semibold block mb-2">What relieves pain?</label>
        <input
          type="text"
          name="painRelief"
          value={form.painRelief}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Pain Relief Level */}
      <div>
        <label className="font-semibold block mb-2">What level is pain relieved to?</label>
        <input
          type="text"
          name="painReliefLevel"
          value={form.painReliefLevel}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </section>
  );
}
