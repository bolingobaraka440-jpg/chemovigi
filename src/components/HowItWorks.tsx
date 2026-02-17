import React from 'react';
import { motion } from 'motion/react';
import { FileText, Brain, UserCheck, Shield, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: 'Report an Issue',
      description: 'Patients or users quickly report adverse drug reactions, chemotherapy side effects, or substandard medications through our secure platform.',
      color: 'blue',
      bgColor: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI-Assisted Triage',
      description: 'Our AI system analyzes the report and provides severity classification to help prioritize cases requiring immediate attention.',
      color: 'purple',
      bgColor: 'from-purple-500 to-purple-600'
    },
    {
      icon: UserCheck,
      title: 'Clinician Review',
      description: 'Qualified healthcare professionals review cases, add clinical notes, and make informed decisions with AI-assisted insights.',
      color: 'teal',
      bgColor: 'from-teal-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Improved Safety',
      description: 'Better monitoring, faster responses, and data-driven insights lead to improved patient safety and pharmacovigilance outcomes.',
      color: 'green',
      bgColor: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            How ChemoVigi Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A simple, secure, and effective workflow designed to bridge the gap between patients, 
            AI technology, and healthcare professionals.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-teal-200 to-green-200" 
                 style={{ width: 'calc(100% - 8rem)', left: '4rem' }} 
            />

            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Icon Circle */}
                  <div className={`w-40 h-40 mx-auto bg-gradient-to-br ${step.bgColor} rounded-full flex items-center justify-center shadow-xl mb-6 relative z-10`}>
                    <step.icon className="w-16 h-16 text-white" />
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 bg-white border-4 border-slate-300 rounded-full flex items-center justify-center font-bold text-slate-700 z-20">
                    {index + 1}
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-20 -right-4 transform">
                      <ArrowRight className="w-8 h-8 text-slate-300" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex gap-6">
                {/* Icon Circle */}
                <div className={`w-20 h-20 bg-gradient-to-br ${step.bgColor} rounded-full flex items-center justify-center shadow-xl flex-shrink-0 relative`}>
                  <step.icon className="w-10 h-10 text-white" />
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center font-bold text-xs text-slate-700">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="ml-10 mt-4 mb-4 h-12 w-1 bg-gradient-to-b from-slate-300 to-slate-200" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-6">
            Ready to experience the future of pharmacovigilance?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </div>
  );
}
