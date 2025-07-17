import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientDemographics } from '@services/clientService';


const formatCurrency = (value) => {
  if (value === '') return '';
  const number = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  return isNaN(number) ? '' : number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const unformatCurrency = (value) => {
  return value.replace(/[^0-9.-]+/g, '');
};

export default function EligibilityPage() {
  const { tenantId, id: clientId } = useParams();
  const [MEAReviewDate, setMEAReviewDate] = useState('');
  const [financialRedeterminationDate, setFinancialRedeterminationDate] = useState('');
  const [age, setAge] = useState('');
  const [incomes, setIncomes] = useState(['']);
  const [deductions, setDeductions] = useState(['']);
  const [monthlyNet, setMonthlyNet] = useState(null);
  const [isEligible, setIsEligible] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`eligibilityUploads_${tenantId}_${clientId}`);
    if (saved) setUploadedFiles(JSON.parse(saved));
  }, [tenantId, clientId]);

  useEffect(() => {
    if (tenantId && clientId) {
      localStorage.setItem(`eligibilityUploads_${tenantId}_${clientId}`, JSON.stringify(uploadedFiles));
    }
  }, [uploadedFiles, tenantId, clientId]);

  useEffect(() => {
    async function fetchDemographics() {
      try {
        const data = await getClientDemographics(tenantId, clientId);
        setMEAReviewDate(data.MEAReviewDate || '');
        setFinancialRedeterminationDate(data.financialRedeterminationDate || '');
      } catch (err) {
        console.error('Error fetching demographics:', err);
      }
    }
    if (clientId) fetchDemographics();
  }, [tenantId, clientId]);

  const handleIncomeChange = (index, value) => {
    const updated = [...incomes];
    updated[index] = unformatCurrency(value);
    setIncomes(updated);
  };

  const handleDeductionChange = (index, value) => {
    const updated = [...deductions];
    updated[index] = unformatCurrency(value);
    setDeductions(updated);
  };

  const addIncomeField = () => setIncomes([...incomes, '']);
  const addDeductionField = () => setDeductions([...deductions, '']);

  const handleCheckEligibility = () => {
    const totalIncome = incomes.reduce((sum, val) => sum + parseFloat(val || 0), 0);
    const totalDeductions = deductions.reduce((sum, val) => sum + parseFloat(val || 0), 0);
    const net = totalIncome - totalDeductions;
    setMonthlyNet(net);
    setIsEligible(net <= 2901);
  };

  const handleFileChange = (e) => setUploadFile(e.target.files[0]);

  const handleFileUpload = () => {
    if (uploadFile) {
      const previewUrl = URL.createObjectURL(uploadFile);
      const newFile = { name: uploadFile.name, url: previewUrl };
      setUploadedFiles([...uploadedFiles, newFile]);
      setUploadFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 text-black text-sm">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-xl font-semibold mb-8 text-center">
          Eligibility – Client ID: {clientId}
        </h1>

        {/* Review Dates */}
        <section className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3">Eligibility Review Dates</h2>
          <p><strong>MEA Review Date:</strong> {MEAReviewDate || 'Not Available'}</p>
          <p><strong>Financial Redetermination Date:</strong> {financialRedeterminationDate || 'Not Available'}</p>
        </section>

        {/* Eligibility Wizard */}
        <section className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Eligibility Wizard</h2>

          <div className="mb-4">
            <label className="block font-medium mb-1">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Income Sources:</label>
            {incomes.map((val, i) => (
              <input
                key={i}
                type="text"
                value={formatCurrency(val)}
                onChange={(e) => handleIncomeChange(i, e.target.value)}
                placeholder={`Income #${i + 1}`}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
              />
            ))}
            <button onClick={addIncomeField} className="text-[#007B94] underline text-sm">+ Add Income</button>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Deductions:</label>
            {deductions.map((val, i) => (
              <input
                key={i}
                type="text"
                value={formatCurrency(val)}
                onChange={(e) => handleDeductionChange(i, e.target.value)}
                placeholder={`Deduction #${i + 1}`}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
              />
            ))}
            <button onClick={addDeductionField} className="text-[#007B94] underline text-sm">+ Add Deduction</button>
          </div>

          <button
            onClick={handleCheckEligibility}
            className="mt-3 bg-[#007B94] hover:bg-[#00657a] text-white px-6 py-2 rounded-md transition"
          >
            Calculate Eligibility
          </button>

          {monthlyNet !== null && (
            <div className="mt-5 p-4 bg-gray-50 border border-gray-300 rounded-md">
              <p className="font-semibold">
                Net Monthly Income: {formatCurrency(monthlyNet.toString())}<br />
                Status:{' '}
                <span className={isEligible ? 'text-green-600' : 'text-red-600'}>
                  {isEligible ? 'Eligible' : 'Not Eligible'}
                </span>
              </p>
            </div>
          )}
        </section>

        {/* Uploaded Documents List */}
        <section className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3">Uploaded MEA Documents</h2>
          {uploadedFiles.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {uploadedFiles.map((file, i) => (
                <li key={i}>
                  {file.name}{' '}
                  <a href={file.url} target="_blank" rel="noreferrer" className="text-[#007B94] underline">
                    View
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No documents uploaded yet.</p>
          )}
        </section>

        {/* Upload Section */}
        <section className="bg-white rounded-xl shadow-md p-5 mb-10">
          <h2 className="text-lg font-semibold mb-4">Upload MEA Documentation</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input type="file" onChange={handleFileChange} />
            <button
              onClick={handleFileUpload}
              className="bg-[#007B94] hover:bg-[#00657a] text-white px-6 py-2 rounded-md transition"
            >
              Upload File
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
