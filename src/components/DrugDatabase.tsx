import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Pill, AlertCircle, Info, Calculator, ChevronDown, ChevronUp, FileText, Shield, Thermometer } from 'lucide-react';

// Expanded drug database
export interface DrugInfo {
  id: string;
  name: string;
  genericName?: string;
  category: string;
  description: string;
  usedFor: string[];
  sideEffects: string[];
  warnings: string[];
  dosageInfo: {
    adult: string;
    child: string;
    elderly: string;
    byWeight?: string;
  };
  storage: string;
  interactions: string[];
}

const DRUG_DATABASE: DrugInfo[] = [
  {
    id: '1',
    name: 'Doxorubicin',
    genericName: 'Adriamycin',
    category: 'Chemotherapy - Anthracycline',
    description: 'An anthracycline antibiotic used to treat various cancers including breast cancer, bladder cancer, Kaposi\'s sarcoma, lymphoma, and acute lymphocytic leukemia.',
    usedFor: ['Breast cancer', 'Bladder cancer', 'Lymphoma', 'Leukemia', 'Sarcoma'],
    sideEffects: ['Nausea and vomiting', 'Hair loss', 'Mouth sores', 'Fatigue', 'Low blood counts', 'Red urine (temporary)'],
    warnings: ['Can cause heart damage with cumulative doses', 'May cause severe tissue damage if leaked during injection', 'Avoid pregnancy during treatment'],
    dosageInfo: {
      adult: '60-75 mg/m² IV every 21 days',
      child: '35-75 mg/m² IV (varies by protocol)',
      elderly: 'Reduced dose: 40-60 mg/m² IV',
      byWeight: 'Based on body surface area (BSA) calculation'
    },
    storage: 'Store at 2-8°C. Protect from light. Use within 24 hours after reconstitution.',
    interactions: ['Avoid live vaccines', 'May interact with other cardiotoxic drugs', 'Cyclosporine increases doxorubicin levels']
  },
  {
    id: '2',
    name: 'Paclitaxel',
    genericName: 'Taxol',
    category: 'Chemotherapy - Taxane',
    description: 'A taxane chemotherapy drug used to treat ovarian, breast, lung, and other cancers by stopping cell division.',
    usedFor: ['Breast cancer', 'Ovarian cancer', 'Lung cancer', 'Kaposi\'s sarcoma', 'Pancreatic cancer'],
    sideEffects: ['Allergic reactions', 'Neuropathy (nerve damage)', 'Low blood counts', 'Hair loss', 'Muscle/joint pain', 'Nausea'],
    warnings: ['Severe allergic reactions possible - premedication required', 'Can cause severe neuropathy', 'Monitor blood counts closely'],
    dosageInfo: {
      adult: '135-175 mg/m² IV over 3 hours every 3 weeks',
      child: 'Not typically used in children',
      elderly: 'Standard dose with close monitoring',
      byWeight: 'Calculated based on body surface area'
    },
    storage: 'Store at 20-25°C. Protect from light. Diluted solutions stable for 27 hours.',
    interactions: ['CYP3A4 inhibitors increase toxicity', 'Avoid with other neurotoxic drugs', 'May interact with warfarin']
  },
  {
    id: '3',
    name: 'Cisplatin',
    genericName: 'Platinol',
    category: 'Chemotherapy - Platinum compound',
    description: 'A platinum-based chemotherapy drug effective against testicular, ovarian, bladder, and other solid tumors.',
    usedFor: ['Testicular cancer', 'Ovarian cancer', 'Bladder cancer', 'Lung cancer', 'Head and neck cancer'],
    sideEffects: ['Severe nausea/vomiting', 'Kidney damage', 'Hearing loss', 'Neuropathy', 'Low blood counts'],
    warnings: ['Requires aggressive hydration', 'Monitor kidney function', 'Can cause permanent hearing loss', 'Avoid in pregnancy'],
    dosageInfo: {
      adult: '50-100 mg/m² IV every 3-4 weeks',
      child: '60-100 mg/m² (protocol dependent)',
      elderly: 'Reduced dose: 30-50 mg/m² with caution',
      byWeight: 'BSA-based dosing with renal function adjustments'
    },
    storage: 'Store at 15-25°C. Protect from light. Do not refrigerate.',
    interactions: ['Nephrotoxic drugs increase kidney damage risk', 'Phenytoin levels may decrease', 'Avoid with ototoxic drugs']
  },
  {
    id: '4',
    name: 'Methotrexate',
    genericName: 'MTX',
    category: 'Chemotherapy - Antimetabolite',
    description: 'An antimetabolite used for cancer treatment and autoimmune diseases. Blocks folic acid metabolism to stop cell growth.',
    usedFor: ['Breast cancer', 'Leukemia', 'Lymphoma', 'Osteosarcoma', 'Rheumatoid arthritis'],
    sideEffects: ['Mouth sores', 'Nausea', 'Low blood counts', 'Liver toxicity', 'Kidney damage', 'Fatigue'],
    warnings: ['Requires folic acid supplementation', 'Monitor liver and kidney function', 'Avoid alcohol', 'Highly teratogenic'],
    dosageInfo: {
      adult: '20-3000 mg/m² (dose varies widely by indication)',
      child: '7.5-30 mg/m² weekly for rheumatoid conditions',
      elderly: 'Start with lower doses',
      byWeight: 'High-dose regimens require leucovorin rescue'
    },
    storage: 'Store at 20-25°C. Protect from light. Stable at room temperature.',
    interactions: ['NSAIDs increase toxicity', 'Avoid with proton pump inhibitors', 'Penicillins may increase methotrexate levels']
  },
  {
    id: '5',
    name: 'Cyclophosphamide',
    genericName: 'Cytoxan',
    category: 'Chemotherapy - Alkylating agent',
    description: 'An alkylating agent used for various cancers and autoimmune diseases. Works by damaging DNA in rapidly dividing cells.',
    usedFor: ['Lymphoma', 'Leukemia', 'Breast cancer', 'Ovarian cancer', 'Lupus', 'Multiple myeloma'],
    sideEffects: ['Nausea/vomiting', 'Hair loss', 'Low blood counts', 'Bladder irritation', 'Infertility risk', 'Fatigue'],
    warnings: ['Drink plenty of fluids to prevent bladder damage', 'May cause hemorrhagic cystitis', 'Increased infection risk'],
    dosageInfo: {
      adult: '500-1500 mg/m² IV (varies by protocol)',
      child: '500-750 mg/m² (protocol dependent)',
      elderly: 'Adjust dose based on renal function',
      byWeight: 'Alternative: 10-20 mg/kg for high-dose therapy'
    },
    storage: 'Store at 25°C. Reconstituted solutions stable for 24 hours at room temperature.',
    interactions: ['Allopurinol may increase toxicity', 'Avoid with other immunosuppressants', 'May enhance warfarin effect']
  },
  {
    id: '6',
    name: '5-Fluorouracil (5-FU)',
    genericName: 'Adrucil',
    category: 'Chemotherapy - Antimetabolite',
    description: 'A pyrimidine analog used to treat colorectal, breast, stomach, and pancreatic cancers by interfering with DNA synthesis.',
    usedFor: ['Colorectal cancer', 'Breast cancer', 'Stomach cancer', 'Pancreatic cancer', 'Head and neck cancer'],
    sideEffects: ['Diarrhea', 'Mouth sores', 'Hand-foot syndrome', 'Low blood counts', 'Nausea', 'Hair thinning'],
    warnings: ['DPD deficiency can cause severe toxicity', 'Monitor for cardiac symptoms', 'Photosensitivity - use sunscreen'],
    dosageInfo: {
      adult: '400-600 mg/m² IV (bolus) or continuous infusion',
      child: 'Rarely used; dose determined by protocol',
      elderly: 'Standard dose with monitoring',
      byWeight: 'Often combined with leucovorin (FOLFOX/FOLFIRI regimens)'
    },
    storage: 'Store at 20-25°C. Protect from light. Discard if color changes.',
    interactions: ['Leucovorin enhances toxicity and efficacy', 'Warfarin levels may increase', 'Avoid with live vaccines']
  },
  {
    id: '7',
    name: 'Carboplatin',
    genericName: 'Paraplatin',
    category: 'Chemotherapy - Platinum compound',
    description: 'A platinum-based chemotherapy similar to cisplatin but with fewer side effects. Used for ovarian and lung cancers.',
    usedFor: ['Ovarian cancer', 'Lung cancer', 'Head and neck cancer', 'Testicular cancer', 'Bladder cancer'],
    sideEffects: ['Low blood counts', 'Nausea/vomiting', 'Fatigue', 'Neuropathy (less than cisplatin)', 'Allergic reactions'],
    warnings: ['Risk of severe bone marrow suppression', 'Monitor blood counts', 'Allergic reactions more common with repeated use'],
    dosageInfo: {
      adult: 'AUC 5-7 (Calvert formula based on GFR)',
      child: '500-600 mg/m² IV',
      elderly: 'Dose based on renal function (Calvert formula)',
      byWeight: 'Calculated using Calvert formula: Dose = AUC × (GFR + 25)'
    },
    storage: 'Store at 25°C. Protect from light. Reconstituted solutions stable for 8 hours.',
    interactions: ['Nephrotoxic drugs increase kidney risk', 'Aminoglycosides increase ototoxicity', 'Phenytoin levels may decrease']
  },
  {
    id: '8',
    name: 'Gemcitabine',
    genericName: 'Gemzar',
    category: 'Chemotherapy - Antimetabolite',
    description: 'A nucleoside analog used primarily for pancreatic, lung, breast, and ovarian cancers.',
    usedFor: ['Pancreatic cancer', 'Non-small cell lung cancer', 'Breast cancer', 'Ovarian cancer', 'Bladder cancer'],
    sideEffects: ['Flu-like symptoms', 'Low blood counts', 'Nausea', 'Rash', 'Edema', 'Liver enzyme elevation'],
    warnings: ['Can cause pulmonary toxicity', 'Monitor liver and kidney function', 'Reduce dose in hepatic impairment'],
    dosageInfo: {
      adult: '1000-1250 mg/m² IV weekly for 3 weeks, then 1 week rest',
      child: 'Limited data; 1000 mg/m² when used',
      elderly: 'Standard dose with close monitoring',
      byWeight: 'Fixed dose rate infusion: 10 mg/m²/min'
    },
    storage: 'Store at 20-25°C. Reconstituted solutions stable for 24 hours at room temperature.',
    interactions: ['Radiation therapy may increase lung toxicity', 'May potentiate other myelosuppressive agents']
  },
  {
    id: '9',
    name: 'Vincristine',
    genericName: 'Oncovin',
    category: 'Chemotherapy - Vinca alkaloid',
    description: 'A plant alkaloid that stops cell division by disrupting microtubule formation. Used in leukemia and lymphoma.',
    usedFor: ['Acute lymphoblastic leukemia', 'Lymphoma', 'Neuroblastoma', 'Wilms tumor', 'Multiple myeloma'],
    sideEffects: ['Neuropathy', 'Constipation', 'Hair loss', 'Low blood counts', 'Jaw pain', 'SIADH'],
    warnings: ['MUST BE GIVEN IV ONLY - FATAL IF GIVEN INTRATHECALLY', 'Severe neurotoxicity', 'Dose capped at 2 mg'],
    dosageInfo: {
      adult: '1.4 mg/m² IV (max 2 mg per dose)',
      child: '1.5-2 mg/m² IV (max 2 mg)',
      elderly: 'Standard dose but increased neuropathy risk',
      byWeight: 'Dose capped regardless of BSA'
    },
    storage: 'Store at 2-8°C. Protect from light. Stable for 30 days refrigerated.',
    interactions: ['CYP3A4 inhibitors increase toxicity', 'Itraconazole may increase neurotoxicity', 'Avoid with other neurotoxic drugs']
  },
  {
    id: '10',
    name: 'Rituximab',
    genericName: 'Rituxan',
    category: 'Immunotherapy - Monoclonal antibody',
    description: 'A monoclonal antibody targeting CD20 on B-cells. Used for lymphomas and autoimmune diseases.',
    usedFor: ['Non-Hodgkin lymphoma', 'Chronic lymphocytic leukemia', 'Rheumatoid arthritis', 'Granulomatosis with polyangiitis'],
    sideEffects: ['Infusion reactions', 'Low blood counts', 'Fatigue', 'Increased infection risk', 'Nausea'],
    warnings: ['Severe infusion reactions possible', 'Risk of hepatitis B reactivation', 'Progressive multifocal leukoencephalopathy (rare)'],
    dosageInfo: {
      adult: '375 mg/m² IV weekly × 4-8 doses (NHL) or 500-1000 mg IV (RA)',
      child: '375 mg/m² (limited pediatric data)',
      elderly: 'Standard dose with close monitoring',
      byWeight: 'Fixed dosing for some indications'
    },
    storage: 'Store at 2-8°C. Do not freeze. Protect from light. Diluted solutions stable for 24 hours.',
    interactions: ['Avoid live vaccines', 'May reduce effectiveness of vaccines', 'Screen for hepatitis B before starting']
  },
  {
    id: '11',
    name: 'Imatinib',
    genericName: 'Gleevec',
    category: 'Targeted Therapy - Tyrosine kinase inhibitor',
    description: 'A targeted therapy that blocks specific proteins causing cancer cell growth, mainly for chronic myeloid leukemia.',
    usedFor: ['Chronic myeloid leukemia', 'Gastrointestinal stromal tumors (GIST)', 'Acute lymphoblastic leukemia'],
    sideEffects: ['Fluid retention/edema', 'Nausea', 'Muscle cramps', 'Diarrhea', 'Rash', 'Fatigue'],
    warnings: ['Can cause liver toxicity', 'Monitor liver function', 'May cause congestive heart failure', 'Avoid grapefruit juice'],
    dosageInfo: {
      adult: '400-600 mg PO daily (CML) or 400 mg PO daily (GIST)',
      child: '260-340 mg/m² PO daily',
      elderly: 'Standard dose; monitor closely',
      byWeight: 'Take with food and large glass of water'
    },
    storage: 'Store at 25°C. Protect from moisture.',
    interactions: ['CYP3A4 inhibitors increase levels', 'St. John\'s Wort decreases levels', 'May increase warfarin effect']
  },
  {
    id: '12',
    name: 'Tamoxifen',
    genericName: 'Nolvadex',
    category: 'Hormone Therapy - SERM',
    description: 'A selective estrogen receptor modulator used to treat and prevent hormone receptor-positive breast cancer.',
    usedFor: ['Breast cancer treatment', 'Breast cancer prevention (high-risk patients)', 'Ductal carcinoma in situ'],
    sideEffects: ['Hot flashes', 'Vaginal discharge', 'Irregular periods', 'Mood changes', 'Nausea'],
    warnings: ['Increased risk of blood clots', 'Increased risk of uterine cancer', 'May cause cataracts', 'Avoid during pregnancy'],
    dosageInfo: {
      adult: '20 mg PO daily for 5-10 years',
      child: 'Not typically used in children',
      elderly: 'Standard dose',
      byWeight: 'Fixed dose regardless of weight'
    },
    storage: 'Store at 20-25°C. Protect from light and moisture.',
    interactions: ['CYP2D6 inhibitors reduce effectiveness', 'Increases warfarin effect', 'May interact with SSRIs']
  },
  {
    id: '13',
    name: 'Pembrolizumab',
    genericName: 'Keytruda',
    category: 'Immunotherapy - PD-1 inhibitor',
    description: 'An immune checkpoint inhibitor that helps the immune system fight cancer by blocking PD-1 protein.',
    usedFor: ['Melanoma', 'Lung cancer', 'Head and neck cancer', 'Hodgkin lymphoma', 'Urothelial cancer', 'Many others'],
    sideEffects: ['Fatigue', 'Rash', 'Diarrhea', 'Immune-related adverse events', 'Nausea', 'Decreased appetite'],
    warnings: ['Can cause severe immune-related side effects', 'Monitor for pneumonitis, colitis, hepatitis', 'May affect endocrine glands'],
    dosageInfo: {
      adult: '200 mg IV every 3 weeks or 400 mg IV every 6 weeks',
      child: '2 mg/kg IV every 3 weeks (max 200 mg)',
      elderly: 'Standard dose',
      byWeight: 'Fixed dosing preferred in adults'
    },
    storage: 'Store at 2-8°C. Do not freeze. Protect from light. Diluted solutions stable for 24 hours.',
    interactions: ['May affect live vaccine response', 'Systemic corticosteroids may reduce efficacy']
  },
  {
    id: '14',
    name: 'Lenalidomide',
    genericName: 'Revlimid',
    category: 'Immunomodulator',
    description: 'An immunomodulatory drug used for multiple myeloma and certain lymphomas. Enhances immune system and inhibits cancer growth.',
    usedFor: ['Multiple myeloma', 'Myelodysplastic syndromes', 'Mantle cell lymphoma', 'Follicular lymphoma'],
    sideEffects: ['Low blood counts', 'Fatigue', 'Diarrhea', 'Rash', 'Muscle cramps', 'Peripheral neuropathy'],
    warnings: ['SEVERE BIRTH DEFECTS - must use contraception', 'Increased risk of blood clots', 'Risk of second cancers', 'Requires REMS program'],
    dosageInfo: {
      adult: '10-25 mg PO daily (days 1-21 of 28-day cycle)',
      child: 'Not approved for pediatric use',
      elderly: 'Adjust dose based on renal function',
      byWeight: 'Dose adjustments for renal impairment crucial'
    },
    storage: 'Store at 25°C. Keep in original package. Dispense only in original packaging.',
    interactions: ['Digoxin levels may increase', 'May interact with warfarin', 'Erythropoietin increases clot risk']
  },
  {
    id: '15',
    name: 'Oxaliplatin',
    genericName: 'Eloxatin',
    category: 'Chemotherapy - Platinum compound',
    description: 'A third-generation platinum agent used primarily for colorectal cancer. Causes less kidney damage than cisplatin.',
    usedFor: ['Colorectal cancer', 'Pancreatic cancer', 'Gastric cancer', 'Ovarian cancer'],
    sideEffects: ['Cold-sensitive neuropathy', 'Nausea/vomiting', 'Diarrhea', 'Low blood counts', 'Fatigue', 'Allergic reactions'],
    warnings: ['UNIQUE: Cold-triggered neuropathy - avoid cold for 3-5 days', 'Allergic reactions increase with repeated doses', 'Monitor for pulmonary toxicity'],
    dosageInfo: {
      adult: '85 mg/m² IV every 2 weeks (FOLFOX regimen)',
      child: '85-130 mg/m² (limited data)',
      elderly: 'Standard dose with close monitoring',
      byWeight: 'Often combined with 5-FU and leucovorin'
    },
    storage: 'Store at 25°C. Do not freeze. Reconstituted solutions stable for 24 hours.',
    interactions: ['Avoid nephrotoxic drugs', 'May enhance ototoxicity of aminoglycosides']
  }
];

interface DrugDatabaseProps {
  onOpenChat?: () => void;
}

export function DrugDatabase({ onOpenChat }: DrugDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugInfo | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const filteredDrugs = DRUG_DATABASE.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Pill className="w-5 h-5" />
            <span className="font-semibold">Comprehensive Drug Information</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Drug Information Database
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Access detailed information about chemotherapy drugs and medications. Search by drug name, 
            generic name, or category to learn about dosages, side effects, warnings, and more.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Search by drug name, generic name, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
            />
          </div>
          <p className="text-center text-sm text-slate-500 mt-3">
            {filteredDrugs.length} drug{filteredDrugs.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Drug Grid */}
        {!selectedDrug ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrugs.map((drug, index) => (
              <motion.div
                key={drug.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedDrug(drug)}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-slate-200 hover:border-blue-500 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-lg mb-1 truncate">{drug.name}</h3>
                    {drug.genericName && (
                      <p className="text-sm text-slate-500">{drug.genericName}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {drug.category}
                  </span>
                </div>

                <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                  {drug.description}
                </p>

                <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Drug Detail View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
              <button
                onClick={() => setSelectedDrug(null)}
                className="mb-4 text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                ← Back to all drugs
              </button>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-2">{selectedDrug.name}</h2>
                  {selectedDrug.genericName && (
                    <p className="text-xl text-blue-100 mb-2">{selectedDrug.genericName}</p>
                  )}
                  <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    {selectedDrug.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Description</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{selectedDrug.description}</p>
              </div>

              {/* Used For */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('usedFor')}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-xl hover:from-blue-100 hover:to-teal-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-800">Used For</h3>
                  </div>
                  {expandedSection === 'usedFor' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'usedFor' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pl-6"
                  >
                    <ul className="space-y-2">
                      {selectedDrug.usedFor.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Dosage Info */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('dosage')}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-slate-800">Dosage Information</h3>
                  </div>
                  {expandedSection === 'dosage' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'dosage' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pl-6 space-y-3"
                  >
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="font-semibold text-slate-700 mb-1">Adult:</p>
                      <p className="text-slate-600">{selectedDrug.dosageInfo.adult}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="font-semibold text-slate-700 mb-1">Child:</p>
                      <p className="text-slate-600">{selectedDrug.dosageInfo.child}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="font-semibold text-slate-700 mb-1">Elderly:</p>
                      <p className="text-slate-600">{selectedDrug.dosageInfo.elderly}</p>
                    </div>
                    {selectedDrug.dosageInfo.byWeight && (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="font-semibold text-slate-700 mb-1">Weight-Based Dosing:</p>
                        <p className="text-slate-600">{selectedDrug.dosageInfo.byWeight}</p>
                      </div>
                    )}
                    {onOpenChat && (
                      <button
                        onClick={onOpenChat}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Calculator className="w-5 h-5" />
                        Calculate Personalized Dosage with AI
                      </button>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Side Effects */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('sideEffects')}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-slate-800">Common Side Effects</h3>
                  </div>
                  {expandedSection === 'sideEffects' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'sideEffects' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pl-6"
                  >
                    <ul className="space-y-2">
                      {selectedDrug.sideEffects.map((effect, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>{effect}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Warnings */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('warnings')}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-slate-800">Warnings & Precautions</h3>
                  </div>
                  {expandedSection === 'warnings' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'warnings' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pl-6"
                  >
                    <ul className="space-y-2">
                      {selectedDrug.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-red-600 mt-1">⚠</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Storage */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('storage')}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-slate-800">Storage Instructions</h3>
                  </div>
                  {expandedSection === 'storage' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'storage' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pl-6"
                  >
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">{selectedDrug.storage}</p>
                  </motion.div>
                )}
              </div>

              {/* Interactions */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('interactions')}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-cyan-50 to-sky-50 p-4 rounded-xl hover:from-cyan-100 hover:to-sky-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-xl font-bold text-slate-800">Drug Interactions</h3>
                  </div>
                  {expandedSection === 'interactions' ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedSection === 'interactions' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pl-6"
                  >
                    <ul className="space-y-2">
                      {selectedDrug.interactions.map((interaction, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-cyan-600 mt-1">•</span>
                          <span>{interaction}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* AI Chat CTA */}
              {onOpenChat && (
                <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-6 rounded-2xl border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Have Questions About This Drug?</h3>
                  <p className="text-slate-700 mb-4">
                    Our AI assistant can help answer your questions, explain dosage calculations, 
                    discuss side effects, and provide personalized guidance.
                  </p>
                  <button
                    onClick={onOpenChat}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all"
                  >
                    Ask AI About {selectedDrug.name}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
