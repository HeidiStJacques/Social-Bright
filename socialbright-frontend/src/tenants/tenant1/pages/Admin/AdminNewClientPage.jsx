import React, { useState, useEffect } from 'react';
import { useTenant } from '@context/TenantContext';
import AdminNavbar from '@shared/components/admin/AdminNavbar';

export default function AdminNewClientPage() {
  const { tenantId } = useTenant();
  const [form, setForm] = useState({
    enrollmentDate: '',
    staffAssigned: '',
    enrollmentNotes: '',
    notifyStaff: false,

    firstName: '',
    lastName: '',
    preferredName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    age: '',

    ecFirstName: '',
    ecLastName: '',
    ecRelationship: '',
    ecPhone: '',
    ecAddress: '',

    meaReviewDate: '',
    redeterminationDate: '',

    comments: ''
  });

  useEffect(() => {
    if (form.dob) {
      const dob = new Date(form.dob);
      const ageDifMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDifMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setForm((prev) => ({ ...prev, age: calculatedAge }));
    }
  }, [form.dob]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic will go here later
    console.log('Submitted:', form, 'Tenant ID:', tenantId);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-black mb-6">New Client</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section: Enrollment */}
            <section>
              <h3 className="text-medium font-semibold text-black border-b border-[#007B94] pb-2 mb-4">Enrollment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" name="enrollmentDate" value={form.enrollmentDate} onChange={handleChange} placeholder="Start Date" className="input" />
                <input type="text" name="staffAssigned" value={form.staffAssigned} onChange={handleChange} placeholder="Staff Assigned" className="input" />
                <textarea name="enrollmentNotes" value={form.enrollmentNotes} onChange={handleChange} placeholder="Enrollment Notes" className="input col-span-1 md:col-span-2" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="notifyStaff" checked={form.notifyStaff} onChange={handleChange} />
                  <span className="text-sm text-black">Send staff email notification?</span>
                </label>
              </div>
            </section>

            {/* Section: Demographics */}
            <section>
              <h3 className="text-medium font-semibold text-black border-b border-[#007B94] pb-2 mb-4">Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input" />
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="input" />
                <input type="text" name="preferredName" value={form.preferredName} onChange={handleChange} placeholder="Preferred Name" className="input" />
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
                <input type="date" name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" className="input" />
                <input type="text" value={form.age || ''} readOnly placeholder="Age" className="input bg-[#007B94cc] cursor-not-allowed" />
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className="input col-span-1 md:col-span-2" />
                <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" />
                  <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP Code" className="input" />
                </div>
              </div>
            </section>

            {/* Section: Emergency Contact */}
            <section>
              <h3 className="text-medium font-semibold text-black border-b border-[#007B94] pb-2 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="ecFirstName" value={form.ecFirstName} onChange={handleChange} placeholder="First Name" className="input" />
                <input type="text" name="ecLastName" value={form.ecLastName} onChange={handleChange} placeholder="Last Name" className="input" />
                <input type="text" name="ecRelationship" value={form.ecRelationship} onChange={handleChange} placeholder="Relationship" className="input" />
                <input type="tel" name="ecPhone" value={form.ecPhone} onChange={handleChange} placeholder="Phone Number" className="input" />
                <input type="text" name="ecAddress" value={form.ecAddress} onChange={handleChange} placeholder="Address" className="input col-span-1 md:col-span-2" />
              </div>
            </section>

            {/* Section: Eligibility */}
            <section>
              <h3 className="text-medium font-semibold text-black border-b border-[#007B94] pb-2 mb-4">Eligibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" name="meaReviewDate" value={form.meaReviewDate} onChange={handleChange} placeholder="MEA Review Date" className="input" />
                <input type="date" name="redeterminationDate" value={form.redeterminationDate} onChange={handleChange} placeholder="Financial Redetermination Date" className="input" />
              </div>
            </section>

            {/* Section: Comments */}
            <section>
              <h3 className="text-medium font-semibold text-black border-b border-[#007B94] pb-2 mb-4">Comments</h3>
              <textarea name="comments" value={form.comments} onChange={handleChange} placeholder="Additional Comments" className="input w-full" />
            </section>

            <div className="pt-4">
              <button type="submit" className="bg-[#007B94] text-white px-4 py-2 rounded hover:bg-[#006377] transition">
                Save Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
