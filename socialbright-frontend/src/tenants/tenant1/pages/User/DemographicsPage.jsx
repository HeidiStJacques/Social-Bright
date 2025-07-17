import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getClientDemographics, updateClient } from '@services/clientService';


export default function DemographicsPage() {
  const { tenantId, id: clientId } = useParams(); // updated for multi-tenancy

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', preferredName: '',
    dob: '', age: '', gender: '', language: '', interpreterNeeded: '',
    race: '', maritalStatus: '', height: '', weight: '',
    medicaidId: '', medicareId: '', mcoId: '', ssn: '',
    mco: '', planAStart: '', planBStart: '', planDStart: '',
    meaReviewDate: '', financialRedeterminationDate: '',
    primaryPhone: '', secondaryPhone: '', email: '', preferredContactMethod: '',
    street: '', city: '', state: '', zip: '', livingArrangement: '',
    emergencyFirstName: '', emergencyLastName: '', emergencyRelationship: '',
    emergencyStreet: '', emergencyCity: '', emergencyState: '', emergencyZip: '', emergencyPhone: '',
    legalGuardian: '', guardianName: '', powerOfAttorney: '', conservatorInfo: '',
    pcpName: '', pcpPhone: '', pcpPractice: '', pcpFax: '',
    notes: ''
  });

  useEffect(() => {
    const loadClient = async () => {
      try {
        const client = await getClientDemographics(tenantId, clientId); // multitenant-aware
        if (client) {
          const calculatedAge = client.dob ? calculateAge(client.dob) : '';
          setFormData({ ...client, age: calculatedAge });
        }
      } catch (err) {
        console.error('Error loading client:', err);
      }
    };
    loadClient();
  }, [tenantId, clientId]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'dob' ? { age: calculateAge(value) } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient(tenantId, clientId, formData); // multitenant-aware
      alert('Demographics updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update client data.');
    }
  };

  const renderField = (name, label, type = 'text', readOnly = false) => (
    <div className="flex flex-col">
      <label className="mb-1 text-xs font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
        readOnly={readOnly}
        className="text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#007B94]"
      />
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-3 sm:px-6 lg:px-12 text-black text-sm">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-8">
          Demographics – Client ID: {clientId}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderField('firstName', 'First Name')}
              {renderField('lastName', 'Last Name')}
              {renderField('preferredName', 'Preferred Name')}
              {renderField('dob', 'Date of Birth', 'date')}
              {renderField('age', 'Age', 'text', true)}
              {renderField('gender', 'Gender')}
              {renderField('race', 'Race/Ethnicity')}
              {renderField('maritalStatus', 'Marital Status')}
              {renderField('language', 'Language(s) Spoken')}
              {renderField('interpreterNeeded', 'Interpreter Needed')}
              {renderField('height', 'Height')}
              {renderField('weight', 'Weight')}
            </div>
          </Section>

          <Section title="Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderField('primaryPhone', 'Primary Phone')}
              {renderField('secondaryPhone', 'Secondary Phone')}
              {renderField('email', 'Email')}
              {renderField('preferredContactMethod', 'Preferred Contact Method')}
              {renderField('street', 'Street')}
              {renderField('city', 'City')}
              {renderField('state', 'State')}
              {renderField('zip', 'ZIP')}
              {renderField('livingArrangement', 'Living Arrangement')}
            </div>
          </Section>

          <Section title="Insurance Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderField('medicaidId', 'Medicaid ID')}
              {renderField('medicareId', 'Medicare ID')}
              {renderField('mcoId', 'MCO ID')}
              {renderField('ssn', 'Social Security Number')}
              {renderField('mco', 'Managed Care Organization')}
              {renderField('planAStart', 'Plan A Start Date', 'date')}
              {renderField('planBStart', 'Plan B Start Date', 'date')}
              {renderField('planDStart', 'Plan D Start Date', 'date')}
              {renderField('meaReviewDate', 'MEA Review Date', 'date')}
              {renderField('financialRedeterminationDate', 'Financial Redetermination Date', 'date')}
            </div>
          </Section>

          <Section title="Emergency Contact">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderField('emergencyFirstName', 'First Name')}
              {renderField('emergencyLastName', 'Last Name')}
              {renderField('emergencyRelationship', 'Relationship')}
              {renderField('emergencyPhone', 'Phone')}
              {renderField('emergencyStreet', 'Street')}
              {renderField('emergencyCity', 'City')}
              {renderField('emergencyState', 'State')}
              {renderField('emergencyZip', 'ZIP')}
            </div>
          </Section>

          <Section title="Legal / Guardian Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderField('legalGuardian', 'Legal Guardian')}
              {renderField('guardianName', 'Guardian Name')}
              {renderField('powerOfAttorney', 'Power of Attorney')}
              {renderField('conservatorInfo', 'Conservator Info')}
            </div>
          </Section>

          <Section title="Primary Care Physician">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderField('pcpName', 'PCP Name')}
              {renderField('pcpPhone', 'PCP Phone')}
              {renderField('pcpPractice', 'PCP Practice')}
              {renderField('pcpFax', 'PCP Fax')}
            </div>
          </Section>

          <Section title="Notes / Comments">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#007B94] text-sm"
            />
          </Section>

          <div className="text-center sticky bottom-0 bg-gray-100 py-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#007B94] hover:bg-[#00657a] text-white font-semibold rounded shadow-sm transition"
            >
              Save Demographics
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
