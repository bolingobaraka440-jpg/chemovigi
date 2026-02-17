import React from 'react';
import { motion } from 'motion/react';
import { FileText, Pill, AlertTriangle, Shield, CheckCircle, Lock } from 'lucide-react';

export function ReportingOverview() {
  const reportTypes = [
    {
      icon: Pill,
      title: 'Adverse Drug Reactions',
      description: 'Report unexpected or harmful reactions to medications including allergies, side effects, and drug interactions.',
      color: 'blue',
      examples: ['Severe allergic reactions', 'Unexpected side effects', 'Drug interactions', 'Treatment complications']
    },
    {
      icon: AlertTriangle,
      title: 'Chemotherapy Side Effects',
      description: 'Track and report side effects from chemotherapy treatment for better monitoring and care coordination.',
      color: 'purple',
      examples: ['Nausea and vomiting', 'Fatigue and weakness', 'Hair loss', 'Neuropathy symptoms']
    },
    {
      icon: Shield,
      title: 'Substandard Medications',
      description: 'Report suspicious medications, quality concerns, or packaging irregularities to protect public health.',
      color: 'red',
      examples: ['Unusual packaging', 'Different color/shape', 'No effect after use', 'Expired medications']
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Simple & Quick',
      description: 'Report in minutes with our intuitive interface'
    },
    {
      icon: Lock,
      title: 'Private & Secure',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: FileText,
      title: 'No Login Required',
      description: 'Browse information freely before registering'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-white via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Quick & Easy Reporting
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            ChemoVigi makes it simple to report adverse events, side effects, and medication concerns. 
            Your reports help improve drug safety for everyone.
          </p>
        </motion.div>

        {/* Report Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reportTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 hover:shadow-2xl transition-shadow"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br from-${type.color}-500 to-${type.color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <type.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-800 mb-3">{type.title}</h3>

              {/* Description */}
              <p className="text-slate-600 mb-6 leading-relaxed">{type.description}</p>

              {/* Examples */}
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Common Examples:</p>
                <ul className="space-y-1">
                  {type.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">{benefit.title}</h4>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-600 mb-6">
            Ready to make a difference in drug safety?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all">
            Start Reporting Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
