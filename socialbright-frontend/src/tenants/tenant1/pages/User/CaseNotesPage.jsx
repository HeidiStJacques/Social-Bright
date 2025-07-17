import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCaseNotes, createCaseNote } from '@services/caseNotesService';
import { useTenant } from '@context/TenantContext';



const staffList = ['John Doe', 'Jane Smith', 'Carlos Gonzalez', 'Emily Tran'];

const CaseNotesPage = () => {
  const { id: clientId } = useParams();
  const { tenantId } = useTenant(); // ✅ Use tenant
  const [caseNotes, setCaseNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterContactName, setFilterContactName] = useState('');
  const [filterMedical, setFilterMedical] = useState('');

  const [dateOfContact, setDateOfContact] = useState('');
  const [assignedStaff, setAssignedStaff] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const [sendToAnother, setSendToAnother] = useState(false);
  const [additionalStaff, setAdditionalStaff] = useState('');
  const [typeOfContact, setTypeOfContact] = useState('');
  const [is30DayCall, setIs30DayCall] = useState(false);
  const [participantChecked, setParticipantChecked] = useState(null);
  const [collateralChecked, setCollateralChecked] = useState(null);
  const [collateralComment, setCollateralComment] = useState('');
  const [contactName, setContactName] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [additionalInterventions, setAdditionalInterventions] = useState('');
  const [caseNoteDetail, setCaseNoteDetail] = useState('');
  const [caseManagerName, setCaseManagerName] = useState('');
  const [signature, setSignature] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      try {
        const notes = await fetchCaseNotes(clientId, tenantId); // ✅ pass tenantId
        setCaseNotes(Array.isArray(notes) ? notes : []);
      } catch (error) {
        console.error('Error fetching case notes:', error);
      } finally {
        setLoading(false);
      }
    };
    if (tenantId) loadNotes();
  }, [clientId, tenantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = {
      dateOfContact,
      assignedStaff,
      sendNotification,
      sendToAnother,
      additionalStaff,
      typeOfContact,
      is30DayCall,
      participantChecked,
      collateralChecked,
      collateralComment,
      contactName,
      medicalConditions,
      additionalInterventions,
      caseNoteDetail,
      caseManagerName,
      signature,
    };
    try {
      await createCaseNote(clientId, note, tenantId); // ✅ pass tenantId
      const updatedNotes = await fetchCaseNotes(clientId, tenantId); // ✅ refresh with tenant
      setCaseNotes(Array.isArray(updatedNotes) ? updatedNotes : []);
      // Reset form
      setDateOfContact('');
      setAssignedStaff('');
      setSendNotification(false);
      setSendToAnother(false);
      setAdditionalStaff('');
      setTypeOfContact('');
      setIs30DayCall(false);
      setParticipantChecked(null);
      setCollateralChecked(null);
      setCollateralComment('');
      setContactName('');
      setMedicalConditions('');
      setAdditionalInterventions('');
      setCaseNoteDetail('');
      setCaseManagerName('');
      setSignature('');
      if (sendNotification && assignedStaff) alert(`Email would be sent to ${assignedStaff}`);
      if (sendToAnother && additionalStaff) alert(`Email would also be sent to ${additionalStaff}`);
    } catch (error) {
      alert('Failed to save note.');
      console.error(error);
    }
  };

  const filteredNotes = caseNotes.filter((note) => {
    const matchesSearch = note.caseNoteDetail?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? note.typeOfContact === filterType : true;
    const matchesContactName = filterContactName ? note.contactName?.toLowerCase().includes(filterContactName.toLowerCase()) : true;
    const matchesMedical = filterMedical ? note.medicalConditions === filterMedical : true;
    return matchesSearch && matchesType && matchesContactName && matchesMedical;
  });

  return (
    <div className="pb-20 bg-gray-100 text-black text-sm px-4 sm:px-6 lg:px-8">
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md max-w-5xl mx-auto mt-12">
        <h1 className="text-xl font-bold mb-4">Case Notes</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date of Contact</label>
            <input type="date" className="w-full border rounded p-2" value={dateOfContact} onChange={(e) => setDateOfContact(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Staff Assigned</label>
            <select className="w-full border rounded p-2" value={assignedStaff} onChange={(e) => setAssignedStaff(e.target.value)}>
              <option value="">-- Select Staff --</option>
              {staffList.map((staff) => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-medium">Send staff email notification?</label>
            <input type="checkbox" checked={sendNotification} onChange={() => setSendNotification(!sendNotification)} />
          </div>
          <div className="flex items-center gap-3">
            <label className="font-medium">Would you like to send this to another staff member?</label>
            <input type="checkbox" checked={sendToAnother} onChange={() => setSendToAnother(!sendToAnother)} />
          </div>
          {sendToAnother && (
            <div>
              <label className="block font-medium mb-1">Additional Staff Member</label>
              <select className="w-full border rounded p-2" value={additionalStaff} onChange={(e) => setAdditionalStaff(e.target.value)}>
                <option value="">-- Select Staff --</option>
                {staffList.map((staff) => (
                  <option key={staff} value={staff}>{staff}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">Type of Contact</label>
            <select className="w-full border rounded p-2" value={typeOfContact} onChange={(e) => { setTypeOfContact(e.target.value); setIs30DayCall(false); }}>
              <option value="">-- Please Select --</option>
              <option>Face to Face</option>
              <option>Telephone Call</option>
              <option>Email</option>
              <option>Text</option>
              <option>Internal</option>
            </select>
          </div>
          {typeOfContact === 'Telephone Call' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="font-medium">30 Day Phone Call?</label>
                <input type="checkbox" checked={is30DayCall} onChange={() => setIs30DayCall(!is30DayCall)} />
              </div>
              {is30DayCall && (
                <>
                  <div className="flex items-center gap-4">
                    <label className="font-medium">Participant?</label>
                    <label><input type="checkbox" checked={participantChecked === true} onChange={() => setParticipantChecked(true)} /> Yes</label>
                    <label><input type="checkbox" checked={participantChecked === false} onChange={() => setParticipantChecked(false)} /> No</label>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="font-medium">Collateral Contact?</label>
                    <label><input type="checkbox" checked={collateralChecked === true} onChange={() => setCollateralChecked(true)} /> Yes</label>
                    <label><input type="checkbox" checked={collateralChecked === false} onChange={() => setCollateralChecked(false)} /> No</label>
                  </div>
                  {collateralChecked === true && (
                    <div>
                      <label className="block font-medium mb-1">Collateral Contact Comment</label>
                      <textarea className="w-full border rounded p-2" value={collateralComment} onChange={(e) => setCollateralComment(e.target.value)} />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">Contact Name</label>
            <input type="text" className="w-full border rounded p-2" value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">New / Reported / Documented Medical Conditions?</label>
            <div className="flex gap-4 mt-1">
              <label><input type="radio" name="medical" value="yes" onChange={() => setMedicalConditions('yes')} checked={medicalConditions === 'yes'} /> Yes</label>
              <label><input type="radio" name="medical" value="no" onChange={() => setMedicalConditions('no')} checked={medicalConditions === 'no'} /> No</label>
              <label><input type="radio" name="medical" value="not assessed" onChange={() => setMedicalConditions('not assessed')} checked={medicalConditions === 'not assessed'} /> Not Assessed</label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Additional Interventions</label>
            <textarea className="w-full border rounded p-2" value={additionalInterventions} onChange={(e) => setAdditionalInterventions(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Case Note Detail</label>
            <textarea className="w-full border rounded p-2" value={caseNoteDetail} onChange={(e) => setCaseNoteDetail(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Case Manager Name</label>
            <input type="text" className="w-full border rounded p-2" value={caseManagerName} onChange={(e) => setCaseManagerName(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Signature</label>
            <input type="text" className="w-full border rounded p-2" value={signature} onChange={(e) => setSignature(e.target.value)} placeholder="Type your name as a signature" />
          </div>
          <button
            type="submit"
            className="mt-2 bg-[#007B94] text-white font-semibold px-6 py-2 rounded-md shadow hover:bg-[#00657a] transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Previous Notes */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-5xl mx-auto mt-8">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Previous Case Notes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input type="text" placeholder="Search notes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full px-3 py-2 border rounded text-sm">
            <option value="">All Contact Types</option>
            <option>Face to Face</option>
            <option>Telephone Call</option>
            <option>Email</option>
            <option>Text</option>
            <option>Internal</option>
          </select>
          <input type="text" placeholder="Filter by Contact Name" value={filterContactName} onChange={(e) => setFilterContactName(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
          <select value={filterMedical} onChange={(e) => setFilterMedical(e.target.value)} className="w-full px-3 py-2 border rounded text-sm">
            <option value="">All Medical Conditions</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not assessed">Not Assessed</option>
          </select>
        </div>

        {loading ? (
          <p>Loading notes...</p>
        ) : filteredNotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs table-auto">
              <thead className="bg-[#007B94] text-white">
                <tr>
                  <th className="p-2 border-b text-left">Date</th>
                  <th className="p-2 border-b text-left">Staff</th>
                  <th className="p-2 border-b text-left">Type</th>
                  <th className="p-2 border-b text-left">Note Preview</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes
                  .sort((a, b) => new Date(b.dateOfContact) - new Date(a.dateOfContact))
                  .map((note, index) => (
                    <tr key={index} className="hover:bg-gray-200 border-t">
                      <td className="p-2">{note.dateOfContact || '—'}</td>
                      <td className="p-2">{note.assignedStaff || '—'}</td>
                      <td className="p-2">{note.typeOfContact || '—'}</td>
                      <td className="p-2 text-black">
                        {note.caseNoteDetail
                          ? note.caseNoteDetail.slice(0, 80) + (note.caseNoteDetail.length > 80 ? '...' : '')
                          : '—'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No case notes found.</p>
        )}
      </div>
    </div>
  );
};

export default CaseNotesPage;
