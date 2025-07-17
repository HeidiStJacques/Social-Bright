import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  PlanOfCarePageMain,
  PlanOfCarePageFinancial,
  PlanOfCarePageHealthInformation,
  PlanOfCarePagePainAssessment,
  PlanOfCarePageCognitiveAssessment,
  PlanOfCarePageSafetyAssessment,
  PlanOfCarePageDailyLivingAssessment,
  PlanOfCarePageADL,
  PlanOfCarePageIADL,
  PlanOfCarePageSubstanceUse,
  PlanOfCarePage90Day,
} from ".";

export default function PlanOfCarePage() {
  const { clientId } = useParams();

  const [form, setForm] = useState({
    // ... your full form structure ...
    visitDate: '',
    visitType: '',
    livingArrangement: '',
    inKindCareGiver: 'No',
    careGivers: [],
    leavesHomeFrequency: '',
    satisfiedWithServices: '',
    satisfactionChangeReason: '',
    nhEasyServicesDelivered: '',
    serviceGapsExplanation: '',
    emergencyAcknowledged: false,
    hasHouseholdSupport: false,
    needsInstitutionalization: false,
    age: '',
    income: [],
    deductions: [],
    totalMonthlyIncome: 0,
    resourcesBelow2500: '',
    meetsHcbc: '',
    financialAssistance: {
      hasFoodStamps: false,
      foodStampsAmount: '',
      hasFuelAssistance: false,
      fuelAssistanceAmount: '',
      hasGrant: false,
      hasCommodityFood: false,
      hasHousingAssistance: false,
      housingAssistanceAmount: '',
      hasOther: false,
      otherAmount: '',
      otherValue: '',
    },
    financialComments: '',
    financialRedeterminationDate: '',
    medicalConditions: '',
    reviewedMedicalConditions: '',
    explainUnreviewedMedicalConditions: '',
    participantMedicalDescription: '',
    allergies: '',
    generalHealth: '',
    selfCareAbility: '',
    receivingTherapy: null,
    therapyTypes: [],
    institutionalized: '',
    institutionalizedExplanation: '',
    hospitalOfChoice: '',
    painTolerance: [],
    painLocation: '',
    painScale: '',
    painRelief: '',
    painReliefLevel: '',
    mentalStatus: [],
    affectMood: [],
    reportedSymptoms: [],
    decisionMaking: '',
    assistingPerson: '',
    mentalHealthTreatment: '',
    counselingProvider: '',
    cognitiveNotes: '',
    safetyRisks: [],
    apsReferralStatus: '',
    hasEnvironmentalHazards: '',
    environmentalHazardExplanation: '',
    abuseNeglectIndicators: '',
    abuseNeglectExplanation: '',
    safetyComments: '',
    hasContingentServices: '',
    contingentServicePlan: '',
    evacuationNeed: '',
    evacuationComments: '',
    medicationManagement: [],
    medicationAssistanceDetails: {},
    assistiveDevices: [],
    assistiveDeviceOther: '',
    usesIncontinenceSupplies: '',
    incontinenceDetails: '',
    adl: {
      Bathing: '',
      Dressing: '',
      Grooming: '',
      MouthCare: '',
      Eating: '',
      Mobility: '',
      Transfers: '',
      Toileting: '',
      skilledNursing: '',
      hcbsEligibility: '',
      redeterminationDate: '',
      twoPersonAssist: '',
    },
    iadl: {
      Appointments: '',
      Cleaning: '',
      Finance: '',
      Laundry: '',
      MealPreparation: '',
      Shopping: '',
      Telephone: '',
      Transportation: '',
      assistanceWithFourOrMore: '',
    },
    substanceUse: {
      nicotine: '',
      alcoholAbuse: '',
      prescriptionAbuse: '',
      withdrawalHistory: '',
      treatmentHistory: '',
      serviceBarrier: '',
      comments: '',
    },
    goals: [],
    caseManagerInterventions: '',
    contactNote: '',
    caseManagerName: '',
  });

  const adlScore = useMemo(() => {
    const scoreMap = {
      Independent: 0,
      'Minimal Assistance': 1,
      'Moderate Assistance': 2,
      'Total Assistance': 3,
    };

    return ['Bathing', 'Dressing', 'Grooming', 'MouthCare', 'Eating', 'Mobility', 'Transfers', 'Toileting'].reduce(
      (sum, key) => sum + (scoreMap[form.adl[key]] ?? 0),
      0
    );
  }, [form.adl]);

  useEffect(() => {
    const meets = adlScore >= 12 ? 'Yes' : 'No';
    if (form.adl.hcbsEligibility !== meets) {
      setForm((prev) => ({
        ...prev,
        adl: { ...prev.adl, hcbsEligibility: meets },
      }));
    }
  }, [adlScore, form.adl.hcbsEligibility]);

  useEffect(() => {
    const totalIncome = form.income.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
    const totalDeductions = form.deductions.reduce((sum, val) => sum + Number(val || 0), 0);
    const finalMonthly = totalIncome - totalDeductions;

    if (form.resourcesBelow2500) {
      const meets = form.resourcesBelow2500 === 'Yes' && finalMonthly < 2901 ? 'Yes' : 'No';
      if (finalMonthly !== form.totalMonthlyIncome || meets !== form.meetsHcbc) {
        setForm((prev) => ({
          ...prev,
          totalMonthlyIncome: finalMonthly,
          meetsHcbc: meets,
        }));
      }
    } else {
      if (finalMonthly !== form.totalMonthlyIncome) {
        setForm((prev) => ({
          ...prev,
          totalMonthlyIncome: finalMonthly,
        }));
      }
    }
  }, [form.income, form.deductions, form.resourcesBelow2500, form.totalMonthlyIncome, form.meetsHcbc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Plan of Care:', form);
    localStorage.setItem(`carePlan_last_${clientId}`, JSON.stringify(form));
  };

  const copyLastCarePlan = () => {
    const saved = localStorage.getItem(`carePlan_last_${clientId}`);
    if (saved) {
      setForm(JSON.parse(saved));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 text-sm text-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg font-bold text-center mb-6">
          Plan of Care – Client ID: {clientId}
        </h1>

        <button
          onClick={copyLastCarePlan}
          className="mb-6 bg-[#007B94] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#00687d]"
        >
          Copy Last Visit's Care Plan
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          <PlanOfCarePageMain form={form} setForm={setForm} />
          <PlanOfCarePageFinancial form={form} setForm={setForm} />
          <PlanOfCarePageHealthInformation form={form} setForm={setForm} />
          <PlanOfCarePagePainAssessment form={form} setForm={setForm} />
          <PlanOfCarePageCognitiveAssessment form={form} setForm={setForm} />
          <PlanOfCarePageSafetyAssessment form={form} setForm={setForm} />
          <PlanOfCarePageDailyLivingAssessment form={form} setForm={setForm} />
          <PlanOfCarePageADL form={form} setForm={setForm} />
          <PlanOfCarePageIADL form={form} setForm={setForm} />
          <PlanOfCarePageSubstanceUse form={form} setForm={setForm} />
          <PlanOfCarePage90Day form={form} setForm={setForm} />
        </form>
      </div>
    </div>
  );
}
