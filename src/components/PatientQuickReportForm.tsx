import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Report } from '../App';

interface PatientQuickReportFormProps {
  onNavigate: (page: string) => void;
  onReportSubmit: (report: Report) => void;
  userName: string;
  userEmail: string;
}

interface FormData {
  // Problem
  problemTypes: string[];
  problemDate: string;
  problemDescription: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical' | '';
  
  // Product
  productName: string;
  manufacturer: string;
  
  // Patient
  patientAge: string;
  patientSex: string;
  patientWeight: string;
  medicalConditions: string;
  currentMedications: string;
  
  // Reporter
  reporterPhone: string;
}

const steps = [
  { id: 1, name: 'Problem', key: 'problem' },
  { id: 2, name: 'Product', key: 'product' },
  { id: 3, name: 'Patient Info', key: 'patient' },
  { id: 4, name: 'Review & Submit', key: 'review' }
];

export function PatientQuickReportForm({ 
  onNavigate, 
  onReportSubmit, 
  userName, 
  userEmail 
}: PatientQuickReportFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    problemTypes: [],
    problemDate: '',
    problemDescription: '',
    severity: '',
    productName: '',
    manufacturer: '',
    patientAge: '',
    patientSex: '',
    patientWeight: '',
    medicalConditions: '',
    currentMedications: '',
    reporterPhone: ''
  });

  const toggleArrayField = (value: string) => {
    const currentArray = formData.problemTypes;
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    setFormData({ ...formData, problemTypes: newArray });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const calculatePriority = (severity: string): number => {
    switch (severity) {
      case 'Critical': return 1;
      case 'Severe': return 2;
      case 'Moderate': return 3;
      case 'Mild': return 5;
      default: return 4;
    }
  };

  const calculateUrgency = (severity: string): 'Low' | 'Medium' | 'High' | 'Critical' => {
    switch (severity) {
      case 'Critical': return 'Critical';
      case 'Severe': return 'High';
      case 'Moderate': return 'Medium';
      case 'Mild': return 'Low';
      default: return 'Medium';
    }
  };

  const handleSubmit = () => {
    if (!formData.productName || !formData.problemDescription || !formData.severity) {
      alert('Please fill all required fields (Product Name, Problem Description, and Severity)');
      return;
    }

    const newReport: Report = {
      id: Date.now(),
      patientName: userName,
      patientEmail: userEmail,
      drug: formData.productName,
      severity: formData.severity as any,
      symptoms: formData.problemDescription,
      dateReported: new Date().toISOString().split('T')[0],
      status: formData.severity === 'Critical' || formData.severity === 'Severe' ? 'Urgent' : 'Under Review',
      aiAnalyzed: false,
      priority: calculatePriority(formData.severity),
      urgency: calculateUrgency(formData.severity)
    };

    onReportSubmit(newReport);
    setCurrentStep(5); // Success screen
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-28 pb-16">
      {currentStep < 5 && (
        <>
          {/* PROGRESS TRACKER - FIXED AT TOP */}
          <div className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-40 py-6">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                      </div>
                      <span className={`text-xs mt-2 font-medium hidden sm:block ${
                        currentStep >= step.id ? 'text-slate-800' : 'text-gray-400'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN FORM CARD */}
          <div className="max-w-3xl mx-auto px-6 mt-24">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {/* STEP 1: PROBLEM */}
                {currentStep === 1 && (
                  <motion.div
                    key="problem"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About the Problem</h2>
                    <p className="text-sm text-gray-500 mb-8">* Required Information</p>

                    {/* Problem Type */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">
                        What kind of problem was it? *
                      </label>
                      <div className="space-y-2">
                        {[
                          'Had a bad side effect',
                          'Product didn\'t work as expected',
                          'Allergic reaction',
                          'Other problem'
                        ].map(option => (
                          <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-slate-200">
                            <input
                              type="checkbox"
                              checked={formData.problemTypes.includes(option)}
                              onChange={() => toggleArrayField(option)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Date Problem Occurred */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-2">
                        📅 When did the problem occur?
                      </label>
                      <input
                        type="date"
                        value={formData.problemDate}
                        onChange={(e) => setFormData({ ...formData, problemDate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Problem Description */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-2">
                        Tell us what happened and how it happened *
                      </label>
                      <textarea
                        value={formData.problemDescription}
                        onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                        placeholder="Please describe your symptoms and what happened... (e.g., severe nausea, dizziness, rash)"
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    {/* Severity */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">
                        How severe were the symptoms? *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { value: 'Mild', color: 'green', desc: 'Manageable' },
                          { value: 'Moderate', color: 'yellow', desc: 'Concerning' },
                          { value: 'Severe', color: 'orange', desc: 'Serious' },
                          { value: 'Critical', color: 'red', desc: 'Emergency' }
                        ].map((severity) => (
                          <button
                            key={severity.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, severity: severity.value as any })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              formData.severity === severity.value
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            <p className={`font-bold text-sm ${
                              formData.severity === severity.value ? 'text-blue-700' : 'text-slate-700'
                            }`}>
                              {severity.value}
                            </p>
                            <p className="text-xs text-slate-500">{severity.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PRODUCT */}
                {currentStep === 2 && (
                  <motion.div
                    key="product"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About the Product</h2>
                    <p className="text-sm text-gray-500 mb-8">Tell us about the medication or product</p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Medication/Product Name *
                        </label>
                        <input
                          type="text"
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          placeholder="e.g., Aspirin, Ibuprofen, Cisplatin"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Manufacturer (if known)
                        </label>
                        <input
                          type="text"
                          value={formData.manufacturer}
                          onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                          placeholder="Optional"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PATIENT INFO */}
                {currentStep === 3 && (
                  <motion.div
                    key="patient"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Patient Information</h2>
                    <p className="text-sm text-gray-500 mb-8">Help us understand your medical background</p>

                    <div className="space-y-6">
                      {/* Basic Demographics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Age</label>
                          <input
                            type="number"
                            value={formData.patientAge}
                            onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                            placeholder="Your age"
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Sex</label>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setFormData({ ...formData, patientSex: 'Male' })}
                              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                formData.patientSex === 'Male'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              Male
                            </button>
                            <button
                              onClick={() => setFormData({ ...formData, patientSex: 'Female' })}
                              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                                formData.patientSex === 'Female'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              Female
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Weight (optional)</label>
                        <input
                          type="text"
                          value={formData.patientWeight}
                          onChange={(e) => setFormData({ ...formData, patientWeight: e.target.value })}
                          placeholder="e.g., 70 kg or 154 lbs"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Medical Conditions */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Known Medical Conditions (optional)
                        </label>
                        <textarea
                          value={formData.medicalConditions}
                          onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                          placeholder="List any relevant medical conditions..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      {/* Current Medications */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Other Medications (optional)
                        </label>
                        <textarea
                          value={formData.currentMedications}
                          onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                          placeholder="List other medications you are currently taking..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      {/* Contact Phone */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Phone Number (for follow-up)
                        </label>
                        <input
                          type="tel"
                          value={formData.reporterPhone}
                          onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                          placeholder="+250 xxx xxx xxx"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: REVIEW & SUBMIT */}
                {currentStep === 4 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Review & Submit</h2>
                    <p className="text-sm text-gray-500 mb-8">Please review your information before submitting</p>

                    <div className="space-y-6">
                      {/* Problem Summary */}
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-blue-900 mb-3">About Problem</h3>
                        <div className="space-y-2 text-sm">
                          {formData.problemTypes.length > 0 && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Problem type:</span> {formData.problemTypes.join(', ')}
                            </p>
                          )}
                          {formData.problemDate && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Date:</span> {formData.problemDate}
                            </p>
                          )}
                          {formData.problemDescription && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Description:</span> {formData.problemDescription}
                            </p>
                          )}
                          {formData.severity && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Severity:</span> {formData.severity}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Product Summary */}
                      {formData.productName && (
                        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-teal-900 mb-3">About Product</h3>
                          <div className="space-y-2 text-sm">
                            <p className="text-slate-700">
                              <span className="font-semibold">Product:</span> {formData.productName}
                            </p>
                            {formData.manufacturer && (
                              <p className="text-slate-700">
                                <span className="font-semibold">Manufacturer:</span> {formData.manufacturer}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Patient Summary */}
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">Patient Information</h3>
                        <div className="space-y-2 text-sm">
                          <p className="text-slate-700">
                            <span className="font-semibold">Name:</span> {userName}
                          </p>
                          {formData.patientSex && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Sex:</span> {formData.patientSex}
                            </p>
                          )}
                          {formData.patientAge && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Age:</span> {formData.patientAge}
                            </p>
                          )}
                          {formData.reporterPhone && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Phone:</span> {formData.reporterPhone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* reCAPTCHA placeholder */}
                      <div className="bg-slate-100 border-2 border-slate-300 rounded-lg p-6 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-slate-600 mb-2">☑️ I'm not a robot</p>
                          <p className="text-xs text-slate-500">(reCAPTCHA verification)</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* NAVIGATION BUTTONS */}
              <div className="border-t-2 border-slate-200 p-6 flex justify-between bg-slate-50">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-8 py-3 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center gap-2 ml-auto"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center gap-2 ml-auto"
                  >
                    <span>Submit Report</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* SUCCESS SCREEN */}
      {currentStep === 5 && (
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-16 h-16 text-green-600" />
            </motion.div>

            <h2 className="text-4xl font-bold text-slate-800 mb-4">Report Submitted Successfully!</h2>
            <p className="text-xl text-slate-600 mb-8">
              Your report has been received and will be reviewed by our clinical team.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
              <h3 className="font-bold text-lg text-slate-800 mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Clinical Review</p>
                    <p className="text-sm text-slate-600">A clinician will review your report within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Priority Assessment</p>
                    <p className="text-sm text-slate-600">Urgent cases are flagged for immediate attention</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Follow-up</p>
                    <p className="text-sm text-slate-600">You'll receive updates via email if action is needed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    problemTypes: [],
                    problemDate: '',
                    problemDescription: '',
                    severity: '',
                    productName: '',
                    manufacturer: '',
                    patientAge: '',
                    patientSex: '',
                    patientWeight: '',
                    medicalConditions: '',
                    currentMedications: '',
                    reporterPhone: ''
                  });
                }}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Submit Another Report
              </button>
              <button
                onClick={() => onNavigate('PatientDashboard')}
                className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all"
              >
                View My Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
