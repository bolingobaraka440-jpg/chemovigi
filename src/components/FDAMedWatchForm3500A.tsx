import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, User, Pill, AlertCircle, Stethoscope, Shield, Info, CheckCircle, Send, ArrowRight, Building, Calendar } from 'lucide-react';

interface FDAMedWatchForm3500AProps {
  userName?: string;
  userEmail?: string;
  reportData?: any; // Pre-populated from patient report
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

export function FDAMedWatchForm3500A({ userName = '', userEmail = '', reportData, onSubmit, onCancel }: FDAMedWatchForm3500AProps) {
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state following FDA Form 3500A structure (Healthcare Professional version)
  const [formData, setFormData] = useState({
    // Section A: Patient Information
    patientInitials: reportData?.patientInitials || '',
    patientAge: reportData?.patientAge || '',
    patientAgeUnit: 'years',
    patientDateOfBirth: reportData?.patientDateOfBirth || '',
    patientSex: reportData?.patientSex || '',
    patientWeight: reportData?.patientWeight || '',
    patientWeightUnit: reportData?.patientWeightUnit || 'kg',
    patientHeight: '',
    patientHeightUnit: 'cm',
    patientEthnicity: '',
    patientId: '',
    
    // Section B: Adverse Event/Product Problem
    adverseEvent: reportData?.adverseEvent || '',
    dateOfEvent: reportData?.dateOfEvent || '',
    dateOfThisReport: new Date().toISOString().split('T')[0],
    describeEvent: reportData?.describeEvent || '',
    
    // Event Outcomes (Professional assessment)
    outcomes: {
      death: reportData?.outcomes?.death || false,
      deathDate: '',
      lifeThreatening: reportData?.outcomes?.lifeThreatening || false,
      hospitalization: reportData?.outcomes?.hospitalization || false,
      hospitalizationDates: '',
      disability: reportData?.outcomes?.disability || false,
      congenitalAnomaly: reportData?.outcomes?.congenitalAnomaly || false,
      requiredIntervention: reportData?.outcomes?.requiredIntervention || false,
      other: reportData?.outcomes?.other || false,
      otherDescription: reportData?.outcomes?.otherDescription || ''
    },
    
    // Section C: Suspect Product(s)
    productName: reportData?.productName || '',
    productManufacturer: '',
    productDosage: reportData?.productDosage || '',
    productRoute: reportData?.productRoute || '',
    productIndication: '',
    productStartDate: reportData?.productStartDate || '',
    productStopDate: reportData?.productStopDate || '',
    productLotNumber: reportData?.productLotNumber || '',
    productExpDate: reportData?.productExpDate || '',
    productNDC: reportData?.productNDC || '',
    
    // Therapy dates and rechallenge
    therapyDuration: '',
    rechallenge: '',
    rechallengeResult: '',
    
    // Section D: Suspect Medical Device
    deviceName: '',
    deviceManufacturer: '',
    deviceModelNumber: '',
    deviceCatalogNumber: '',
    deviceSerialNumber: '',
    deviceOperatorOfDevice: '',
    deviceDateOfImplant: '',
    deviceDateOfExplant: '',
    deviceMalfunctionAvailable: '',
    deviceReturned: '',
    
    // Section E: Reporter Information
    reporterName: userName,
    reporterStreetAddress: '',
    reporterCity: '',
    reporterState: '',
    reporterZipCode: '',
    reporterCountry: 'Rwanda',
    reporterPhone: '',
    reporterEmail: userEmail,
    reporterFax: '',
    
    // Professional Designation
    reporterOccupation: 'Physician',
    reporterHealthFacility: '',
    reporterSpecialty: '',
    reporterNPINumber: '',
    
    // Section F: Initial Report Source
    reportSource: 'Healthcare Professional',
    reportedToManufacturer: false,
    reportedToManufacturerDate: '',
    
    // Section G: All Available Information
    relevantTests: reportData?.relevantTests || '',
    relevantHistory: reportData?.relevantHistory || '',
    otherMedications: reportData?.otherMedications || '',
    
    // Professional Assessment
    causality: '',
    seriousness: '',
    expectedEvent: '',
    clinicalCourse: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateOutcome = (outcome: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      outcomes: { ...prev.outcomes, [outcome]: value }
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSubmit) {
        onSubmit(formData);
      }
    }, 2000);
  };

  const sections = [
    { id: 1, title: 'Patient Info', icon: User },
    { id: 2, title: 'Adverse Event', icon: AlertCircle },
    { id: 3, title: 'Product Info', icon: Pill },
    { id: 4, title: 'Professional Assessment', icon: Stethoscope },
    { id: 5, title: 'Reporter Info', icon: FileText },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">FDA Form 3500A Submitted Successfully!</h2>
            <p className="text-slate-600 mb-8">
              Your professional FDA MedWatch Form 3500A has been submitted to FDA FAERS.
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Report ID:</strong> MW-3500A-{Date.now().toString().slice(-8)}
              </p>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Submitted by:</strong> {formData.reporterName}, {formData.reporterOccupation}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Submitted:</strong> {new Date().toLocaleString()}
              </p>
            </div>
            {onCancel && (
              <button
                onClick={onCancel}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all"
              >
                Return to Dashboard
              </button>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">FDA MedWatch Form 3500A</h1>
          </div>
          <p className="text-slate-600 mb-2">Healthcare Professional Adverse Event Reporting Form</p>
          <p className="text-sm text-slate-500">Submit to FDA FAERS (FDA Adverse Event Reporting System)</p>
        </motion.div>

        {/* Professional Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-slate-700">
              <p className="font-semibold mb-2">FOR HEALTHCARE PROFESSIONALS</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>This form should be completed by healthcare professionals reporting serious adverse events</li>
                <li>Include all relevant clinical information and professional assessment</li>
                <li>Patient identity is confidential and protected by federal privacy laws</li>
                <li>Reports are submitted to FDA FAERS for signal detection and safety monitoring</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Progress Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 overflow-x-auto">
          <div className="grid grid-cols-5 gap-2 min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  currentSection === section.id
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="hidden md:inline">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Sections */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Section A: Patient Information */}
          {currentSection === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section A: Patient Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Patient Initials (Required) *
                  </label>
                  <input
                    type="text"
                    value={formData.patientInitials}
                    onChange={(e) => updateFormData('patientInitials', e.target.value.toUpperCase())}
                    maxLength={3}
                    placeholder="ABC"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Patient ID / Medical Record #
                  </label>
                  <input
                    type="text"
                    value={formData.patientId}
                    onChange={(e) => updateFormData('patientId', e.target.value)}
                    placeholder="Optional - for facility use"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Age at Time of Event
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.patientAge}
                      onChange={(e) => updateFormData('patientAge', e.target.value)}
                      placeholder="45"
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <select
                      value={formData.patientAgeUnit}
                      onChange={(e) => updateFormData('patientAgeUnit', e.target.value)}
                      className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                      <option value="days">Days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth (or Age)
                  </label>
                  <input
                    type="date"
                    value={formData.patientDateOfBirth}
                    onChange={(e) => updateFormData('patientDateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sex
                  </label>
                  <select
                    value={formData.patientSex}
                    onChange={(e) => updateFormData('patientSex', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.patientWeight}
                      onChange={(e) => updateFormData('patientWeight', e.target.value)}
                      placeholder="70"
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <select
                      value={formData.patientWeightUnit}
                      onChange={(e) => updateFormData('patientWeightUnit', e.target.value)}
                      className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Height
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.patientHeight}
                      onChange={(e) => updateFormData('patientHeight', e.target.value)}
                      placeholder="170"
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <select
                      value={formData.patientHeightUnit}
                      onChange={(e) => updateFormData('patientHeightUnit', e.target.value)}
                      className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="cm">cm</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ethnicity (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.patientEthnicity}
                    onChange={(e) => updateFormData('patientEthnicity', e.target.value)}
                    placeholder="e.g., African, Asian, Caucasian"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Section B: Adverse Event (Similar to 3500 but with more clinical details) */}
          {currentSection === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section B: Adverse Event Assessment</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Adverse Event (Medical Terminology) *
                  </label>
                  <input
                    type="text"
                    value={formData.adverseEvent}
                    onChange={(e) => updateFormData('adverseEvent', e.target.value)}
                    placeholder="e.g., Severe chemotherapy-induced nausea and vomiting (CINV)"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date of Event Onset
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfEvent}
                      onChange={(e) => updateFormData('dateOfEvent', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date of This Report
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfThisReport}
                      onChange={(e) => updateFormData('dateOfThisReport', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Clinical Description of Event *
                  </label>
                  <textarea
                    value={formData.describeEvent}
                    onChange={(e) => updateFormData('describeEvent', e.target.value)}
                    rows={6}
                    placeholder="Provide detailed clinical description including: onset, severity, duration, clinical course, treatment given, and outcome..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Event Outcomes (Check all that apply)
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg cursor-pointer hover:bg-red-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.death}
                        onChange={(e) => updateOutcome('death', e.target.checked)}
                        className="w-5 h-5 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-1"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-slate-800 block mb-2">Death</span>
                        {formData.outcomes.death && (
                          <input
                            type="date"
                            value={formData.outcomes.deathDate}
                            onChange={(e) => updateOutcome('deathDate', e.target.value)}
                            placeholder="Date of death"
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-red-500 focus:outline-none text-sm"
                          />
                        )}
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.lifeThreatening}
                        onChange={(e) => updateOutcome('lifeThreatening', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Life-Threatening</span>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.hospitalization}
                        onChange={(e) => updateOutcome('hospitalization', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-1"
                      />
                      <div className="flex-1">
                        <span className="text-sm text-slate-700 block mb-2">Hospitalization (initial or prolonged)</span>
                        {formData.outcomes.hospitalization && (
                          <input
                            type="text"
                            value={formData.outcomes.hospitalizationDates}
                            onChange={(e) => updateOutcome('hospitalizationDates', e.target.value)}
                            placeholder="Admission and discharge dates"
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                          />
                        )}
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.disability}
                        onChange={(e) => updateOutcome('disability', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Disability or Permanent Damage</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.congenitalAnomaly}
                        onChange={(e) => updateOutcome('congenitalAnomaly', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Congenital Anomaly/Birth Defect</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.requiredIntervention}
                        onChange={(e) => updateOutcome('requiredIntervention', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Required Intervention to Prevent Permanent Impairment/Damage</span>
                    </label>

                    <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.outcomes.other}
                        onChange={(e) => updateOutcome('other', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-1"
                      />
                      <div className="flex-1">
                        <span className="text-sm text-slate-700 block mb-2">Other Serious (Important Medical Events)</span>
                        {formData.outcomes.other && (
                          <input
                            type="text"
                            value={formData.outcomes.otherDescription}
                            onChange={(e) => updateOutcome('otherDescription', e.target.value)}
                            placeholder="Please specify..."
                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Section C: Product Information - Extended for Healthcare Professionals */}
          {currentSection === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section C: Suspect Product(s)</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Product Name (Generic) *
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => updateFormData('productName', e.target.value)}
                      placeholder="e.g., Doxorubicin HCl"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      value={formData.productManufacturer}
                      onChange={(e) => updateFormData('productManufacturer', e.target.value)}
                      placeholder="Manufacturer name"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Indication for Use (Diagnosis being treated)
                  </label>
                  <input
                    type="text"
                    value={formData.productIndication}
                    onChange={(e) => updateFormData('productIndication', e.target.value)}
                    placeholder="e.g., Breast cancer, Stage II"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Dose, Frequency & Route
                    </label>
                    <input
                      type="text"
                      value={formData.productDosage}
                      onChange={(e) => updateFormData('productDosage', e.target.value)}
                      placeholder="e.g., 60mg/m² IV every 21 days"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Route of Administration
                    </label>
                    <select
                      value={formData.productRoute}
                      onChange={(e) => updateFormData('productRoute', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="Oral">Oral</option>
                      <option value="IV">Intravenous (IV)</option>
                      <option value="IM">Intramuscular (IM)</option>
                      <option value="SC">Subcutaneous (SC)</option>
                      <option value="Topical">Topical</option>
                      <option value="Inhalation">Inhalation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Therapy Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.productStartDate}
                      onChange={(e) => updateFormData('productStartDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Therapy Stop Date
                    </label>
                    <input
                      type="date"
                      value={formData.productStopDate}
                      onChange={(e) => updateFormData('productStopDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Lot/Batch Number
                    </label>
                    <input
                      type="text"
                      value={formData.productLotNumber}
                      onChange={(e) => updateFormData('productLotNumber', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      value={formData.productExpDate}
                      onChange={(e) => updateFormData('productExpDate', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      NDC # or Unique ID
                    </label>
                    <input
                      type="text"
                      value={formData.productNDC}
                      onChange={(e) => updateFormData('productNDC', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Product Rechallenge?
                    </label>
                    <select
                      value={formData.rechallenge}
                      onChange={(e) => updateFormData('rechallenge', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  {formData.rechallenge === 'Yes' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Rechallenge Result
                      </label>
                      <select
                        value={formData.rechallengeResult}
                        onChange={(e) => updateFormData('rechallengeResult', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="Recurred">Event Recurred</option>
                        <option value="Did Not Recur">Event Did Not Recur</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Concomitant Medical Products (other medications patient was taking)
                  </label>
                  <textarea
                    value={formData.otherMedications}
                    onChange={(e) => updateFormData('otherMedications', e.target.value)}
                    rows={3}
                    placeholder="List all other medications, including doses and routes..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Section D: Professional Assessment */}
          {currentSection === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section D: Professional Assessment</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Causality Assessment (Relationship to Product)
                  </label>
                  <select
                    value={formData.causality}
                    onChange={(e) => updateFormData('causality', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Certain">Certain</option>
                    <option value="Probable/Likely">Probable/Likely</option>
                    <option value="Possible">Possible</option>
                    <option value="Unlikely">Unlikely</option>
                    <option value="Conditional/Unclassified">Conditional/Unclassified</option>
                    <option value="Unassessable/Unclassifiable">Unassessable/Unclassifiable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Seriousness Criteria
                  </label>
                  <select
                    value={formData.seriousness}
                    onChange={(e) => updateFormData('seriousness', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Serious">Serious</option>
                    <option value="Non-Serious">Non-Serious</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Was this event expected based on product labeling?
                  </label>
                  <select
                    value={formData.expectedEvent}
                    onChange={(e) => updateFormData('expectedEvent', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Yes">Yes (Listed in product information)</option>
                    <option value="No">No (Unexpected/Unlisted)</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Clinical Course and Outcome
                  </label>
                  <textarea
                    value={formData.clinicalCourse}
                    onChange={(e) => updateFormData('clinicalCourse', e.target.value)}
                    rows={4}
                    placeholder="Describe the clinical course, treatment provided, and current patient status..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Relevant Laboratory Data / Tests
                  </label>
                  <textarea
                    value={formData.relevantTests}
                    onChange={(e) => updateFormData('relevantTests', e.target.value)}
                    rows={4}
                    placeholder="Include laboratory values, imaging results, diagnostic tests with dates..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Relevant Medical History
                  </label>
                  <textarea
                    value={formData.relevantHistory}
                    onChange={(e) => updateFormData('relevantHistory', e.target.value)}
                    rows={4}
                    placeholder="Include pre-existing conditions, relevant past medical history, allergies, prior ADRs..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Section E: Reporter Information */}
          {currentSection === 5 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section E: Reporter Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Healthcare Professional Name *
                  </label>
                  <input
                    type="text"
                    value={formData.reporterName}
                    onChange={(e) => updateFormData('reporterName', e.target.value)}
                    placeholder="Dr. First Last"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Occupation/Specialty *
                    </label>
                    <select
                      value={formData.reporterOccupation}
                      onChange={(e) => updateFormData('reporterOccupation', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Physician">Physician</option>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Physician Assistant">Physician Assistant</option>
                      <option value="Other Health Professional">Other Health Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Medical Specialty
                    </label>
                    <input
                      type="text"
                      value={formData.reporterSpecialty}
                      onChange={(e) => updateFormData('reporterSpecialty', e.target.value)}
                      placeholder="e.g., Oncology, Internal Medicine"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Health Facility / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.reporterHealthFacility}
                    onChange={(e) => updateFormData('reporterHealthFacility', e.target.value)}
                    placeholder="Hospital or clinic name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.reporterPhone}
                      onChange={(e) => updateFormData('reporterPhone', e.target.value)}
                      placeholder="+250 788 123 456"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.reporterEmail}
                      onChange={(e) => updateFormData('reporterEmail', e.target.value)}
                      placeholder="doctor@hospital.rw"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.reporterStreetAddress}
                    onChange={(e) => updateFormData('reporterStreetAddress', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.reporterCity}
                      onChange={(e) => updateFormData('reporterCity', e.target.value)}
                      placeholder="Kigali"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={formData.reporterState}
                      onChange={(e) => updateFormData('reporterState', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Zip/Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.reporterZipCode}
                      onChange={(e) => updateFormData('reporterZipCode', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      NPI Number (if applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.reporterNPINumber}
                      onChange={(e) => updateFormData('reporterNPINumber', e.target.value)}
                      placeholder="National Provider Identifier"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.reporterCountry}
                      onChange={(e) => updateFormData('reporterCountry', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.reportedToManufacturer}
                      onChange={(e) => updateFormData('reportedToManufacturer', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-1"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-slate-800 block mb-2">
                        Also reported to product manufacturer?
                      </span>
                      {formData.reportedToManufacturer && (
                        <input
                          type="date"
                          value={formData.reportedToManufacturerDate}
                          onChange={(e) => updateFormData('reportedToManufacturerDate', e.target.value)}
                          placeholder="Date reported"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t-2 border-slate-200">
            <div className="flex gap-3">
              {currentSection > 1 && (
                <button
                  onClick={() => setCurrentSection(currentSection - 1)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                >
                  Previous
                </button>
              )}
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {currentSection < 5 ? (
                <button
                  onClick={() => setCurrentSection(currentSection + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.patientInitials || !formData.adverseEvent || !formData.productName || !formData.describeEvent}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit to FDA FAERS
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
