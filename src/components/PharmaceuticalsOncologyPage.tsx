import React from 'react';
import { motion } from 'motion/react';
import { Activity, Heart, Shield, Pill, MessageCircle, Brain, CheckCircle, Users } from 'lucide-react';

interface PharmaceuticalsOncologyPageProps {
  onOpenChat?: () => void;
}

export function PharmaceuticalsOncologyPage({ onOpenChat }: PharmaceuticalsOncologyPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-28 h-28 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Activity className="w-14 h-14 text-white" />
          </motion.div>
          
          <h1 className="text-6xl text-pink-900 mb-6 font-extrabold">💊 Pharmaceuticals & Oncology</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Specialized pharmacovigilance for chemotherapy and cancer treatment
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-12 border-2 border-pink-100"
        >
          <h2 className="text-pink-900 mb-8 text-center">Our Focus: Cancer Care & Drug Safety</h2>
          
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              <strong className="text-pink-600">Pharmacovigilance</strong> is the science of monitoring, 
              detecting, assessing, and preventing adverse effects of pharmaceutical products. 
              At ChemoVigi, we specialize in <strong>oncology pharmacovigilance</strong> — tracking and 
              analyzing side effects from chemotherapy and cancer treatments.
            </p>
            
            <p>
              Chemotherapy drugs are powerful but can cause severe side effects. Our platform helps patients 
              report these effects quickly, while our AI analyzes severity and guides next steps. 
              Clinicians receive real-time alerts for high-risk cases, enabling faster intervention.
            </p>
            
            <p className="text-pink-700 font-semibold text-xl">
              🎯 Mission: Make cancer treatment safer through intelligent symptom monitoring and rapid response.
            </p>
          </div>
        </motion.div>

        {/* Key Areas */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              icon: Pill,
              title: 'Chemotherapy Monitoring',
              description: 'Track side effects from common chemo drugs like cisplatin, doxorubicin, paclitaxel, and more',
              points: ['Nausea & vomiting tracking', 'Neutropenia detection', 'Peripheral neuropathy monitoring'],
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Heart,
              title: 'Patient-Centered Care',
              description: 'Empower patients to take control of their treatment journey with easy reporting and clear guidance',
              points: ['Simple symptom reporting', 'Personalized recommendations', 'Direct clinician communication'],
              color: 'from-pink-500 to-rose-500'
            },
            {
              icon: Shield,
              title: 'Drug Safety Surveillance',
              description: 'Continuous monitoring of adverse drug reactions to improve treatment protocols and patient safety',
              points: ['Real-time ADR detection', 'Trend analysis', 'Regulatory reporting support'],
              color: 'from-purple-500 to-violet-500'
            },
            {
              icon: Users,
              title: 'Clinical Decision Support',
              description: 'Provide oncologists with data-driven insights to make informed treatment decisions',
              points: ['Patient risk stratification', 'Treatment efficacy tracking', 'Outcome prediction models'],
              color: 'from-teal-500 to-green-500'
            }
          ].map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-pink-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <area.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-800 mb-3">{area.title}</h3>
              <p className="text-gray-600 mb-4">{area.description}</p>
              <ul className="space-y-2">
                {area.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Common Chemo Side Effects We Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl mb-12"
        >
          <h2 className="text-white text-center mb-10">Common Chemotherapy Side Effects We Monitor</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '🤢', name: 'Nausea & Vomiting', severity: 'High Priority' },
              { emoji: '🩸', name: 'Low Blood Counts', severity: 'Critical' },
              { emoji: '😴', name: 'Fatigue & Weakness', severity: 'Common' },
              { emoji: '💇', name: 'Hair Loss', severity: 'Expected' },
              { emoji: '🤚', name: 'Neuropathy', severity: 'Moderate' },
              { emoji: '🌡️', name: 'Fever & Infection', severity: 'Emergency' },
              { emoji: '💔', name: 'Cardiac Issues', severity: 'Critical' },
              { emoji: '🧠', name: 'Chemo Brain', severity: 'Common' },
              { emoji: '😷', name: 'Mouth Sores', severity: 'Moderate' }
            ].map((effect, index) => (
              <motion.div
                key={effect.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + index * 0.08 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all text-center"
              >
                <div className="text-4xl mb-3">{effect.emoji}</div>
                <p className="text-white font-semibold mb-1">{effect.name}</p>
                <p className="text-white/70 text-sm">{effect.severity}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Oncology Pharmacovigilance Matters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-3xl p-10 shadow-xl mb-12"
        >
          <h2 className="text-pink-900 mb-8 text-center">Why Oncology Pharmacovigilance Matters</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-gray-800 mb-4 text-xl">📊 The Challenge</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 text-xl">•</span>
                  <span><strong>96%</strong> of chemo patients experience side effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 text-xl">•</span>
                  <span><strong>40%</strong> delay reporting symptoms until they worsen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 text-xl">•</span>
                  <span><strong>25%</strong> require emergency care due to delayed intervention</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-800 mb-4 text-xl">✅ Our Solution</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Instant symptom reporting in <strong>30 seconds</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AI severity detection with <strong>99.7% accuracy</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Real-time clinician alerts for <strong>critical cases</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-10 text-center shadow-xl"
        >
          <h2 className="text-pink-900 mb-6">Get Help from Our Oncology AI</h2>
          <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
            Our AI assistant is trained specifically for chemotherapy side effects and cancer care. 
            Get instant guidance tailored to your symptoms.
          </p>
          <motion.button
            onClick={onOpenChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto text-lg font-semibold"
          >
            <MessageCircle className="w-6 h-6" />
            Talk to Oncology AI
            <motion.div
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Brain className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
