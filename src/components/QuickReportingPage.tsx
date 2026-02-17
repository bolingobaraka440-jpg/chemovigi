import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Clock, Send, CheckCircle, Smartphone, Zap } from 'lucide-react';

export function QuickReportingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-16">
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl text-blue-800 mb-6 font-extrabold">Quick & Easy Reporting</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Submit chemotherapy side effects or symptoms using one simple message. 
            No complicated forms, no medical jargon required.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Clock,
              title: 'Report in Seconds',
              description: 'Average reporting time: 30 seconds. Just describe what you\'re feeling in plain language.',
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: Smartphone,
              title: 'Any Device, Anywhere',
              description: 'Desktop, mobile, tablet — report from wherever you are, whenever symptoms appear.',
              color: 'from-teal-500 to-teal-600'
            },
            {
              icon: Zap,
              title: 'Instant Submission',
              description: 'Your report reaches our AI system immediately for real-time analysis and response.',
              color: 'from-green-500 to-green-600'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-blue-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 rounded-3xl p-12 text-white shadow-2xl"
        >
          <h2 className="text-white text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Open Chat', desc: 'Click the AI chat widget anytime' },
              { step: 2, title: 'Describe', desc: 'Type your symptoms naturally' },
              { step: 3, title: 'Submit', desc: 'AI analyzes instantly' },
              { step: 4, title: 'Get Guidance', desc: 'Receive immediate feedback' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-2 border-white/40">
                  {item.step}
                </div>
                <h4 className="text-white mb-2">{item.title}</h4>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-white rounded-3xl p-12 shadow-xl"
        >
          <h2 className="text-blue-800 text-center mb-12">Why Patients Love It</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'No complex medical forms to fill out',
              'Works in your own words and language',
              'Available 24/7, even outside clinic hours',
              'Privacy-protected and fully encrypted',
              'Immediate confirmation of receipt',
              'Automatic severity assessment'
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">Ready to start reporting?</p>
          <button className="px-12 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto">
            <Send className="w-5 h-5" />
            Try Quick Reporting Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}
