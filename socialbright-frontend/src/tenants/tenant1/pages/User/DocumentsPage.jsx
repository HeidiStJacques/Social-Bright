import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const allowedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];

const categoryOptions = [
  '3715 Form', '609 Form', 'Advanced Directives', 'Assessments', 'Birth Certificate',
  'Care Plan', 'DME Quote', 'DPOA', 'Eligibility Letter', 'Guardianship Paperwork',
  'Intake Forms', 'MEA', 'Medicaid Card', 'Medicaid Rede', 'Medication List',
  'Membership Application', 'PCSP Care Plan', 'PERS Event Notification', 'Plan of Care',
  'PT Eval', 'Release of Information', 'Signed HIPAA / Confidentiality Form',
  'Social Security Card', 'Status Change Form', 'Transportation Consent Form', 'Other',
];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function DocumentsPage() {
  const { tenantId, id: clientId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem(`documents-${tenantId}-${clientId}`);
    try {
      if (saved) {
        setDocuments(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to parse saved documents:', err);
      localStorage.removeItem(`documents-${tenantId}-${clientId}`);
    }
  }, [tenantId, clientId]);

  useEffect(() => {
    if (tenantId && clientId) {
      localStorage.setItem(`documents-${tenantId}-${clientId}`, JSON.stringify(documents));
    }
  }, [documents, tenantId, clientId]);

  const handleFileUpload = async (file) => {
    if (!file || !allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload PDF, DOCX, JPG, or PNG.');
      return;
    }
    if (!category) {
      alert('Please select a category before uploading.');
      return;
    }

    const base64 = await toBase64(file);

    const newDoc = {
      id: Date.now(),
      name: file.name,
      category,
      uploadDate: new Date().toLocaleDateString(),
      url: base64,
    };

    setDocuments((prev) => [...prev, newDoc]);
    fileInputRef.current.value = null;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-8 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-10">Client Documents</h1>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-10">
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-1">Select Document Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-[#007B94]"
            >
              <option value="">-- Please Select --</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer border-2 border-dashed border-[#007B94] bg-[#E6F7FA] hover:bg-[#d2eef4] transition text-center p-8 rounded-md"
          >
            <p className="text-sm font-medium text-[#007B94]">
              Drag and drop a file here, or click to browse
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              ref={fileInputRef}
              hidden
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by file name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-[#007B94]"
          />
        </div>

        {/* Document Table */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Uploaded Documents</h2>
          {filteredDocuments.length === 0 ? (
            <p className="text-gray-600 text-sm">No matching documents found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-xs sm:text-sm">
                <thead className="bg-[#007B94] text-white">
                  <tr>
                    <th className="p-2 text-left">File Name</th>
                    <th className="p-2 text-left">Category</th>
                    <th className="p-2 text-left">Upload Date</th>
                    <th className="p-2 text-left">View / Download</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-100">
                      <td className="p-2">{doc.name}</td>
                      <td className="p-2">{doc.category}</td>
                      <td className="p-2">{doc.uploadDate}</td>
                      <td className="p-2">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#007B94] hover:underline"
                        >
                          Open
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
