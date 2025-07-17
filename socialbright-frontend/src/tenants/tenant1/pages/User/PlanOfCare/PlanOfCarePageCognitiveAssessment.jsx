import React from 'react';

export default function PlanOfCarePageCognitiveAssessment({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiCheckboxChange = (field, option, checked) => {
    const updated = checked
      ? [...form[field], option]
      : form[field].filter((val) => val !== option);
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 my-6 rounded-2xl shadow-md space-y-6 text-sm text-black">
      <h2 className="text-lg font-bold">Cognitive Assessment</h2>

      {/* Mental Status */}
      <div>
        <label className="font-semibold block mb-2">Mental Status</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Alert', 'Orientated', 'Disorientated',
            'Memory Deficit', 'Delusional', 'Unable to Assess'
          ].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.mentalStatus.includes(option)}
                onChange={(e) =>
                  handleMultiCheckboxChange('mentalStatus', option, e.target.checked)
                }
                className="h-4 w-4"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Affect vs Mood Description */}
      <p className="text-sm italic font-semibold">
        Affect refers to immediate expressions of emotion, while mood refers to emotional experience over a more prolonged period.
      </p>

      {/* Affect / Mood */}
      <div>
        <label className="font-semibold block mb-2">Affect / Mood</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Agitated', 'Angry', 'Anxious', 'Appropriate', 'Calm',
            'Depressed', 'Ecstatic', 'Happy', 'Inappropriate', 'Irritable',
            'Labile', 'Stable', 'Unable to Assess'
          ].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.affectMood.includes(option)}
                onChange={(e) =>
                  handleMultiCheckboxChange('affectMood', option, e.target.checked)
                }
                className="h-4 w-4"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Reported Symptoms */}
      <div>
        <label className="font-semibold block mb-2">
          Does the participant or caregiver report any of the following?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Delusions', 'Hallucinations', 'Suicidal Ideations',
            'Sleep Disturbances', 'None of the above'
          ].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.reportedSymptoms.includes(option)}
                onChange={(e) =>
                  handleMultiCheckboxChange('reportedSymptoms', option, e.target.checked)
                }
                className="h-4 w-4"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Decision Making */}
      <div>
        <label className="font-semibold block mb-2">Does the participant make decisions independently?</label>
        <div className="flex gap-6">
          {['Yes', 'No'].map((val) => (
            <label key={val} className="flex items-center gap-2">
              <input
                type="radio"
                name="decisionMaking"
                value={val}
                checked={form.decisionMaking === val}
                onChange={handleChange}
                className="h-4 w-4"
              />
              {val}
            </label>
          ))}
        </div>
        {form.decisionMaking === 'No' && (
          <div className="mt-2">
            <label className="font-semibold block mb-1">
              Name of person assisting the participant:
            </label>
            <input
              type="text"
              name="assistingPerson"
              value={form.assistingPerson}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        )}
      </div>

      {/* Mental Health Treatment */}
      <div>
        <label className="font-semibold block mb-2">
          Does the participant receive treatment or counseling for mental health or emotional problems?
        </label>
        <div className="flex gap-6">
          {['Yes', 'No'].map((val) => (
            <label key={val} className="flex items-center gap-2">
              <input
                type="radio"
                name="mentalHealthTreatment"
                value={val}
                checked={form.mentalHealthTreatment === val}
                onChange={handleChange}
                className="h-4 w-4"
              />
              {val}
            </label>
          ))}
        </div>
        {form.mentalHealthTreatment === 'Yes' && (
          <div className="mt-2">
            <label className="font-semibold block mb-1">
              Name of provider of above counseling:
            </label>
            <input
              type="text"
              name="counselingProvider"
              value={form.counselingProvider}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        )}
      </div>

      {/* Cognitive Notes */}
      <div>
        <label className="font-semibold block mb-1">Cognitive Assessment Notes</label>
        <textarea
          name="cognitiveNotes"
          value={form.cognitiveNotes}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-md p-2"
        />
      </div>
    </section>
  );
}
