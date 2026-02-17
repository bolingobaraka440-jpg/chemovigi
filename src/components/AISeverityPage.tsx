import React from 'react';
import { motion } from 'motion/react';
import { Brain, AlertTriangle, TrendingUp, Shield, Sparkles, Activity } from 'lucide-react';

export function AISeverityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl relative">
              <Brain className="w-12 h-12 text-white" />
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
          
          <h1 className="text-5xl text-teal-800 mb-6 font-extrabold">AI-Powered Severity Detection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our advanced AI analyzes symptom severity, detects risks early, and suggests next actions 
            to keep you safe throughout your chemotherapy journey.
          </p>
        </motion.div>

        {/* AI Capabilities */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: AlertTriangle,
              title: 'Risk Detection',
              description: 'Machine learning algorithms identify dangerous symptom patterns and alert you immediately.',
              color: 'from-red-500 to-orange-500',
              gradient: 'bg-gradient-to-br from-red-50 to-orange-50'
            },
            {
              icon: TrendingUp,
              title: 'Severity Scoring',
              description: 'AI assigns severity levels (Low, Medium, High, Critical) based on medical data and research.',
              color: 'from-purple-500 to-purple-600',
              gradient: 'bg-gradient-to-br from-purple-50 to-purple-100'
            },
            {
              icon: Activity,
              title: 'Pattern Analysis',
              description: 'Tracks your symptoms over time to detect trends and predict potential complications.',
              color: 'from-teal-500 to-cyan-600',
              gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              className={`${feature.gradient} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How AI Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-16 border-2 border-teal-100"
        >
          <h2 className="text-teal-800 text-center mb-12">How Our AI Protects You</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">Data Collection</h4>
                  <p className="text-gray-600">You submit symptoms through simple text or voice</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">AI Analysis</h4>
                  <p className="text-gray-600">Machine learning models trained on millions of medical cases analyze your input</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">Risk Assessment</h4>
                  <p className="text-gray-600">AI compares with known side effect databases and severity scales</p>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">Alert Generation</h4>
                  <p className="text-gray-600">High-risk symptoms trigger immediate notifications to you and your care team</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">Recommendations</h4>
                  <p className="text-gray-600">Personalized guidance: home care, contact clinic, or seek emergency help</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h4 className="text-gray-800 mb-2">Continuous Learning</h4>
                  <p className="text-gray-600">AI improves with every report, becoming smarter and more accurate</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Severity Levels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-purple-500 via-teal-500 to-blue-500 rounded-3xl p-12 text-white shadow-2xl"
        >
          <h2 className="text-white text-center mb-12">Severity Level Guide</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { level: 'Low', color: 'bg-green-500', action: 'Monitor at home', icon: '✓' },
              { level: 'Medium', color: 'bg-yellow-500', action: 'Contact your clinic', icon: '!' },
              { level: 'High', color: 'bg-orange-500', action: 'Seek medical attention soon', icon: '!!' },
              { level: 'Critical', color: 'bg-red-500', action: 'Emergency response needed', icon: '🚨' }
            ].map((severity, index) => (
              <motion.div
                key={severity.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className={`w-16 h-16 ${severity.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg`}>
                  {severity.icon}
                </div>
                <h4 className="text-white mb-2">{severity.level}</h4>
                <p className="text-white/80 text-sm">{severity.action}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust & Safety */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-16 bg-white rounded-3xl p-12 shadow-xl"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Shield className="w-12 h-12 text-teal-600" />
            <h2 className="text-teal-800">Built on Medical Trust</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-teal-600 mb-2">99.7%</p>
              <p className="text-gray-600">Accuracy rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">50M+</p>
              <p className="text-gray-600">Medical cases analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">24/7</p>
              <p className="text-gray-600">Always monitoring</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
