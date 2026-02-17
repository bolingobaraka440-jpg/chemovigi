import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Shield, AlertCircle, BookOpen } from 'lucide-react';
import { DosageCalculator } from './DosageCalculator';

export function DosageCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blue-300 rounded-full px-4 py-2 mb-4 shadow-lg">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Clinical Tool</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Personalized Dosage Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Calculate safe, individualized medication doses based on patient-specific parameters
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">For Healthcare Professionals Only</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                This calculator is designed for use by licensed healthcare professionals. 
                Calculations are based on standard pharmacological formulas and should be verified 
                against current clinical guidelines and patient-specific factors before administration.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Calculator Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <DosageCalculator />
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: BookOpen,
              title: 'WHO Guidelines',
              description: 'Access international pharmacovigilance standards and dosing recommendations',
              color: 'blue'
            },
            {
              icon: Shield,
              title: 'Rwanda FDA Standards',
              description: 'Comply with local regulatory requirements for medication administration',
              color: 'teal'
            },
            {
              icon: AlertCircle,
              title: 'Safety Protocols',
              description: 'Review critical safety information and contraindications before prescribing',
              color: 'green'
            }
          ].map((resource, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 bg-${resource.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <resource.icon className={`w-6 h-6 text-${resource.color}-600`} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{resource.title}</h3>
              <p className="text-sm text-slate-600">{resource.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl"
        >
          <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Medical Disclaimer
          </h4>
          <p className="text-sm text-red-800 leading-relaxed">
            This dosage calculator is provided as a clinical decision support tool. It does not replace 
            professional medical judgment. Healthcare providers must consider individual patient factors, 
            comorbidities, drug interactions, renal/hepatic function, and current clinical guidelines when 
            making prescribing decisions. ChemoVigi and its partners assume no liability for dosing decisions 
            made using this tool. Always verify calculations independently and consult pharmacology references 
            when in doubt.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
