import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { useTenant } from '@context/TenantContext';


import {
  getClientDemographics,
  getEligibilityInfo,
  getPlanOfCareProgress,
  getCaseNotesSummary,
  getProviders,
  getDocumentsAlerts
} from '@services/clientService';


export default function ClientOverviewPage() {
  const { id: clientId } = useParams();
  const { tenantId } = useTenant(); // <-- Access tenantId from context

  const [openSection, setOpenSection] = useState('Demographics');

  const [demographics, setDemographics] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [guardians, setGuardians] = useState([]);
  const [providers, setProviders] = useState([]);
  const [docsAlerts, setDocsAlerts] = useState(null);

  const [loadingDemographics, setLoadingDemographics] = useState(true);
  const [loadingEligibility, setLoadingEligibility] = useState(true);
  const [loadingGuardians, setLoadingGuardians] = useState(true);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [loadingDocsAlerts, setLoadingDocsAlerts] = useState(true);

  const toggleSection = (title) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          demoData,
          eligData,
          guardData,
          providersData,
          docsAlertsData
        ] = await Promise.all([
          getClientDemographics(clientId, tenantId),
          getEligibility(clientId, tenantId),
          getGuardians(clientId, tenantId),
          getProviders(clientId, tenantId),
          getDocumentsAlerts(clientId, tenantId)
        ]);
        setDemographics(demoData);
        setEligibility(eligData);
        setGuardians(guardData);
        setProviders(providersData);
        setDocsAlerts(docsAlertsData);
      } catch (error) {
        console.error('Error loading client data:', error);
      } finally {
        setLoadingDemographics(false);
        setLoadingEligibility(false);
        setLoadingGuardians(false);
        setLoadingProviders(false);
        setLoadingDocsAlerts(false);
      }
    };
    if (tenantId) fetchData();
  }, [clientId, tenantId]);

  const sections = [
    {
      title: 'Demographics',
      content: loadingDemographics ? (
        <p>Loading...</p>
      ) : demographics ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <p><strong>Name:</strong> {demographics.first_name} {demographics.last_name}</p>
          <p><strong>Date of Birth:</strong> {demographics.dob}</p>
          <p><strong>Phone:</strong> {demographics.primary_phone}</p>
          <p><strong>Address:</strong> {demographics.address}, {demographics.city}, {demographics.state} {demographics.zip}</p>
          <p><strong>Language:</strong> {demographics.language}</p>
          <p><strong>Gender:</strong> {demographics.gender}</p>
        </div>
      ) : (
        <p>No demographics data found.</p>
      ),
    },
    {
      title: 'Guardians',
      content: loadingGuardians ? (
        <p>Loading...</p>
      ) : guardians.length > 0 ? (
        <div className="space-y-3 text-sm">
          {guardians.map((g, idx) => (
            <div key={idx} className="border border-gray-200 p-3 rounded-md bg-gray-50">
              <p><strong>Name:</strong> {g.first_name} {g.last_name}</p>
              <p><strong>Relationship:</strong> {g.relationship}</p>
              <p><strong>Phone:</strong> {g.phone}</p>
              <p><strong>Email:</strong> {g.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No guardian records found.</p>
      ),
    },
    {
      title: 'Eligibility',
      content: loadingEligibility ? (
        <p>Loading...</p>
      ) : eligibility ? (
        <div className="text-sm space-y-1">
          <p><strong>Eligible:</strong> {eligibility.eligible ? 'Yes' : 'No'}</p>
          <p><strong>Monthly Income:</strong> ${eligibility.monthly_income}</p>
          <p><strong>Deductions:</strong> ${eligibility.deductions}</p>
          <p><strong>Financial Redetermination Date:</strong> {eligibility.redetermination_date}</p>
          <p><strong>MEA Review Date:</strong> {eligibility.mea_review_date}</p>
        </div>
      ) : (
        <p>No eligibility data found.</p>
      ),
    },
    {
      title: 'Providers',
      content: loadingProviders ? (
        <p>Loading...</p>
      ) : providers.length > 0 ? (
        <ul className="list-disc list-inside text-sm space-y-1">
          {providers.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.service || p.type}
            </li>
          ))}
        </ul>
      ) : (
        <p>No providers found.</p>
      ),
    },
    {
      title: 'Missing Documents / Alerts',
      content: loadingDocsAlerts ? (
        <p>Loading...</p>
      ) : docsAlerts ? (
        <>
          {docsAlerts.missingDocuments?.length > 0 ? (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Missing Documents:</h3>
              <ul className="list-disc list-inside text-sm">
                {docsAlerts.missingDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No missing documents.</p>
          )}

          {docsAlerts.alerts?.length > 0 ? (
            <div>
              <h3 className="font-semibold mb-2">Alerts:</h3>
              <ul className="list-disc list-inside text-sm text-red-600">
                {docsAlerts.alerts.map((alert, idx) => (
                  <li key={idx}>
                    <strong>{alert.type}:</strong> {alert.message} ({alert.date})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No active alerts.</p>
          )}
        </>
      ) : (
        <p>No documents or alerts data found.</p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 text-black">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-lg font-semibold mb-6">Client Overview</h1>

        {sections.map(({ title, content }) => {
          const isOpen = openSection === title;

          return (
            <section
              key={title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4"
            >
              <button
                onClick={() => toggleSection(title)}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3 text-left"
              >
                <h2 className="text-base font-medium">{title}</h2>
                {isOpen ? (
                  <ChevronDown size={18} className="text-[#007B94]" />
                ) : (
                  <ChevronRight size={18} className="text-[#007B94]" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 text-sm text-gray-800">
                  {content}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
