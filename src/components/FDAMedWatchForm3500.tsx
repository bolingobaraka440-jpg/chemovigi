import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, User, Pill, AlertCircle, Calendar, MapPin, Phone, Mail, Save, Send, Info, CheckCircle, Shield, ArrowRight } from 'lucide-react';

interface FDAMedWatchForm3500Props {
  userName?: string;
  userEmail?: string;
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

export function FDAMedWatchForm3500({ userName = '', userEmail = '', onSubmit, onCancel }: FDAMedWatchForm3500Props) {
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state following FDA Form 3500 structure
  const [formData, setFormData] = useState({
    // Section A: Patient Information
    patientInitials: '',
    patientAge: '',
    patientDateOfBirth: '',
    patientSex: '',
    patientWeight: '',
    patientWeightUnit: 'kg',
    
    // Section B: Adverse Event/Product Problem
    adverseEvent: '',
    dateOfEvent: '',
    dateOfThisReport: new Date().toISOString().split('T')[0],
    describeEvent: '',
    
    // Event Outcomes
    outcomes: {
      death: false,
      lifeThreatening: false,
      hospitalization: false,
      disability: false,
      congenitalAnomaly: false,
      requiredIntervention: false,
      other: false,
      otherDescription: ''
    },
    
    // Section C: Suspect Product(s)
    productName: '',
    productDosage: '',
    productRoute: '',
    productFrequency: '',
    productStartDate: '',
    productStopDate: '',
    productLotNumber: '',
    productExpDate: '',
    productNDC: '',
    productProblemType: '',
    
    // Section D: Suspect Medical Device (if applicable)
    deviceBrandName: '',
    deviceCommonName: '',
    deviceManufacturer: '',
    deviceModelNumber: '',
    
    // Section E: Reporter Information
    reporterName: userName,
    reporterAddress: '',
    reporterCity: '',
    reporterState: '',
    reporterZipCode: '',
    reporterPhone: '',
    reporterEmail: userEmail,
    reporterOccupation: 'Consumer',
    
    // Additional Information
    relevantTests: '',
    relevantHistory: '',
    otherMedications: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateOutcome = (outcome: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      outcomes: { ...prev.outcomes, [outcome]: checked }
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
    { id: 1, title: 'Patient Information', icon: User },
    { id: 2, title: 'Adverse Event', icon: AlertCircle },
    { id: 3, title: 'Product Information', icon: Pill },
    { id: 4, title: 'Reporter Information', icon: FileText },
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
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Report Submitted Successfully!</h2>
            <p className="text-slate-600 mb-8">
              Your FDA MedWatch Form 3500 has been submitted. A confirmation email will be sent to {userEmail}.
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Report ID:</strong> MW-{Date.now().toString().slice(-8)}
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
            <h1 className="text-4xl font-bold text-slate-800">FDA MedWatch Form 3500</h1>
          </div>
          <p className="text-slate-600 mb-2">Consumer/Patient Adverse Event Reporting Form</p>
          <p className="text-sm text-slate-500">Submit to FDA FAERS (FDA Adverse Event Reporting System)</p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-slate-700">
              <p className="font-semibold mb-2">IMPORTANT: Please Read Before Completing</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>This form is for reporting suspected adverse events and product problems to FDA</li>
                <li>Complete as much information as possible - partial submissions are accepted</li>
                <li>Patient identity is held in strict confidence by FDA and protected to the fullest extent</li>
                <li>For emergencies, contact your healthcare provider or call 911 immediately</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Progress Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="grid grid-cols-4 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
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
                    Patient Age (or Date of Birth)
                  </label>
                  <input
                    type="text"
                    value={formData.patientAge}
                    onChange={(e) => updateFormData('patientAge', e.target.value)}
                    placeholder="e.g., 45 years"
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
              </div>
            </motion.div>
          )}

          {/* Section B: Adverse Event */}
          {currentSection === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section B: Adverse Event or Product Problem</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Adverse Event or Product Problem (Required) *
                  </label>
                  <input
                    type="text"
                    value={formData.adverseEvent}
                    onChange={(e) => updateFormData('adverseEvent', e.target.value)}
                    placeholder="e.g., Severe nausea and vomiting"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date of Event
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
                    Describe Event or Problem (Required) *
                  </label>
                  <textarea
                    value={formData.describeEvent}
                    onChange={(e) => updateFormData('describeEvent', e.target.value)}
                    rows={5}
                    placeholder="Please describe what happened, including when it started, symptoms experienced, and any actions taken..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Check All That Apply (Event Outcomes)
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'death', label: 'Death' },
                      { key: 'lifeThreatening', label: 'Life-Threatening' },
                      { key: 'hospitalization', label: 'Hospitalization (initial or prolonged)' },
                      { key: 'disability', label: 'Disability or Permanent Damage' },
                      { key: 'congenitalAnomaly', label: 'Congenital Anomaly/Birth Defect' },
                      { key: 'requiredIntervention', label: 'Required Intervention to Prevent Permanent Impairment/Damage' },
                    ].map((outcome) => (
                      <label key={outcome.key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={formData.outcomes[outcome.key as keyof typeof formData.outcomes] as boolean}
                          onChange={(e) => updateOutcome(outcome.key, e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-700">{outcome.label}</span>
                      </label>
                    ))}
                    
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
                            onChange={(e) => updateFormData('outcomes', { ...formData.outcomes, otherDescription: e.target.value })}
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

          {/* Section C: Product Information */}
          {currentSection === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section C: Suspect Product(s) Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product Name (Required) *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => updateFormData('productName', e.target.value)}
                    placeholder="e.g., Doxorubicin HCl"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Dose, Frequency & Route Used
                    </label>
                    <input
                      type="text"
                      value={formData.productDosage}
                      onChange={(e) => updateFormData('productDosage', e.target.value)}
                      placeholder="e.g., 50mg/m² IV"
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
                      Therapy Stop Date (if applicable)
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
                      Lot Number
                    </label>
                    <input
                      type="text"
                      value={formData.productLotNumber}
                      onChange={(e) => updateFormData('productLotNumber', e.target.value)}
                      placeholder="If available"
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
                      placeholder="If available"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Other Relevant Medications or Products Being Taken
                  </label>
                  <textarea
                    value={formData.otherMedications}
                    onChange={(e) => updateFormData('otherMedications', e.target.value)}
                    rows={3}
                    placeholder="List other medications, supplements, or therapies..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Section D: Reporter Information */}
          {currentSection === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Section D: Reporter Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.reporterName}
                    onChange={(e) => updateFormData('reporterName', e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.reporterEmail}
                      onChange={(e) => updateFormData('reporterEmail', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.reporterAddress}
                    onChange={(e) => updateFormData('reporterAddress', e.target.value)}
                    placeholder="Street address"
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
                      placeholder="City"
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
                      placeholder="State/Province"
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
                      placeholder="Zip/Postal Code"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Occupation
                  </label>
                  <select
                    value={formData.reporterOccupation}
                    onChange={(e) => updateFormData('reporterOccupation', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Consumer">Consumer/Patient</option>
                    <option value="Family Member">Family Member</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Relevant Tests/Laboratory Data
                  </label>
                  <textarea
                    value={formData.relevantTests}
                    onChange={(e) => updateFormData('relevantTests', e.target.value)}
                    rows={3}
                    placeholder="Include dates of tests or laboratory data..."
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
                    rows={3}
                    placeholder="Include pre-existing conditions, allergies, etc..."
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
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
              {currentSection < 4 ? (
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