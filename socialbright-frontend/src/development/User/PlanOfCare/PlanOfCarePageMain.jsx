import React from 'react';

export default function PlanOfCarePageMain({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCareGiverChange = (index, field, value) => {
    const updated = [...form.careGivers];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, careGivers: updated }));
  };

  const addCareGiver = () => {
    setForm((prev) => ({
      ...prev,
      careGivers: [...prev.careGivers, { name: '', relationship: '', care: '' }],
    }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-6 text-sm text-black">
      <h2 className="text-lg font-bold">Main Section</h2>

      {/* Date & Visit Type */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Type of Visit</label>
          <select
            name="visitType"
            value={form.visitType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Face to Face">Face to Face</option>
            <option value="Other">Other</option>
            <option value="COVID-19">COVID-19</option>
          </select>
        </div>
      </div>

      {/* Emergency Info */}
      <p className="font-semibold">
        Participant has been advised GCM is a case management provider and NOT an emergency service provider...
      </p>
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="emergencyAcknowledged"
          checked={form.emergencyAcknowledged}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span>Acknowledged</span>
      </label>

      {/* Household Support & Institutionalization */}
      <div className="space-y-3">
        <label className="inline-flex items-start gap-2">
          <input
            type="checkbox"
            name="hasHouseholdSupport"
            checked={form.hasHouseholdSupport}
            onChange={handleChange}
            className="mt-1 w-4 h-4"
          />
          <span>
            Participant has individuals in their household who will provide care and/or access to care from outside the household.
          </span>
        </label>
        <label className="inline-flex items-start gap-2">
          <input
            type="checkbox"
            name="needsInstitutionalization"
            checked={form.needsInstitutionalization}
            onChange={handleChange}
            className="mt-1 w-4 h-4"
          />
          <span>
            Participant is identified as having a need for institutionalization in the absence of paid staff to meet care needs.
          </span>
        </label>
      </div>
      <p className="text-xs italic">
        Case Notes and supporting uploaded documentation are an integral part of this comprehensive Care Plan.
      </p>

      {/* In-Kind Care Giver */}
      <div>
        <label className="block mb-1 font-semibold">Is there an In-Kind Care Giver?</label>
        <select
          name="inKindCareGiver"
          value={form.inKindCareGiver}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {form.inKindCareGiver === 'Yes' && (
        <div className="space-y-4 mt-4">
          {form.careGivers.map((cg, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  value={cg.name}
                  onChange={(e) => handleCareGiverChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Relationship</label>
                <input
                  type="text"
                  value={cg.relationship}
                  onChange={(e) => handleCareGiverChange(index, 'relationship', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Care Provided</label>
                <input
                  type="text"
                  value={cg.care}
                  onChange={(e) => handleCareGiverChange(index, 'care', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCareGiver}
            className="text-sm text-[#007B94] underline"
          >
            + Add Another Care Giver
          </button>
        </div>
      )}

      {/* Satisfaction & NH Easy */}
      <div>
        <label className="block mb-1 font-semibold">How often does the participant leave the home?</label>
        <select
          name="leavesHomeFrequency"
          value={form.leavesHomeFrequency}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Please Select --</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Never">Never</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Is participant satisfied with care and services?</label>
        <select
          name="satisfiedWithServices"
          value={form.satisfiedWithServices}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Please Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {form.satisfiedWithServices === 'No' && (
        <div>
          <label className="block mb-1 font-semibold">What does the participant want changed?</label>
          <textarea
            name="satisfactionChangeReason"
            value={form.satisfactionChangeReason}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-semibold">Are services being delivered as approved in NH Easy?</label>
        <div className="flex gap-4 mt-1">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="nhEasyServicesDelivered"
              value="Yes"
              checked={form.nhEasyServicesDelivered === 'Yes'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="nhEasyServicesDelivered"
              value="No"
              checked={form.nhEasyServicesDelivered === 'No'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {form.nhEasyServicesDelivered === 'No' && (
        <div>
          <label className="block mb-1 font-semibold">Identify any service gaps</label>
          <textarea
            name="serviceGapsExplanation"
            value={form.serviceGapsExplanation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
    </section>
  );
}
