import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Shield, Users, TrendingUp, Globe, Clock, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-16">
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl text-blue-800 mb-6 font-extrabold">About ChemoVigi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed italic">
            Transforming cancer care through intelligent technology and compassionate innovation.
          </p>
        </motion.div>

        {/* Main Story */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-16"
        >
          <h2 className="text-blue-800 text-center mb-8">Our Story</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-center text-blue-600 font-semibold">
              ChemoVigi is an AI-powered medical platform built to support chemotherapy patients by 
              transforming symptom reporting into intelligent, life-saving insights.
            </p>
            
            <p>
              Every year, millions of patients undergo chemotherapy treatment. While these therapies save lives, 
              they also bring challenging side effects that can range from mild discomfort to life-threatening complications. 
              Too often, patients suffer in silence, unsure whether their symptoms are normal or dangerous.
            </p>
            
            <p>
              We created ChemoVigi to bridge this critical gap. Our platform empowers patients to report side effects 
              in seconds using simple, natural language. No complex medical forms. No confusing terminology. 
              Just a quick message describing what you're feeling.
            </p>
            
            <p>
              But we don't stop at collection. Our advanced AI analyzes each report instantly, detecting severity levels, 
              identifying dangerous patterns, and recommending immediate next steps. High-risk symptoms trigger 
              automatic alerts to healthcare teams, ensuring no critical case slips through the cracks.
            </p>
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-blue-800 text-center mb-12">How ChemoVigi Works</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-white mb-4">For Patients</h3>
              <p className="text-white/90 leading-relaxed">
                Patients report side effects in seconds using our intuitive interface or AI chat widget. 
                The system provides instant feedback on severity and recommended actions. Track your symptom 
                history, communicate securely with your care team, and gain peace of mind knowing you're monitored 24/7.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <Sparkles className="w-12 h-12 mb-4" />
              <h3 className="text-white mb-4">AI-Powered Analysis</h3>
              <p className="text-white/90 leading-relaxed">
                Our machine learning models, trained on millions of medical cases, analyze symptom severity 
                in real-time. The AI detects risks early, flags dangerous patterns, and suggests personalized 
                next actions based on medical guidelines and research.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-white mb-4">For Clinicians</h3>
              <p className="text-white/90 leading-relaxed">
                Clinicians gain real-time visibility through secure dashboards showing all patient reports, 
                severity alerts, and trend analysis. Receive immediate notifications for critical cases. 
                Access comprehensive data-driven insights to inform treatment decisions and improve outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl"
            >
              <Shield className="w-12 h-12 mb-4" />
              <h3 className="text-white mb-4">Privacy & Security</h3>
              <p className="text-white/90 leading-relaxed">
                Privacy and security are core to everything we do. All data is encrypted end-to-end with 
                hospital-grade protection. Role-based access ensures only authorized care team members see 
                patient information. We're HIPAA compliant and meet international medical data standards.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl mb-16 text-center"
        >
          <h2 className="text-white mb-8">Our Mission</h2>
          <p className="text-white/95 text-2xl max-w-4xl mx-auto leading-relaxed">
            ChemoVigi bridges patients and clinicians, turning technology into compassionate, 
            proactive cancer care. We believe every patient deserves intelligent monitoring, 
            every symptom deserves attention, and every life matters.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-16"
        >
          <h2 className="text-blue-800 text-center mb-12">Our Impact</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Clock, stat: '30 sec', label: 'Average reporting time' },
              { icon: Sparkles, stat: '99.7%', label: 'AI accuracy rate' },
              { icon: Shield, stat: '100%', label: 'Data encrypted' },
              { icon: Award, stat: '24/7', label: 'Patient monitoring' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-all"
              >
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-4xl font-bold text-blue-600 mb-2">{item.stat}</p>
                <p className="text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="bg-white rounded-3xl p-12 shadow-2xl mb-16"
        >
          <h2 className="text-blue-800 text-center mb-8">Our Vision for the Future</h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              We envision a world where no chemotherapy patient ever faces their journey alone. 
              Where technology acts as a safety net, catching problems before they become crises. 
              Where data becomes actionable insights that save lives.
            </p>
            
            <p>
              Our roadmap includes expanding to more cancer types, integrating with electronic health records, 
              partnering with hospitals worldwide, and continuously improving our AI with cutting-edge research. 
              We're building predictive models that can anticipate complications before they occur.
            </p>
            
            <p className="text-lg text-blue-600 font-semibold">
              But our ultimate goal remains simple: ensure every patient receives the right care at the right time, 
              every single time.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
        >
          <h2 className="text-blue-800 text-center mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Compassion First',
                description: 'Technology should enhance human care, not replace it. Every feature we build starts with empathy.',
                emoji: '❤️',
                color: 'from-red-50 to-pink-50'
              },
              {
                title: 'Evidence-Based',
                description: 'Our AI is grounded in peer-reviewed medical research and validated by healthcare professionals.',
                emoji: '🔬',
                color: 'from-blue-50 to-cyan-50'
              },
              {
                title: 'Patient Empowerment',
                description: 'We put control in patients\' hands while supporting them with intelligent guidance.',
                emoji: '💪',
                color: 'from-green-50 to-emerald-50'
              },
              {
                title: 'Continuous Innovation',
                description: 'Cancer care evolves, and so do we. We\'re committed to staying at the forefront of medical AI.',
                emoji: '🚀',
                color: 'from-purple-50 to-violet-50'
              },
              {
                title: 'Transparency',
                description: 'Open about our methods, our limitations, and our partnerships. Trust is earned through honesty.',
                emoji: '🔍',
                color: 'from-yellow-50 to-orange-50'
              },
              {
                title: 'Global Access',
                description: 'Quality cancer care shouldn\'t depend on location. We\'re working to make ChemoVigi available everywhere.',
                emoji: '🌍',
                color: 'from-teal-50 to-blue-50'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.4 + index * 0.1 }}
                className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200`}
              >
                <div className="text-5xl mb-4 text-center">{value.emoji}</div>
                <h3 className="text-gray-800 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mt-16 text-center bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl p-12 text-white shadow-2xl"
        >
          <h2 className="text-white mb-6">Join Us in Transforming Cancer Care</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a patient seeking better monitoring, a clinician wanting to improve outcomes, 
            or a partner who shares our vision — let's connect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-blue-600 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold">
              Get Started Today
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
