import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Pill, AlertTriangle, Thermometer, Clock, ShieldCheck, BookOpen } from 'lucide-react';

export function DrugStandardizationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);

  // Mock drug database
  const drugDatabase = [
    {
      name: 'Doxorubicin',
      category: 'Chemotherapy - Anthracycline',
      usage: 'Treatment of various cancers including breast cancer, bladder cancer, and lymphoma',
      dosage: 'IV infusion: 60-75 mg/m² every 21 days (varies by protocol)',
      storage: 'Store at 2-8°C (36-46°F). Protect from light. Do not freeze.',
      handling: 'Cytotoxic drug - requires special handling. Healthcare professionals must wear protective equipment.',
      afterOpening: 'Use immediately after reconstitution. Discard unused portion.',
      warnings: [
        'Can cause severe heart damage (cardiotoxicity)',
        'May cause severe bone marrow suppression',
        'Extravasation can cause severe tissue damage',
        'Urine may turn red for 1-2 days (normal)'
      ],
      sideEffects: 'Nausea, vomiting, hair loss, mouth sores, fatigue, increased infection risk'
    },
    {
      name: 'Cyclophosphamide',
      category: 'Chemotherapy - Alkylating Agent',
      usage: 'Treatment of lymphomas, leukemias, breast cancer, and autoimmune conditions',
      dosage: 'Oral: 50-200 mg/day; IV: 500-1500 mg/m² (protocol dependent)',
      storage: 'Store tablets at room temperature (20-25°C). Protect from moisture.',
      handling: 'Cytotoxic - wear gloves when handling tablets',
      afterOpening: 'Tablets: Use within 30 days of opening. IV solution: Use within 24 hours.',
      warnings: [
        'May cause bladder toxicity (hemorrhagic cystitis)',
        'Drink plenty of fluids to protect bladder',
        'Can suppress immune system',
        'May affect fertility'
      ],
      sideEffects: 'Hair loss, nausea, vomiting, decreased blood counts, bladder irritation'
    },
    {
      name: 'Paclitaxel (Taxol)',
      category: 'Chemotherapy - Taxane',
      usage: 'Treatment of ovarian, breast, and lung cancers',
      dosage: 'IV infusion: 135-175 mg/m² over 3 hours every 3 weeks',
      storage: 'Store at 20-25°C. Do not refrigerate. Protect from light.',
      handling: 'Requires non-PVC containers and tubing. Use in-line filter.',
      afterOpening: 'Diluted solution stable for 27 hours at room temperature',
      warnings: [
        'Severe allergic reactions possible - premedication required',
        'Can cause severe nerve damage (neuropathy)',
        'May cause severe drop in blood counts',
        'Do not use if pregnant'
      ],
      sideEffects: 'Hair loss, nerve pain, muscle aches, nausea, low blood counts'
    },
    {
      name: 'Ondansetron (Zofran)',
      category: 'Anti-nausea - 5-HT3 Antagonist',
      usage: 'Prevention of nausea and vomiting caused by chemotherapy',
      dosage: 'Oral: 8 mg twice daily; IV: 8-32 mg before chemotherapy',
      storage: 'Store at room temperature (20-25°C). Protect from light.',
      handling: 'Standard precautions. Not cytotoxic.',
      afterOpening: 'Oral tablets: Stable in original packaging. IV: Single-use vials.',
      warnings: [
        'May cause irregular heartbeat (QT prolongation)',
        'Use caution in patients with heart conditions',
        'May cause constipation',
        'Can interact with other medications'
      ],
      sideEffects: 'Headache, constipation, dizziness, fatigue'
    },
    {
      name: 'Methotrexate',
      category: 'Chemotherapy - Antimetabolite',
      usage: 'Treatment of leukemia, lymphoma, and autoimmune diseases',
      dosage: 'Varies widely: 7.5-30 mg/week (low dose) to 1-12 g/m² (high dose)',
      storage: 'Store at room temperature. Protect from light.',
      handling: 'Cytotoxic - wear gloves. Avoid during pregnancy.',
      afterOpening: 'Tablets: Original packaging. IV: Use within 24 hours if diluted.',
      warnings: [
        'Can cause severe liver damage',
        'May cause severe kidney damage at high doses',
        'Folic acid supplementation required',
        'Avoid alcohol consumption'
      ],
      sideEffects: 'Mouth sores, nausea, fatigue, low blood counts, liver function changes'
    }
  ];

  const filteredDrugs = searchQuery
    ? drugDatabase.filter(drug =>
        drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : drugDatabase;

  const currentDrug = selectedDrug
    ? drugDatabase.find(d => d.name === selectedDrug)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl mb-6">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Drug Standardization & Information
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Access standardized drug information including proper usage, storage guidelines, safety warnings, 
            and handling instructions. <strong>No login required - educational resource for everyone.</strong>
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a drug (e.g., Doxorubicin, Paclitaxel, Methotrexate)..."
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Drug List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4">
                <h3 className="text-white font-semibold">Available Drugs ({filteredDrugs.length})</h3>
              </div>
              <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                {filteredDrugs.map((drug) => (
                  <button
                    key={drug.name}
                    onClick={() => setSelectedDrug(drug.name)}
                    className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${
                      selectedDrug === drug.name ? 'bg-blue-100 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <p className="font-semibold text-slate-800">{drug.name}</p>
                    <p className="text-sm text-slate-600">{drug.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Drug Details */}
          <div className="lg:col-span-2">
            {currentDrug ? (
              <motion.div
                key={currentDrug.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{currentDrug.name}</h2>
                  <p className="text-blue-100">{currentDrug.category}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Usage */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-slate-800">Proper Usage</h3>
                    </div>
                    <p className="text-slate-700 bg-blue-50 p-4 rounded-lg">{currentDrug.usage}</p>
                  </div>

                  {/* Dosage */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-slate-800">Standard Dosage</h3>
                    </div>
                    <p className="text-slate-700 bg-purple-50 p-4 rounded-lg">{currentDrug.dosage}</p>
                  </div>

                  {/* Storage */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Thermometer className="w-5 h-5 text-teal-600" />
                      <h3 className="font-semibold text-slate-800">Storage Guidelines</h3>
                    </div>
                    <p className="text-slate-700 bg-teal-50 p-4 rounded-lg">{currentDrug.storage}</p>
                  </div>

                  {/* Handling */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-slate-800">Handling Instructions</h3>
                    </div>
                    <p className="text-slate-700 bg-green-50 p-4 rounded-lg">{currentDrug.handling}</p>
                  </div>

                  {/* After Opening */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <h3 className="font-semibold text-slate-800">After Opening</h3>
                    </div>
                    <p className="text-slate-700 bg-orange-50 p-4 rounded-lg">{currentDrug.afterOpening}</p>
                  </div>

                  {/* Safety Warnings */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-slate-800">Safety Warnings</h3>
                    </div>
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {currentDrug.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-700">
                            <span className="text-red-600 font-bold">⚠️</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Common Side Effects */}
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Common Side Effects</h3>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
                      {currentDrug.sideEffects}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                      <strong>Medical Disclaimer:</strong> This information is for educational purposes only. 
                      Always consult with qualified healthcare professionals before starting, stopping, or changing any medication. 
                      Dosages and protocols may vary based on individual patient needs.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
                <Pill className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Select a Drug</h3>
                <p className="text-slate-500">
                  Choose a drug from the list to view detailed information, usage guidelines, and safety warnings.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <p className="text-slate-700">
            <strong>💡 Did you know?</strong> Proper drug storage and handling can significantly reduce adverse events. 
            This database is continuously updated with the latest pharmacovigilance guidelines.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
