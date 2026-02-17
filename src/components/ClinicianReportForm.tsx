import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowLeft, ArrowRight, Plus, X, CheckCircle } from 'lucide-react';
import { Report } from '../App';

interface ClinicianReportFormProps {
  onNavigate: (page: string) => void;
  onReportSubmit: (report: Report) => void;
  userName: string;
  userEmail: string;
}

interface LabTest {
  testDate: string;
  testName: string;
  result: string;
  unit: string;
  low: string;
  high: string;
}

interface FormData {
  // Problem
  problemTypes: string[];
  outcomes: string[];
  problemDate: string;
  problemDescription: string;
  labTests: LabTest[];
  causeType: 'product' | 'device' | '';
  hasProduct: string;
  hasPictures: string;
  
  // Device
  deviceName: string;
  modelNumber: string;
  catalogNumber: string;
  lotNumber: string;
  serialNumber: string;
  udiNumber: string;
  deviceExpiration: string;
  operatorInvolved: string;
  deviceImplanted: string;
  implantDate: string;
  explantDate: string;
  
  // Product
  therapyOngoing: boolean;
  productName: string;
  manufacturer: string;
  productTypes: string[];
  cosmeticUse: string;
  expiration: string;
  lot: string;
  ndc: string;
  strength: string;
  unit: string;
  quantity: string;
  frequency: string;
  routeOfAdmin: string;
  purchasePlace: string;
  purchaseCountry: string;
  purchaseAddress: string;
  purchaseWebsite: string;
  purchaseDate: string;
  therapyStartDate: string;
  therapyEndDate: string;
  lastDoseDate: string;
  
  // Patient
  patientInitials: string;
  patientSex: string;
  patientAge: string;
  patientAgeUnit: string;
  patientDOB: string;
  patientWeight: string;
  patientWeightUnit: string;
  patientRace: string[];
  medicalConditions: string;
  allergies: string;
  otherInfo: string;
  currentMedications: string;
  otcSupplements: string;
  
  // Reporter
  reporterFirstName: string;
  reporterLastName: string;
  reporterCountry: string;
  reporterStreet: string;
  reporterCity: string;
  reporterPhone: string;
  reporterEmail: string;
  reporterEmailConfirm: string;
  reportedToManufacturer: string;
  doNotDisclose: boolean;
}

const steps = [
  { id: 1, name: 'Problem', key: 'problem' },
  { id: 2, name: 'Device', key: 'device' },
  { id: 3, name: 'Product', key: 'product' },
  { id: 4, name: 'Patient', key: 'patient' },
  { id: 5, name: 'Reporter', key: 'reporter' },
  { id: 6, name: 'Review & Submit', key: 'review' }
];

export function ClinicianReportForm({ 
  onNavigate, 
  onReportSubmit, 
  userName, 
  userEmail 
}: ClinicianReportFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    problemTypes: [],
    outcomes: [],
    problemDate: '',
    problemDescription: '',
    labTests: [],
    causeType: '',
    hasProduct: '',
    hasPictures: '',
    deviceName: '',
    modelNumber: '',
    catalogNumber: '',
    lotNumber: '',
    serialNumber: '',
    udiNumber: '',
    deviceExpiration: '',
    operatorInvolved: '',
    deviceImplanted: '',
    implantDate: '',
    explantDate: '',
    therapyOngoing: false,
    productName: '',
    manufacturer: '',
    productTypes: [],
    cosmeticUse: '',
    expiration: '',
    lot: '',
    ndc: '',
    strength: '',
    unit: '',
    quantity: '',
    frequency: '',
    routeOfAdmin: '',
    purchasePlace: '',
    purchaseCountry: '',
    purchaseAddress: '',
    purchaseWebsite: '',
    purchaseDate: '',
    therapyStartDate: '',
    therapyEndDate: '',
    lastDoseDate: '',
    patientInitials: '',
    patientSex: '',
    patientAge: '',
    patientAgeUnit: 'years',
    patientDOB: '',
    patientWeight: '',
    patientWeightUnit: 'kg',
    patientRace: [],
    medicalConditions: '',
    allergies: '',
    otherInfo: '',
    currentMedications: '',
    otcSupplements: '',
    reporterFirstName: '',
    reporterLastName: '',
    reporterCountry: '',
    reporterStreet: '',
    reporterCity: '',
    reporterPhone: '',
    reporterEmail: '',
    reporterEmailConfirm: '',
    reportedToManufacturer: '',
    doNotDisclose: false
  });

  const addLabTest = () => {
    setFormData({
      ...formData,
      labTests: [...formData.labTests, {
        testDate: '',
        testName: '',
        result: '',
        unit: '',
        low: '',
        high: ''
      }]
    });
  };

  const removeLabTest = (index: number) => {
    const newTests = formData.labTests.filter((_, i) => i !== index);
    setFormData({ ...formData, labTests: newTests });
  };

  const updateLabTest = (index: number, field: keyof LabTest, value: string) => {
    const newTests = [...formData.labTests];
    newTests[index][field] = value;
    setFormData({ ...formData, labTests: newTests });
  };

  const toggleArrayField = (field: 'problemTypes' | 'outcomes' | 'productTypes' | 'patientRace', value: string) => {
    const currentArray = formData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    setFormData({ ...formData, [field]: newArray });
  };

  const handleNext = () => {
    if (currentStep < 6) {
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

  const calculateSeverity = (): 'Mild' | 'Moderate' | 'Severe' | 'Critical' => {
    if (formData.outcomes.includes('Death') || 
        formData.outcomes.includes('Life-threatening')) {
      return 'Critical';
    }
    if (formData.outcomes.includes('Hospitalization') || 
        formData.outcomes.includes('Disability')) {
      return 'Severe';
    }
    if (formData.outcomes.length > 0) {
      return 'Moderate';
    }
    return 'Mild';
  };

  const handleSubmit = () => {
    const severity = calculateSeverity();
    const newReport: Report = {
      id: Date.now(),
      patientName: formData.patientInitials || 'Anonymous Patient',
      patientEmail: formData.reporterEmail || userEmail,
      drug: formData.productName || formData.deviceName || 'Not specified',
      severity,
      symptoms: formData.problemDescription,
      dateReported: new Date().toISOString().split('T')[0],
      status: severity === 'Critical' || severity === 'Severe' ? 'Urgent' : 'Under Review',
      aiAnalyzed: false,
      priority: severity === 'Critical' ? 1 : severity === 'Severe' ? 2 : severity === 'Moderate' ? 3 : 5,
      urgency: severity === 'Critical' ? 'Critical' : severity === 'Severe' ? 'High' : severity === 'Moderate' ? 'Medium' : 'Low'
    };

    onReportSubmit(newReport);
    setCurrentStep(7); // Success screen
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-28 pb-16">
      {currentStep < 7 && (
        <>
          {/* PROGRESS TRACKER - FIXED AT TOP */}
          <div className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-40 py-6">
            <div className="max-w-5xl mx-auto px-6">
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
          <div className="max-w-4xl mx-auto px-6 mt-24">
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
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About Problem</h2>
                    <p className="text-sm text-gray-500 mb-8">* Required Information</p>

                    {/* Problem Type */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">
                        What kind of problem was it? *
                      </label>
                      <div className="space-y-2">
                        {[
                          'Were hurt or had a bad side effect',
                          'Used a product incorrectly',
                          'Noticed a quality problem',
                          'Had problems after switching product'
                        ].map(option => (
                          <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.problemTypes.includes(option)}
                              onChange={() => toggleArrayField('problemTypes', option)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-slate-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">
                        Did any of the following happen?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          'Death',
                          'Life-threatening',
                          'Hospitalization',
                          'Disability',
                          'Congenital Anomaly',
                          'Required Intervention',
                          'Other Serious'
                        ].map(option => (
                          <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.outcomes.includes(option)}
                              onChange={() => toggleArrayField('outcomes', option)}
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
                        Date the problem occurred
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
                        placeholder="Describe the adverse event in detail..."
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    {/* Laboratory Results */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">
                        Relevant Laboratory Tests
                      </label>
                      
                      {formData.labTests.map((test, index) => (
                        <div key={index} className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 mb-3">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-slate-700">Test #{index + 1}</h4>
                            <button
                              onClick={() => removeLabTest(index)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Test Date</label>
                              <input
                                type="date"
                                value={test.testDate}
                                onChange={(e) => updateLabTest(index, 'testDate', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm text-slate-600 mb-1">Test Name</label>
                              <input
                                type="text"
                                value={test.testName}
                                onChange={(e) => updateLabTest(index, 'testName', e.target.value)}
                                placeholder="e.g., Creatinine, ALT, Hemoglobin"
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Result</label>
                              <input
                                type="text"
                                value={test.result}
                                onChange={(e) => updateLabTest(index, 'result', e.target.value)}
                                placeholder="Value"
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Unit</label>
                              <input
                                type="text"
                                value={test.unit}
                                onChange={(e) => updateLabTest(index, 'unit', e.target.value)}
                                placeholder="mg/dL, mmol/L"
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Normal Low</label>
                              <input
                                type="text"
                                value={test.low}
                                onChange={(e) => updateLabTest(index, 'low', e.target.value)}
                                placeholder="Min"
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Normal High</label>
                              <input
                                type="text"
                                value={test.high}
                                onChange={(e) => updateLabTest(index, 'high', e.target.value)}
                                placeholder="Max"
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addLabTest}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Laboratory Test</span>
                      </button>
                    </div>

                    {/* Cause Type */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-3">
                        Cause of problem
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 flex-1">
                          <input
                            type="radio"
                            value="product"
                            checked={formData.causeType === 'product'}
                            onChange={(e) => setFormData({ ...formData, causeType: e.target.value as any })}
                            className="w-5 h-5 text-blue-600"
                          />
                          <span className="font-medium text-slate-700">Problem with a product</span>
                        </label>
                        <label className="flex items-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 flex-1">
                          <input
                            type="radio"
                            value="device"
                            checked={formData.causeType === 'device'}
                            onChange={(e) => setFormData({ ...formData, causeType: e.target.value as any })}
                            className="w-5 h-5 text-blue-600"
                          />
                          <span className="font-medium text-slate-700">Problem with a device</span>
                        </label>
                      </div>
                    </div>

                    {/* Product Available */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-2">
                        Do you still have the product?
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setFormData({ ...formData, hasProduct: 'Yes' })}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            formData.hasProduct === 'Yes'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, hasProduct: 'No' })}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            formData.hasProduct === 'No'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Pictures */}
                    <div className="mb-6">
                      <label className="block text-slate-700 font-bold mb-2">
                        Do you have pictures?
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setFormData({ ...formData, hasPictures: 'Yes' })}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            formData.hasPictures === 'Yes'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, hasPictures: 'No' })}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            formData.hasPictures === 'No'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DEVICE */}
                {currentStep === 2 && (
                  <motion.div
                    key="device"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About Device</h2>
                    <p className="text-sm text-gray-500 mb-8">Complete if the problem involved a medical device</p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Device Name</label>
                        <input
                          type="text"
                          value={formData.deviceName}
                          onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
                          placeholder="Enter device name"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Model Number</label>
                          <input
                            type="text"
                            value={formData.modelNumber}
                            onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Catalog Number</label>
                          <input
                            type="text"
                            value={formData.catalogNumber}
                            onChange={(e) => setFormData({ ...formData, catalogNumber: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Lot Number</label>
                          <input
                            type="text"
                            value={formData.lotNumber}
                            onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Serial Number</label>
                          <input
                            type="text"
                            value={formData.serialNumber}
                            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">UDI Number</label>
                          <input
                            type="text"
                            value={formData.udiNumber}
                            onChange={(e) => setFormData({ ...formData, udiNumber: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Expiration Date</label>
                          <input
                            type="date"
                            value={formData.deviceExpiration}
                            onChange={(e) => setFormData({ ...formData, deviceExpiration: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Was someone operating the device?
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setFormData({ ...formData, operatorInvolved: 'Yes' })}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                              formData.operatorInvolved === 'Yes'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setFormData({ ...formData, operatorInvolved: 'No' })}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                              formData.operatorInvolved === 'No'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Was the device implanted?
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setFormData({ ...formData, deviceImplanted: 'Yes' })}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                              formData.deviceImplanted === 'Yes'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setFormData({ ...formData, deviceImplanted: 'No' })}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                              formData.deviceImplanted === 'No'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {formData.deviceImplanted === 'Yes' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-slate-700 font-bold mb-2">Implant Date</label>
                            <input
                              type="date"
                              value={formData.implantDate}
                              onChange={(e) => setFormData({ ...formData, implantDate: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-2">Explant Date (if removed)</label>
                            <input
                              type="date"
                              value={formData.explantDate}
                              onChange={(e) => setFormData({ ...formData, explantDate: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PRODUCT */}
                {currentStep === 3 && (
                  <motion.div
                    key="product"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About Product</h2>
                    <p className="text-sm text-gray-500 mb-8">Complete if the problem involved a drug or biological product</p>

                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-slate-700 font-medium mb-4">
                          <input
                            type="checkbox"
                            checked={formData.therapyOngoing}
                            onChange={(e) => setFormData({ ...formData, therapyOngoing: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span>Therapy is ongoing</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Product Name *</label>
                        <input
                          type="text"
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          placeholder="e.g., Cisplatin, Doxorubicin"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Manufacturer</label>
                        <input
                          type="text"
                          value={formData.manufacturer}
                          onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                          placeholder="Manufacturer name"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Product Type */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-3">Product Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            'Drug or Biologic',
                            'Brand',
                            'Generic',
                            'OTC',
                            'Compounded',
                            'CBD',
                            'Other'
                          ].map(option => (
                            <label key={option} className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.productTypes.includes(option)}
                                onChange={() => toggleArrayField('productTypes', option)}
                                className="w-5 h-5 text-blue-600 rounded"
                              />
                              <span className="text-slate-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Product Identifiers */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Expiration Date</label>
                          <input
                            type="date"
                            value={formData.expiration}
                            onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Lot #</label>
                          <input
                            type="text"
                            value={formData.lot}
                            onChange={(e) => setFormData({ ...formData, lot: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">NDC #</label>
                          <input
                            type="text"
                            value={formData.ndc}
                            onChange={(e) => setFormData({ ...formData, ndc: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Dosage Information */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Strength/Dose</label>
                          <input
                            type="text"
                            value={formData.strength}
                            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                            placeholder="e.g., 50"
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Unit</label>
                          <input
                            type="text"
                            value={formData.unit}
                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                            placeholder="mg, mL, IU"
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Quantity</label>
                          <input
                            type="text"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Frequency</label>
                          <input
                            type="text"
                            value={formData.frequency}
                            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                            placeholder="e.g., Once daily, BID"
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Route of Administration</label>
                          <input
                            type="text"
                            value={formData.routeOfAdmin}
                            onChange={(e) => setFormData({ ...formData, routeOfAdmin: e.target.value })}
                            placeholder="Oral, IV, IM, etc."
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Therapy Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Therapy Start Date</label>
                          <input
                            type="date"
                            value={formData.therapyStartDate}
                            onChange={(e) => setFormData({ ...formData, therapyStartDate: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Therapy End Date</label>
                          <input
                            type="date"
                            value={formData.therapyEndDate}
                            onChange={(e) => setFormData({ ...formData, therapyEndDate: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Last Dose Date</label>
                          <input
                            type="date"
                            value={formData.lastDoseDate}
                            onChange={(e) => setFormData({ ...formData, lastDoseDate: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Purchase Information */}
                      <div className="border-t-2 pt-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Place of Purchase (if applicable)</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-slate-700 font-bold mb-2">Place Name</label>
                            <input
                              type="text"
                              value={formData.purchasePlace}
                              onChange={(e) => setFormData({ ...formData, purchasePlace: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-700 font-bold mb-2">Country</label>
                              <input
                                type="text"
                                value={formData.purchaseCountry}
                                onChange={(e) => setFormData({ ...formData, purchaseCountry: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-bold mb-2">Purchase Date</label>
                              <input
                                type="date"
                                value={formData.purchaseDate}
                                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-2">Address</label>
                            <input
                              type="text"
                              value={formData.purchaseAddress}
                              onChange={(e) => setFormData({ ...formData, purchaseAddress: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-700 font-bold mb-2">Website</label>
                            <input
                              type="text"
                              value={formData.purchaseWebsite}
                              onChange={(e) => setFormData({ ...formData, purchaseWebsite: e.target.value })}
                              placeholder="https://"
                              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: PATIENT */}
                {currentStep === 4 && (
                  <motion.div
                    key="patient"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About Patient</h2>
                    <p className="text-sm text-gray-500 mb-8">Patient demographic and medical information</p>

                    <div className="space-y-6">
                      {/* Basic Demographics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Patient Initials</label>
                          <input
                            type="text"
                            value={formData.patientInitials}
                            onChange={(e) => setFormData({ ...formData, patientInitials: e.target.value })}
                            placeholder="e.g., AB"
                            maxLength={3}
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

                      {/* Age or DOB */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Age</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={formData.patientAge}
                              onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                              placeholder="Age"
                              className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                              value={formData.patientAgeUnit}
                              onChange={(e) => setFormData({ ...formData, patientAgeUnit: e.target.value })}
                              className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="years">Years</option>
                              <option value="months">Months</option>
                              <option value="weeks">Weeks</option>
                              <option value="days">Days</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">OR Date of Birth</label>
                          <input
                            type="date"
                            value={formData.patientDOB}
                            onChange={(e) => setFormData({ ...formData, patientDOB: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Weight</label>
                        <div className="flex gap-2 max-w-md">
                          <input
                            type="number"
                            value={formData.patientWeight}
                            onChange={(e) => setFormData({ ...formData, patientWeight: e.target.value })}
                            placeholder="Weight"
                            className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            value={formData.patientWeightUnit}
                            onChange={(e) => setFormData({ ...formData, patientWeightUnit: e.target.value })}
                            className="px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                          </select>
                        </div>
                      </div>

                      {/* Race/Ethnicity */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-3">Race/Ethnicity (select all that apply)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            'American Indian or Alaska Native',
                            'Asian',
                            'Black or African American',
                            'Hispanic or Latino',
                            'Native Hawaiian or Other Pacific Islander',
                            'White',
                            'Other'
                          ].map(option => (
                            <label key={option} className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.patientRace.includes(option)}
                                onChange={() => toggleArrayField('patientRace', option)}
                                className="w-5 h-5 text-blue-600 rounded"
                              />
                              <span className="text-slate-700 text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Medical History */}
                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Known Medical Conditions
                        </label>
                        <textarea
                          value={formData.medicalConditions}
                          onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                          placeholder="List any relevant medical conditions..."
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Known Allergies
                        </label>
                        <textarea
                          value={formData.allergies}
                          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                          placeholder="List any known allergies..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Other Important Information
                        </label>
                        <textarea
                          value={formData.otherInfo}
                          onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
                          placeholder="Any other relevant patient information..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Current Medications
                        </label>
                        <textarea
                          value={formData.currentMedications}
                          onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                          placeholder="List all current prescription medications..."
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          OTC Medications & Supplements
                        </label>
                        <textarea
                          value={formData.otcSupplements}
                          onChange={(e) => setFormData({ ...formData, otcSupplements: e.target.value })}
                          placeholder="List all over-the-counter medications and supplements..."
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: REPORTER */}
                {currentStep === 5 && (
                  <motion.div
                    key="reporter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">About Reporter</h2>
                    <p className="text-sm text-gray-500 mb-8">Contact information for follow-up</p>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">First Name *</label>
                          <input
                            type="text"
                            value={formData.reporterFirstName}
                            onChange={(e) => setFormData({ ...formData, reporterFirstName: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-bold mb-2">Last Name *</label>
                          <input
                            type="text"
                            value={formData.reporterLastName}
                            onChange={(e) => setFormData({ ...formData, reporterLastName: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Country</label>
                        <input
                          type="text"
                          value={formData.reporterCountry}
                          onChange={(e) => setFormData({ ...formData, reporterCountry: e.target.value })}
                          placeholder="Rwanda"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Street Address</label>
                        <input
                          type="text"
                          value={formData.reporterStreet}
                          onChange={(e) => setFormData({ ...formData, reporterStreet: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">City</label>
                        <input
                          type="text"
                          value={formData.reporterCity}
                          onChange={(e) => setFormData({ ...formData, reporterCity: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.reporterPhone}
                          onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                          placeholder="+250 xxx xxx xxx"
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Email *</label>
                        <input
                          type="email"
                          value={formData.reporterEmail}
                          onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">Confirm Email *</label>
                        <input
                          type="email"
                          value={formData.reporterEmailConfirm}
                          onChange={(e) => setFormData({ ...formData, reporterEmailConfirm: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-2">
                          Have you reported this to the manufacturer?
                        </label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setFormData({ ...formData, reportedToManufacturer: 'Yes' })}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                              formData.reportedToManufacturer === 'Yes'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setFormData({ ...formData, reportedToManufacturer: 'No' })}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                              formData.reportedToManufacturer === 'No'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-slate-700 font-medium">
                          <input
                            type="checkbox"
                            checked={formData.doNotDisclose}
                            onChange={(e) => setFormData({ ...formData, doNotDisclose: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span>Do NOT disclose my identity to the manufacturer</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: REVIEW & SUBMIT */}
                {currentStep === 6 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8"
                  >
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Review & Submit</h2>
                    <p className="text-sm text-gray-500 mb-8">Please review all information before submitting</p>

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
                          {formData.outcomes.length > 0 && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Outcomes:</span> {formData.outcomes.join(', ')}
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
                          {formData.labTests.length > 0 && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Lab Tests:</span> {formData.labTests.length} test(s) recorded
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
                            {formData.strength && (
                              <p className="text-slate-700">
                                <span className="font-semibold">Strength:</span> {formData.strength} {formData.unit}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Device Summary */}
                      {formData.deviceName && (
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-purple-900 mb-3">About Device</h3>
                          <div className="space-y-2 text-sm">
                            <p className="text-slate-700">
                              <span className="font-semibold">Device:</span> {formData.deviceName}
                            </p>
                            {formData.modelNumber && (
                              <p className="text-slate-700">
                                <span className="font-semibold">Model:</span> {formData.modelNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Patient Summary */}
                      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">About Patient</h3>
                        <div className="space-y-2 text-sm">
                          {formData.patientInitials && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Initials:</span> {formData.patientInitials}
                            </p>
                          )}
                          {formData.patientSex && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Sex:</span> {formData.patientSex}
                            </p>
                          )}
                          {formData.patientAge && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Age:</span> {formData.patientAge} {formData.patientAgeUnit}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Reporter Summary */}
                      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-orange-900 mb-3">About Reporter</h3>
                        <div className="space-y-2 text-sm">
                          {formData.reporterFirstName && formData.reporterLastName && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Name:</span> {formData.reporterFirstName} {formData.reporterLastName}
                            </p>
                          )}
                          {formData.reporterEmail && (
                            <p className="text-slate-700">
                              <span className="font-semibold">Email:</span> {formData.reporterEmail}
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
                
                {currentStep < 6 ? (
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
      {currentStep === 7 && (
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
              The adverse event report has been submitted to the Rwanda FDA system.
            </p>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
              <h3 className="font-bold text-lg text-slate-800 mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Report Processing</p>
                    <p className="text-sm text-slate-600">The report will be reviewed and processed by the pharmacovigilance team</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Safety Signal Analysis</p>
                    <p className="text-sm text-slate-600">The event will be evaluated for potential safety signals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Follow-up (if needed)</p>
                    <p className="text-sm text-slate-600">You may be contacted for additional information</p>
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
                    outcomes: [],
                    problemDate: '',
                    problemDescription: '',
                    labTests: [],
                    causeType: '',
                    hasProduct: '',
                    hasPictures: '',
                    deviceName: '',
                    modelNumber: '',
                    catalogNumber: '',
                    lotNumber: '',
                    serialNumber: '',
                    udiNumber: '',
                    deviceExpiration: '',
                    operatorInvolved: '',
                    deviceImplanted: '',
                    implantDate: '',
                    explantDate: '',
                    therapyOngoing: false,
                    productName: '',
                    manufacturer: '',
                    productTypes: [],
                    cosmeticUse: '',
                    expiration: '',
                    lot: '',
                    ndc: '',
                    strength: '',
                    unit: '',
                    quantity: '',
                    frequency: '',
                    routeOfAdmin: '',
                    purchasePlace: '',
                    purchaseCountry: '',
                    purchaseAddress: '',
                    purchaseWebsite: '',
                    purchaseDate: '',
                    therapyStartDate: '',
                    therapyEndDate: '',
                    lastDoseDate: '',
                    patientInitials: '',
                    patientSex: '',
                    patientAge: '',
                    patientAgeUnit: 'years',
                    patientDOB: '',
                    patientWeight: '',
                    patientWeightUnit: 'kg',
                    patientRace: [],
                    medicalConditions: '',
                    allergies: '',
                    otherInfo: '',
                    currentMedications: '',
                    otcSupplements: '',
                    reporterFirstName: '',
                    reporterLastName: '',
                    reporterCountry: '',
                    reporterStreet: '',
                    reporterCity: '',
                    reporterPhone: '',
                    reporterEmail: '',
                    reporterEmailConfirm: '',
                    reportedToManufacturer: '',
                    doNotDisclose: false
                  });
                }}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Submit Another Report
              </button>
              <button
                onClick={() => onNavigate('ClinicianDashboard')}
                className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
