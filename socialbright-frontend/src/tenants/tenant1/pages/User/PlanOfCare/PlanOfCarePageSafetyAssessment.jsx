import React from 'react';

export default function PlanOfCarePageSafetyAssessment({ form, setForm }) {
  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCheckboxInArray = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 my-6 rounded-2xl shadow-md space-y-6 text-sm text-black">
      <h2 className="text-lg font-bold">Participant Safety Assessment</h2>

      {/* Safety Risks */}
      <div>
        <p className="font-semibold mb-1">Participant reports the following regarding their safety:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "At risk for abuse",
            "At risk for exploitation",
            "At risk for injury",
            "At risk for neglect",
            "Balance problems",
            "Frequent Falls",
            "Hearing deficit",
            "Impaired judgement",
            "Visual deficit",
            "None of the above",
          ].map((risk) => (
            <label key={risk} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={form.safetyRisks.includes(risk)}
                onChange={() => toggleCheckboxInArray("safetyRisks", risk)}
              />
              {risk}
            </label>
          ))}
        </div>
      </div>

      {/* APS Referral */}
      <div>
        <p className="font-semibold">Is an APS referral needed or active?</p>
        <div className="flex flex-wrap gap-6 mt-1">
          {["Yes", "No", "Active"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="apsReferralStatus"
                className="h-4 w-4"
                checked={form.apsReferralStatus === option}
                onChange={() => updateField("apsReferralStatus", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Environmental Hazards */}
      <div>
        <p className="font-semibold">
          Does participant have environmental, structural, sanitation and/or safety hazards in the living area?
        </p>
        <div className="flex flex-wrap gap-6 mt-1">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="hasEnvironmentalHazards"
                className="h-4 w-4"
                checked={form.hasEnvironmentalHazards === option}
                onChange={() => updateField("hasEnvironmentalHazards", option)}
              />
              {option}
            </label>
          ))}
        </div>
        {form.hasEnvironmentalHazards === "Yes" && (
          <div className="mt-2">
            <label className="font-semibold block mb-1">
              Please explain environmental, structural, sanitation, and/or safety hazards:
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              value={form.environmentalHazardExplanation}
              onChange={(e) => updateField("environmentalHazardExplanation", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Abuse / Neglect Indicators */}
      <div>
        <p className="font-semibold">Are there any indicators of abuse and/or neglect?</p>
        <div className="flex flex-wrap gap-6 mt-1">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="abuseNeglectIndicators"
                className="h-4 w-4"
                checked={form.abuseNeglectIndicators === option}
                onChange={() => updateField("abuseNeglectIndicators", option)}
              />
              {option}
            </label>
          ))}
        </div>
        {form.abuseNeglectIndicators === "Yes" && (
          <div className="mt-2">
            <label className="font-semibold block mb-1">
              If indicators of abuse and/or neglect, please explain:
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              value={form.abuseNeglectExplanation}
              onChange={(e) => updateField("abuseNeglectExplanation", e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Comments */}
      <div>
        <label className="font-semibold block mb-1">Comments</label>
        <textarea
          className="w-full border rounded-md p-2"
          value={form.safetyComments}
          onChange={(e) => updateField("safetyComments", e.target.value)}
        />
      </div>

      {/* Contingent Services */}
      <div>
        <p className="font-semibold">
          Does the participant have someone available to provide contingent services in case of a global emergency?
        </p>
        <div className="flex flex-wrap gap-6 mt-1">
          {["Yes", "No"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="hasContingentServices"
                className="h-4 w-4"
                checked={form.hasContingentServices === option}
                onChange={() => updateField("hasContingentServices", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Contingent Plan Explanation */}
      <div>
        <label className="font-semibold block mb-1">
          Please explain contingent service plan / lack of availability thereof:
        </label>
        <textarea
          className="w-full border rounded-md p-2"
          value={form.contingentServicePlan}
          onChange={(e) => updateField("contingentServicePlan", e.target.value)}
        />
      </div>

      {/* Evacuation Needs */}
      <div>
        <label className="font-semibold block mb-1">Evacuation Needs</label>
        <select
          className="w-full border rounded-md p-2"
          value={form.evacuationNeed}
          onChange={(e) => updateField("evacuationNeed", e.target.value)}
        >
          <option value="">--Please Select--</option>
          <option value="Independent">Independent</option>
          <option value="Partial Assist">Partial Assist</option>
          <option value="Full Assist">Full Assist</option>
        </select>
      </div>

      {/* Evacuation Comments */}
      <div>
        <label className="font-semibold block mb-1">Evacuation needs comments:</label>
        <textarea
          className="w-full border rounded-md p-2"
          value={form.evacuationComments}
          onChange={(e) => updateField("evacuationComments", e.target.value)}
        />
      </div>
    </section>
  );
}
