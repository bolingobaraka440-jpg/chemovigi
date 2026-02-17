import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, User, Weight, Ruler, Calendar, AlertCircle, CheckCircle, Info, Pill, Activity } from 'lucide-react';

interface DosageResult {
  drugName: string;
  recommendedDose: string;
  frequency: string;
  warnings: string[];
  notes: string;
}

export function DosageCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    weight: '',
    height: '',
    drugName: ''
  });
  
  const [result, setResult] = useState<DosageResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Common drugs database (simplified for demo)
  const drugDatabase: { [key: string]: any } = {
    'doxorubicin': {
      name: 'Doxorubicin',
      baseAdultDose: 60, // mg/m²
      adjustments: {
        elderly: 0.75, // 75% dose for age > 65
        renal: 0.75,
        hepatic: 0.5
      },
      frequency: 'Every 21 days',
      warnings: [
        'Cardiotoxic - monitor cardiac function',
        'Reduce dose in hepatic impairment',
        'Risk of severe myelosuppression'
      ]
    },
    'paclitaxel': {
      name: 'Paclitaxel',
      baseAdultDose: 175, // mg/m²
      adjustments: {
        elderly: 0.85,
        renal: 1.0,
        hepatic: 0.75
      },
      frequency: 'Every 21 days',
      warnings: [
        'Premedicate to prevent hypersensitivity',
        'Monitor for peripheral neuropathy',
        'Adjust dose for neutropenia'
      ]
    },
    'cisplatin': {
      name: 'Cisplatin',
      baseAdultDose: 75, // mg/m²
      adjustments: {
        elderly: 0.75,
        renal: 0.5,
        hepatic: 1.0
      },
      frequency: 'Every 21 days',
      warnings: [
        'Highly nephrotoxic - ensure adequate hydration',
        'Contraindicated in severe renal impairment',
        'Monitor renal function and electrolytes'
      ]
    },
    'methotrexate': {
      name: 'Methotrexate',
      baseAdultDose: 20, // mg/m²
      adjustments: {
        elderly: 0.8,
        renal: 0.5,
        hepatic: 0.75
      },
      frequency: 'Weekly',
      warnings: [
        'Folic acid supplementation required',
        'Monitor liver and kidney function',
        'Reduce dose in renal impairment'
      ]
    }
  };

  // Calculate Body Surface Area (BSA) using Mosteller formula
  const calculateBSA = (weight: number, height: number): number => {
    return Math.sqrt((weight * height) / 3600);
  };

  const calculateDosage = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const drugKey = formData.drugName.toLowerCase();

    if (!age || !weight || !height || !drugKey) {
      return;
    }

    const drug = drugDatabase[drugKey];
    if (!drug) {
      setResult({
        drugName: formData.drugName,
        recommendedDose: 'Drug not found in database',
        frequency: 'N/A',
        warnings: ['Please consult a physician for this medication'],
        notes: 'This drug is not in our current database. Always consult with a healthcare professional.'
      });
      setShowResult(true);
      return;
    }

    // Calculate BSA
    const bsa = calculateBSA(weight, height);
    
    // Base dose calculation
    let dose = drug.baseAdultDose * bsa;

    // Age adjustments
    if (age > 65) {
      dose *= drug.adjustments.elderly;
    }
    if (age < 18) {
      dose *= 0.9; // Conservative approach for pediatric
    }

    // Sex-based adjustments (simplified)
    if (formData.sex === 'female') {
      dose *= 0.95; // Slight reduction for females (general guideline)
    }

    // Create result
    const dosageResult: DosageResult = {
      drugName: drug.name,
      recommendedDose: `${dose.toFixed(1)} mg (${drug.baseAdultDose} mg/m² × ${bsa.toFixed(2)} m²)`,
      frequency: drug.frequency,
      warnings: drug.warnings,
      notes: `Calculated for: ${age} year old ${formData.sex}, ${weight}kg, ${height}cm (BSA: ${bsa.toFixed(2)} m²)`
    };

    setResult(dosageResult);
    setShowResult(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Personalized Dosage Calculator</h3>
              <p className="text-sm text-white/80">Calculate safe, individualized medication doses</p>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/90">
                This calculator provides estimated dosages based on patient parameters. 
                <strong className="block mt-1">Always consult with a qualified healthcare professional before administering medication.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Drug Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Pill className="w-4 h-4 inline mr-2" />
                Drug Name
              </label>
              <input
                type="text"
                value={formData.drugName}
                onChange={(e) => handleInputChange('drugName', e.target.value)}
                placeholder="e.g., Doxorubicin, Paclitaxel, Cisplatin, Methotrexate"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">Available: Doxorubicin, Paclitaxel, Cisplatin, Methotrexate</p>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Age (years)
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter age"
                min="1"
                max="120"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sex */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Sex
              </label>
              <select
                value={formData.sex}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Weight className="w-4 h-4 inline mr-2" />
                Weight (kg)
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="Enter weight"
                min="1"
                max="500"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Ruler className="w-4 h-4 inline mr-2" />
                Height (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="Enter height"
                min="1"
                max="300"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <motion.button
            onClick={calculateDosage}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5" />
            Calculate Recommended Dosage
          </motion.button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-200 bg-gradient-to-br from-blue-50 to-teal-50"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">Dosage Recommendation</h4>
                    <p className="text-sm text-slate-600">{result.drugName}</p>
                  </div>
                </div>

                {/* Dosage Info */}
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Recommended Dose</p>
                      <p className="text-2xl font-bold text-blue-600">{result.recommendedDose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Frequency</p>
                      <p className="text-2xl font-bold text-teal-600">{result.frequency}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">{result.notes}</p>
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-yellow-800 mb-2">Important Warnings</p>
                        <ul className="space-y-1">
                          {result.warnings.map((warning, idx) => (
                            <li key={idx} className="text-sm text-yellow-800 flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>⚠️ Medical Disclaimer:</strong> This is a computational tool only. 
                    Final dosing decisions must be made by qualified healthcare professionals considering 
                    the complete clinical picture, contraindications, drug interactions, and patient-specific factors.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
