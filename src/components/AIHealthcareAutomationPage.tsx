import React from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, BarChart3, MessageCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface AIHealthcareAutomationPageProps {
  onOpenChat?: () => void;
}

export function AIHealthcareAutomationPage({ onOpenChat }: AIHealthcareAutomationPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-28 h-28 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Brain className="w-14 h-14 text-white" />
          </motion.div>
          
          <h1 className="text-6xl text-purple-900 mb-6 font-extrabold">🤖 AI Healthcare Automation</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming patient care through intelligent automation and machine learning
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-12 border-2 border-purple-100"
        >
          <h2 className="text-purple-900 mb-8 text-center">What is AI Healthcare Automation?</h2>
          
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              <strong className="text-purple-600">AI Healthcare Automation</strong> is the future of medical care delivery. 
              It leverages artificial intelligence and machine learning to automate repetitive healthcare tasks, 
              analyze complex medical data, and provide instant, accurate insights to both patients and clinicians.
            </p>
            
            <p>
              In ChemoVigi, our AI automation handles everything from <strong>symptom collection</strong> and 
              <strong> severity analysis</strong> to <strong>alert generation</strong> and <strong>follow-up scheduling</strong>. 
              What used to take hours of manual work now happens in seconds.
            </p>
            
            <p className="text-purple-700 font-semibold text-xl">
              💡 Result: Faster responses, better patient outcomes, and reduced clinician burnout.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Zap,
              title: 'Lightning-Fast Processing',
              description: 'AI analyzes symptoms and generates reports in under 2 seconds',
              color: 'from-yellow-500 to-orange-500'
            },
            {
              icon: Brain,
              title: 'Smart Decision Support',
              description: 'Machine learning guides patients on next steps based on severity',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: BarChart3,
              title: 'Predictive Analytics',
              description: 'AI predicts potential complications before they become critical',
              color: 'from-blue-500 to-teal-500'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-purple-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-10 text-white shadow-2xl mb-12"
        >
          <h2 className="text-white text-center mb-10">Key Benefits of Our AI Automation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '⚡ 10x faster symptom processing',
              '🎯 99.7% accuracy in severity detection',
              '📊 Real-time data visualization for clinicians',
              '🔔 Automatic high-risk patient alerts',
              '📱 24/7 availability for patients',
              '💰 Reduced healthcare costs by 30%'
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                <p className="text-white text-lg">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { stat: '99.7%', label: 'AI Accuracy' },
            { stat: '< 2 sec', label: 'Processing Time' },
            { stat: '24/7', label: 'Availability' },
            { stat: '10x', label: 'Speed Increase' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all"
            >
              <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <p className="text-4xl font-bold text-purple-600 mb-2">{item.stat}</p>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-10 text-center shadow-xl"
        >
          <h2 className="text-purple-900 mb-6">Experience AI Automation in Action</h2>
          <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
            Our AI assistant is ready to help you right now. Ask questions, report symptoms, or learn more about our platform.
          </p>
          <motion.button
            onClick={onOpenChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto text-lg font-semibold"
          >
            <MessageCircle className="w-6 h-6" />
            Chat with Our AI Now
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
