import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  MessageSquare, 
  AlertTriangle, 
  Shield, 
  Bell, 
  BarChart3,
  Lock,
  CheckCircle2,
  Zap,
  Users,
  FileText,
  TrendingUp,
  Database,
  Activity
} from 'lucide-react';

interface AIFeaturesPageProps {
  onOpenChat?: () => void;
}

export function AIFeaturesPage({ onOpenChat }: AIFeaturesPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-teal-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Strip - VERY IMPORTANT */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-full px-8 py-3 inline-flex items-center gap-4 mb-8 shadow-lg"
        >
          <div className="flex items-center gap-2 text-white border-r border-white/30 pr-4">
            <Brain className="w-5 h-5" />
            <span className="font-semibold">Category: AI Healthcare Automation</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5" />
            <span className="font-semibold">Industry: Pharmaceuticals & Oncology</span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h1 className="text-5xl text-blue-900 font-extrabold">AI-Powered Platform</h1>
              <p className="text-blue-600 text-xl">Intelligent Pharmacovigilance Technology</p>
            </div>
          </div>
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-blue-600"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-blue-800">ChemoVigi</strong> is an <strong className="text-purple-600">AI-powered pharmacovigilance platform</strong> designed 
              to help patients and clinicians quickly report, analyze, and respond to chemotherapy-related side effects 
              with <strong className="text-teal-600">speed, accuracy, and security</strong>. Our advanced machine learning 
              algorithms transform symptom reporting into actionable medical insights in real-time.
            </p>
          </motion.div>
        </motion.div>

        {/* CORE WORKFLOW - THE HEART ❤️ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-blue-900 font-bold mb-4">Core AI Workflow</h2>
            <p className="text-xl text-gray-600">Four intelligent steps that save lives</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* STEP 1: Symptom Intake */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-400 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                </div>
              </div>
              
              <h3 className="text-blue-900 text-center mb-4">Symptom Intake</h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Multi-channel reporting (web, forms, chat)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Free-text symptom input</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Patient-friendly language</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Avg. Time</span>
                  <span className="font-bold text-blue-600">30 seconds</span>
                </div>
              </div>
            </motion.div>

            {/* STEP 2: AI Severity Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 hover:border-purple-400 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(147, 51, 234, 0.3)',
                        '0 0 40px rgba(147, 51, 234, 0.6)',
                        '0 0 20px rgba(147, 51, 234, 0.3)',
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Brain className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
              </div>
              
              <h3 className="text-purple-900 text-center mb-4">AI Severity Analysis</h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>NLP extracts symptoms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AI classifies severity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Risk flags generated</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Accuracy</span>
                  <span className="font-bold text-purple-600">99.7%</span>
                </div>
              </div>
            </motion.div>

            {/* STEP 3: Secure Case Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-teal-100 hover:border-teal-400 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
              </div>
              
              <h3 className="text-teal-900 text-center mb-4">Secure Case Management</h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Patient & clinician dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Role-based access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Encrypted medical data</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Security</span>
                  <span className="font-bold text-teal-600">AES-256</span>
                </div>
              </div>
            </motion.div>

            {/* STEP 4: Alerts & Follow-Up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-400 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Bell className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                </div>
              </div>
              
              <h3 className="text-orange-900 text-center mb-4">Alerts & Follow-Up</h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Automated alerts for high-risk cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AI-guided next steps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Follow-up reminders</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Response</span>
                  <span className="font-bold text-orange-600">Real-time</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Workflow Flow Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 flex justify-center items-center gap-2"
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-teal-500"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-orange-500"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          </motion.div>
        </motion.div>

        {/* WHY AI MAKES IT BETTER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl text-blue-900 font-bold mb-4">Why AI Makes It Better</h2>
            <p className="text-xl text-gray-600">Measurable improvements in patient care</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: Zap, title: 'Faster reporting & response', stat: '10x', color: 'from-yellow-500 to-orange-500' },
              { icon: TrendingUp, title: 'Reduced manual work', stat: '75%', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: 'Improved patient safety', stat: '99%', color: 'from-green-500 to-emerald-500' },
              { icon: FileText, title: 'Better regulatory readiness', stat: '100%', color: 'from-purple-500 to-pink-500' },
              { icon: Users, title: 'Personalized patient engagement', stat: '24/7', color: 'from-teal-500 to-blue-500' }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-blue-900 mb-2">{benefit.stat}</p>
                <p className="text-gray-700 text-sm leading-tight">{benefit.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECURITY & COMPLIANCE - VERY IMPORTANT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-12 shadow-2xl"
        >
          <div className="text-center mb-12">
            <Lock className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-4xl text-white font-bold mb-4">Security & Compliance</h2>
            <p className="text-xl text-white/80">Built for clinical & regulatory standards</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Secure Authentication', desc: 'Multi-factor authentication with Login & Register', icon: Lock },
              { title: 'Data Encryption', desc: 'AES-256 military-grade encryption end-to-end', icon: Shield },
              { title: 'Privacy-First', desc: 'Medical data handling with HIPAA compliance', icon: Database },
              { title: 'Clinical Standards', desc: 'Designed for regulatory and clinical requirements', icon: CheckCircle2 }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <item.icon className="w-10 h-10 text-white mb-4" />
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {['HIPAA', 'GDPR', 'SOC 2', 'ISO 27001'].map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.0 + index * 0.1, type: "spring" }}
                className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all"
              >
                ✓ {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Try AI Chat CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl text-blue-900 font-bold mb-6">Experience Our AI Assistant</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Ready to see how our AI can help you? Start a conversation now and experience intelligent healthcare assistance.
          </p>
          <motion.button
            onClick={onOpenChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto text-lg font-semibold"
          >
            <MessageSquare className="w-6 h-6" />
            Try AI Chat Now
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