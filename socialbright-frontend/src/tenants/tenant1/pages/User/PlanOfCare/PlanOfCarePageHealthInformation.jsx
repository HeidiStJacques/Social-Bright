import React from 'react';

export default function PlanOfCarePageHealthInformation({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-6 text-sm text-black">
      <h2 className="text-lg font-bold">Health Information</h2>

      {/* Medical Conditions */}
      <div>
        <label className="font-semibold block mb-1">
          Noted / Reported / Documented Medical Conditions (by participant, MEA, providers, etc.)
        </label>
        <textarea
          name="medicalConditions"
          value={form.medicalConditions}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="3"
        />
      </div>

      {/* Reviewed Medical Conditions */}
      <div>
        <label className="font-semibold block mb-1">
          Review of the Medical Conditions noted above completed and new medical conditions since previous assessment have been added above.
        </label>
        <div className="flex items-center gap-4 mt-2">
          {['Yes', 'No'].map((val) => (
            <label key={val} className="flex items-center gap-2">
              <input
                type="radio"
                name="reviewedMedicalConditions"
                value={val}
                checked={form.reviewedMedicalConditions === val}
                onChange={handleChange}
              />
              {val}
            </label>
          ))}
        </div>

        {form.reviewedMedicalConditions === 'No' && (
          <div className="mt-4">
            <label className="font-semibold block mb-1">
              Please explain why medical conditions were NOT reviewed and enter plan to review them:
            </label>
            <textarea
              name="explainUnreviewedMedicalConditions"
              value={form.explainUnreviewedMedicalConditions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>
        )}
      </div>

      {/* Participant Description */}
      <div>
        <label className="font-semibold block mb-1">
          Participant's description of medical condition related issues at the time of this assessment:
        </label>
        <textarea
          name="participantMedicalDescription"
          value={form.participantMedicalDescription}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="3"
        />
      </div>

      {/* Allergies */}
      <div>
        <label className="font-semibold block mb-1">Allergies:</label>
        <textarea
          name="allergies"
          value={form.allergies}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="2"
        />
      </div>

      {/* General Health */}
      <div>
        <label className="font-semibold block mb-1">General Health</label>
        <select
          name="generalHealth"
          value={form.generalHealth}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">--Please Select--</option>
          <option>Acute Episode</option>
          <option>Declining</option>
          <option>Frail</option>
          <option>Improving</option>
          <option>New Diagnosis</option>
          <option>Poor</option>
          <option>Stable</option>
          <option>Terminal</option>
        </select>
      </div>

      {/* Self Care Ability */}
      <div>
        <label className="font-semibold block mb-1">Self Care Ability</label>
        <select
          name="selfCareAbility"
          value={form.selfCareAbility}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">--Please Select--</option>
          <option>A/IADL Assist</option>
          <option>ADL Assist</option>
          <option>Declining</option>
          <option>IADL Assist</option>
          <option>Improving</option>
          <option>Independent</option>
          <option>Limited</option>
          <option>Total Assist</option>
        </select>
      </div>

      {/* Receiving Therapy */}
      <div>
        <label className="font-semibold block mb-1">Is participant receiving therapy?</label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="receivingTherapy"
              checked={form.receivingTherapy === true}
              onChange={() => setForm((prev) => ({ ...prev, receivingTherapy: true }))}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="receivingTherapy"
              checked={form.receivingTherapy === false}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  receivingTherapy: false,
                  therapyTypes: [],
                }))
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Therapy Types */}
      {form.receivingTherapy && (
        <div>
          <label className="font-semibold block mb-1">Identify type(s) of therapy:</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {['Speech', 'Physical', 'Occupational', 'Respiratory'].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.therapyTypes.includes(type)}
                  onChange={() =>
                    setForm((prev) => {
                      const current = prev.therapyTypes || [];
                      return {
                        ...prev,
                        therapyTypes: current.includes(type)
                          ? current.filter((t) => t !== type)
                          : [...current, type],
                      };
                    })
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Institutionalized */}
      <div>
        <label className="font-semibold block mb-1">Has participant been institutionalized in the last 30 days?</label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="institutionalized"
              checked={form.institutionalized === true}
              onChange={() => setForm((prev) => ({ ...prev, institutionalized: true }))}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="institutionalized"
              checked={form.institutionalized === false}
              onChange={() =>
                setForm((prev) => ({
                  ...prev,
                  institutionalized: false,
                  institutionalizedExplanation: '',
                }))
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Institutional Explanation */}
      {form.institutionalized && (
        <div>
          <label className="font-semibold block mb-1">Explanation of institutionalization:</label>
          <textarea
            name="institutionalizedExplanation"
            value={form.institutionalizedExplanation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
          />
        </div>
      )}

      {/* Hospital of Choice */}
      <div>
        <label className="font-semibold block mb-1">Participant's Hospital of Choice</label>
        <input
          type="text"
          name="hospitalOfChoice"
          value={form.hospitalOfChoice}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </section>
  );
}
