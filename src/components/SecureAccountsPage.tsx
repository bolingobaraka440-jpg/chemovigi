import React from 'react';
import { motion } from 'motion/react';
import { Lock, Shield, Key, UserCheck, Database, FileCheck } from 'lucide-react';

export function SecureAccountsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl relative">
              <Lock className="w-12 h-12 text-white" />
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.5)',
                    '0 0 40px rgba(34, 197, 94, 0.8)',
                    '0 0 20px rgba(34, 197, 94, 0.5)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </motion.div>
          
          <h1 className="text-5xl text-green-800 mb-6 font-extrabold">Secure Patient Accounts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Encrypted data, role-based access, and secure communication between patients and clinicians. 
            Your privacy and safety are our top priorities.
          </p>
        </motion.div>

        {/* Security Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: 'End-to-End Encryption',
              description: 'Military-grade AES-256 encryption protects all your medical data in transit and at rest.',
              color: 'from-green-500 to-emerald-600'
            },
            {
              icon: UserCheck,
              title: 'Role-Based Access',
              description: 'Patients and clinicians have separate secure portals with controlled access permissions.',
              color: 'from-teal-500 to-cyan-600'
            },
            {
              icon: Key,
              title: 'Multi-Factor Authentication',
              description: 'Extra security layer with 2FA ensures only you can access your sensitive health information.',
              color: 'from-blue-500 to-indigo-600'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-green-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Compliance Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 rounded-3xl p-12 text-white shadow-2xl mb-16"
        >
          <h2 className="text-white text-center mb-12">Medical-Grade Compliance</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'HIPAA', desc: 'Full compliance with US healthcare privacy laws' },
              { name: 'GDPR', desc: 'European data protection standards met' },
              { name: 'SOC 2', desc: 'Certified security and availability controls' }
            ].map((compliance, index) => (
              <motion.div
                key={compliance.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.15 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white mb-2 text-xl font-bold">{compliance.name}</h4>
                <p className="text-white/80 text-sm">{compliance.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How We Protect You */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-16"
        >
          <h2 className="text-green-800 text-center mb-12">How We Protect Your Data</h2>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-start gap-6 p-6 rounded-xl hover:bg-green-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">Secure Account Creation</h4>
                <p className="text-gray-600">Strong password requirements, email verification, and optional 2FA setup from day one.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="flex items-start gap-6 p-6 rounded-xl hover:bg-teal-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">Encrypted Communications</h4>
                <p className="text-gray-600">All messages between patients and clinicians are encrypted end-to-end. No one else can read them.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="flex items-start gap-6 p-6 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">Access Control</h4>
                <p className="text-gray-600">Only your assigned care team can view your reports. You control who sees what.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex items-start gap-6 p-6 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">Data Backup & Recovery</h4>
                <p className="text-gray-600">Redundant backups across multiple secure data centers ensure your information is never lost.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-start gap-6 p-6 rounded-xl hover:bg-green-50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">5</span>
              </div>
              <div>
                <h4 className="text-gray-800 mb-2">Regular Security Audits</h4>
                <p className="text-gray-600">Independent third-party security experts test our systems monthly to identify and fix vulnerabilities.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Patient vs Clinician Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Patient Portal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-blue-800">Patient Portal</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Submit and track your reports
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                View your symptom history
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Chat with AI assistant
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Receive care team responses
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Manage privacy settings
              </li>
            </ul>
          </motion.div>

          {/* Clinician Portal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border-2 border-green-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-green-800">Clinician Dashboard</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Monitor assigned patients
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Receive critical alerts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Review AI severity assessments
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Send secure messages
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Access patient reports (authorized only)
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-center text-white shadow-2xl"
        >
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-white mb-4">Your Data. Your Control. Always Protected.</h3>
          <p className="text-white/90 max-w-2xl mx-auto">
            We never sell your data. We never share it without your explicit permission. 
            Your medical information stays between you and your care team.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
