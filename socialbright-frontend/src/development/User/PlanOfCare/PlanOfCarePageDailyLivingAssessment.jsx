import React from 'react';

export default function PlanOfCarePageDailyLivingAssessment({ form, setForm }) {
  const toggleCheckboxInArray = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-white text-sm text-black p-4 sm:p-6 my-6 rounded-2xl shadow-md space-y-6">
      <h2 className="text-lg font-bold">Daily Living Assessment</h2>

      {/* Medication Management */}
      <div>
        <p className="font-semibold mb-1">Medication Management (check all that apply)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Independent",
            "Medication planner",
            "Set up",
            "Verbal reminder",
            "Participant depends on another person for administration of medications",
          ].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={form.medicationManagement.includes(option)}
                onChange={() => toggleCheckboxInArray("medicationManagement", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Medication Assistance Text Prompts */}
      {["Set up", "Verbal reminder", "Participant depends on another person for administration of medications"]
        .filter((key) => form.medicationManagement.includes(key))
        .map((key) => (
          <div key={key}>
            <label className="font-semibold block mb-1">
              Name of person assisting with medication and how they assist:
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              value={form.medicationAssistanceDetails?.[key] ?? ''}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  medicationAssistanceDetails: {
                    ...prev.medicationAssistanceDetails,
                    [key]: e.target.value,
                  },
                }))
              }
            />
          </div>
        ))}

      {/* Assistive Devices */}
      <div>
        <p className="font-semibold mb-1">Assistive Devices</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Cane", "Walker", "Crutches", "Wheelchair", "Hospital Bed", "Commode",
            "Shower Chair", "Raised Toilet Seat", "Grab Bars", "Trapeze", "Hoyer Lift",
            "Oxygen", "None", "Other",
          ].map((device) => (
            <label key={device} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={form.assistiveDevices.includes(device)}
                onChange={() => toggleCheckboxInArray("assistiveDevices", device)}
              />
              {device}
            </label>
          ))}
        </div>

        {form.assistiveDevices.includes("Other") && (
          <div className="mt-2">
            <label className="font-semibold block mb-1">Other assistive device:</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={form.assistiveDeviceOther}
              onChange={(e) => updateField("assistiveDeviceOther", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Incontinence Supplies */}
      <div>
        <p className="font-semibold mb-1">Does participant use incontinence supplies?</p>
        <div className="flex flex-wrap gap-6">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="usesIncontinenceSupplies"
                className="h-4 w-4"
                checked={form.usesIncontinenceSupplies === option}
                onChange={() => updateField("usesIncontinenceSupplies", option)}
              />
              {option}
            </label>
          ))}
        </div>

        {form.usesIncontinenceSupplies === "Yes" && (
          <div className="mt-2">
            <label className="font-semibold block mb-1">
              Incontinence supplies provider / frequency / product / sizing / amount:
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              value={form.incontinenceDetails}
              onChange={(e) => updateField("incontinenceDetails", e.target.value)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
