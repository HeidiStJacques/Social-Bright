import React from 'react';

export default function PlanOfCarePageFinancial({ form, setForm }) {
  const {
    programName = 'Home and Community Program',
  } = form.tenantSettings || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIncomeChange = (index, field, value) => {
    const updated = [...form.income];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, income: updated }));
  };

  const addIncome = () => {
    setForm((prev) => ({
      ...prev,
      income: [...prev.income, { source: '', amount: '' }],
    }));
  };

  const handleDeductionChange = (index, value) => {
    const updated = [...form.deductions];
    updated[index] = value;
    setForm((prev) => ({ ...prev, deductions: updated }));
  };

  const addDeduction = () => {
    setForm((prev) => ({ ...prev, deductions: [...prev.deductions, ''] }));
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md space-y-6 text-sm text-black">
      <h2 className="text-lg font-bold">Financial Section</h2>

      {/* Income Fields */}
      {form.income.map((entry, index) => (
        <div key={index} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Income Source (e.g., SSI, SSDI, Retirement)</label>
            <input
              type="text"
              value={entry.source}
              onChange={(e) => handleIncomeChange(index, 'source', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Monthly Amount</label>
            <input
              type="number"
              value={entry.amount}
              onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addIncome}
        className="text-sm text-[#007B94] underline"
      >
        + Add Income
      </button>

      {/* Deductions */}
      {form.deductions.map((deduct, index) => (
        <div key={index}>
          <label className="block mb-1 font-semibold">Deduction</label>
          <input
            type="number"
            value={deduct}
            onChange={(e) => handleDeductionChange(index, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addDeduction}
        className="text-sm text-[#007B94] underline"
      >
        + Add Deduction
      </button>

      {/* Total Monthly Income */}
      <div>
        <label className="block mb-1 font-semibold">Total Monthly Income</label>
        <input
          type="text"
          readOnly
          value={`$${Number(form.totalMonthlyIncome || 0).toFixed(2)}`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#007B94CC] text-white font-semibold"
        />
      </div>

      {/* Financial Assistance */}
      <div>
        <label className="block mb-1 font-semibold">Financial Assistance</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="space-y-4">
            {/* Food Stamps */}
            <div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.financialAssistance.hasFoodStamps}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        hasFoodStamps: e.target.checked,
                        foodStampsAmount: '',
                      },
                    }))
                  }
                />
                Food Stamps
              </label>
              {form.financialAssistance.hasFoodStamps && (
                <input
                  type="number"
                  placeholder="Amount"
                  value={form.financialAssistance.foodStampsAmount}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        foodStampsAmount: e.target.value,
                      },
                    }))
                  }
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            </div>

            {/* Fuel Assistance */}
            <div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.financialAssistance.hasFuelAssistance}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        hasFuelAssistance: e.target.checked,
                        fuelAssistanceAmount: '',
                      },
                    }))
                  }
                />
                Fuel Assistance
              </label>
              {form.financialAssistance.hasFuelAssistance && (
                <input
                  type="number"
                  placeholder="Amount"
                  value={form.financialAssistance.fuelAssistanceAmount}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        fuelAssistanceAmount: e.target.value,
                      },
                    }))
                  }
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            </div>

            {/* Grant */}
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.financialAssistance.hasGrant}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    financialAssistance: {
                      ...prev.financialAssistance,
                      hasGrant: e.target.checked,
                    },
                  }))
                }
              />
              Grant
            </label>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {/* Commodity Food */}
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.financialAssistance.hasCommodityFood}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    financialAssistance: {
                      ...prev.financialAssistance,
                      hasCommodityFood: e.target.checked,
                    },
                  }))
                }
              />
              Commodity Food
            </label>

            {/* Housing Assistance */}
            <div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.financialAssistance.hasHousingAssistance}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        hasHousingAssistance: e.target.checked,
                        housingAssistanceAmount: '',
                      },
                    }))
                  }
                />
                Housing Assistance
              </label>
              {form.financialAssistance.hasHousingAssistance && (
                <input
                  type="number"
                  placeholder="Amount"
                  value={form.financialAssistance.housingAssistanceAmount}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        housingAssistanceAmount: e.target.value,
                      },
                    }))
                  }
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            </div>

            {/* Other */}
            <div className="space-y-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.financialAssistance.hasOther}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      financialAssistance: {
                        ...prev.financialAssistance,
                        hasOther: e.target.checked,
                        otherAmount: '',
                        otherValue: '',
                      },
                    }))
                  }
                />
                Other
              </label>
              {form.financialAssistance.hasOther && (
                <>
                  <input
                    type="text"
                    placeholder="Other Amount"
                    value={form.financialAssistance.otherAmount}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        financialAssistance: {
                          ...prev.financialAssistance,
                          otherAmount: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Other Description"
                    value={form.financialAssistance.otherValue}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        financialAssistance: {
                          ...prev.financialAssistance,
                          otherValue: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

{/* Resources Under $2,500 */}
      <div>
        <label className="block mb-1 font-semibold">Are participant's resources below $2,500?</label>
        <select
          name="resourcesBelow2500"
          value={form.resourcesBelow2500}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Financial Comments */}
      <div>
        <label className="block mb-1 font-semibold">Comments</label>
        <textarea
          name="financialComments"
          value={form.financialComments}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Financial Guidelines */}
      <div>
        <label className="block mb-1 font-semibold">
          Does participant meet {programName} financial guidelines?
        </label>
        <input
          type="text"
          value={form.meetsHcbc}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#007B94cc] text-white font-semibold"
        />
      </div>

      {/* Financial Redetermination Date */}
      <div>
        <label className="block mb-1 font-semibold">Financial Redetermination Date</label>
        <input
          type="date"
          name="financialRedeterminationDate"
          value={form.financialRedeterminationDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </section>
  );
}
