import React from 'react';

export default function PlanOfCarePageADL({ form, setForm, adlScore }) {
  const updateADLField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      adl: {
        ...prev.adl,
        [field]: value,
      },
    }));
  };

  return (
    <section className="bg-white text-sm text-black p-4 sm:p-6 my-6 rounded-2xl shadow-md space-y-6">
      <h2 className="text-lg font-bold">ADL Score & HCBS Eligibility</h2>

      {/* ADL Score */}
      <div>
        <label className="font-semibold block mb-1">ADL Score</label>
        <input
          type="text"
          readOnly
          value={adlScore}
          className="w-24 border rounded-md p-2 bg-[#007B94cc]"
        />
      </div>

      {/* Skilled Nursing */}
      <div>
        <label className="font-semibold block mb-1">
          Does participant receive Skilled Nursing services?
        </label>
        <select
          className="w-full border rounded-md p-2"
          value={form.adl.skilledNursing}
          onChange={(e) => updateADLField('skilledNursing', e.target.value)}
        >
          <option value="">--Please Select--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* HCBS Eligibility */}
      <div>
        <label className="font-semibold block mb-1">
          Does participant meet HCBC-CFI level of care?
        </label>
        <input
          type="text"
          readOnly
          value={form.adl.hcbsEligibility}
          className="w-full border rounded-md p-2 bg-[#007B94cc]"
        />
      </div>

      {/* Redetermination Date */}
      <div>
        <label className="font-semibold block mb-1">HCBC-CFI Redetermination Date</label>
        <input
          type="date"
          value={form.adl.redeterminationDate}
          onChange={(e) => updateADLField('redeterminationDate', e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Two-Person Assist */}
      <div>
        <label className="font-semibold block mb-1">
          Do any ADLs require a two-person assist?
        </label>
        <select
          className="w-full border rounded-md p-2"
          value={form.adl.twoPersonAssist}
          onChange={(e) => updateADLField('twoPersonAssist', e.target.value)}
        >
          <option value="">--Please Select--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </section>
  );
}
