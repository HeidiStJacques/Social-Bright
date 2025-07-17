import React from 'react';

export default function PlanOfCarePage90Day({ form, setForm }) {
  const {
    programName = 'Home and Community Program',
    caseManagerLabel = 'Care Coordinator',
    eligibilityAgency = 'Eligibility Agency',
    portalName = 'Online Portal',
  } = form.tenantSettings || {};

  const goalsList = [
    `Participant will remain in their current community placement with ${programName} and other supports as authorized to address deficits or functional limitations identified in the care plan.`,
    `Participant will remain in their current ${programName} Residential Care placement with facility supports.`,
    `Participant will remain in their current ${programName} Supported Housing placement with facility supports.`,
    'Participant will return to the community following their current in-patient admission.',
    'Participant will be admitted to a permanent in-patient placement.',
    'Participant will engage in long-term management of functional and social problems and onset of secondary disabilities related to long-term abuse of drugs, alcohol, or other substances.',
    'Participant will engage in long-term management of functional and social problems and onset of secondary disabilities related to aging.',
    'Participant will work toward restoring health and function, preventing secondary complications, and maximizing activities of daily life.',
    'Participant will achieve optimal medical, functional, and social outcomes.',
    `Participant will collaborate with ${caseManagerLabel} to plan, implement, monitor, and amend individualized ${programName} services that promote the participant’s needs, advance participant well-being, and help participant achieve their goals.`,
    `Participant will participate in initial intake with ${caseManagerLabel}.`,
    `Participant should complete financial eligibility process with ${eligibilityAgency}.`,
    `Participant is due for annual Medical Eligibility Assessment (MEA). Participant will participate in MEA as assigned by ${eligibilityAgency}.`,
    'Participant or provider requesting Durable Medical Equipment (DME). Participant will understand coverage options for equipment.',
    `Participant DME (Specialized Medical Equipment) covered by ${programName}. Request uploaded to ${portalName}.`,
    'Participant DME covered by Medicare.',
    'Participant and/or provider requires increase in services.',
    'Participant and/or provider requires decrease in services.',
    'Participant and/or provider requires change of provider.',
    `Participant has lost unpaid caregiver. Participant will participate in development of new care plan and choose ${programName} service providers.`,
    'Participant is experiencing an acute episode, in hospital or skilled nursing facility (SNF), and will return to community residence.',
    'Participant in-patient admission in hospital or SNF and will return to community residence.',
    `Participant discharged from facility. Participant will participate in development of new care plan and choose ${programName} service providers.`,
    'Participant shall have access to prescriptions at point of sale with accurate co-pays.',
    'Participant requesting / requires environmental modification.',
    'Provider requesting change in service authorizations. Participant will understand provider request(s) and participate in changes to care plan and service authorizations.',
    `Participant requests change of ${caseManagerLabel}.`,
    'Other',
  ];

  const handleCheckboxChange = (goal) => {
    const updatedGoals = form.ninetyDay?.goals?.includes(goal)
      ? form.ninetyDay.goals.filter((g) => g !== goal)
      : [...(form.ninetyDay.goals || []), goal];

    setForm((prev) => ({
      ...prev,
      ninetyDay: {
        ...prev.ninetyDay,
        goals: updatedGoals,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      ninetyDay: {
        ...prev.ninetyDay,
        [name]: value,
      },
    }));
  };

  return (
    <section className="space-y-8 text-sm text-black">
      {/* 90 Day Objectives */}
      <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md my-6">
        <h2 className="text-lg font-bold mb-4">90 Day Objectives, Goals, and Interventions</h2>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {goalsList.map((goal, index) => (
            <label key={index} className="block">
              <input
                type="checkbox"
                checked={form.ninetyDay?.goals?.includes(goal) || false}
                onChange={() => handleCheckboxChange(goal)}
                className="mr-2 text-[#007B94] form-checkbox"
              />
              {goal}
            </label>
          ))}
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-2">{caseManagerLabel} Interventions</label>
          <textarea
            name="caseManagerInterventions"
            value={form.ninetyDay?.caseManagerInterventions || ''}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#007B94]"
          />
        </div>
      </section>

      {/* Contact Note Section */}
      <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Contact Note</h2>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Contact Note</label>
          <textarea
            name="contactNote"
            value={form.ninetyDay?.contactNote || ''}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#007B94]"
          />
        </div>

        <h3 className="text-lg font-bold mb-2">{caseManagerLabel} Signature</h3>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            name="caseManagerName"
            type="text"
            value={form.ninetyDay?.caseManagerName || ''}
            onChange={handleChange}
            className="w-full max-w-sm border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#007B94]"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Signature</label>
          <div className="w-full max-w-sm h-24 border-2 border-dashed border-black bg-[#007B94CC] rounded-md flex items-center justify-center text-black">
            Signature will go here
          </div>
        </div>
      </section>
    </section>
  );
}
