import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Brain, Shield, Clock, TrendingUp, CheckCircle, AlertTriangle, MessageSquare, BarChart3, Bell, Sparkles, Activity, FileText, UserCheck, ArrowRight } from 'lucide-react';

interface AIAutoReportingShowcaseProps {
  onOpenChat?: () => void;
}

export function AIAutoReportingShowcase({ onOpenChat }: AIAutoReportingShowcaseProps) {
  const [activeDemo, setActiveDemo] = useState<number | null>(null);

  const demoSteps = [
    {
      id: 1,
      time: '0.5s',
      title: 'Patient Reports Symptom',
      description: 'Natural language input',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      example: '"I have severe nausea and dizziness after my chemo session"'
    },
    {
      id: 2,
      time: '1.2s',
      title: 'AI Analyzes Instantly',
      description: 'WHO severity criteria',
      icon: Brain,
      color: 'from-teal-500 to-teal-600',
      example: 'Severity: Moderate | Priority: High | Pattern: Common ADR'
    },
    {
      id: 3,
      time: '1.8s',
      title: 'Auto-Classification',
      description: 'Smart categorization',
      icon: BarChart3,
      color: 'from-blue-600 to-teal-600',
      example: 'Category: GI Toxicity | Drug: Doxorubicin | Urgency: 24h review'
    },
    {
      id: 4,
      time: '2.0s',
      title: 'Clinician Alert Sent',
      description: 'Automatic notification',
      icon: Bell,
      color: 'from-teal-600 to-green-600',
      example: 'Dr. Sarah Johnson notified | Case assigned | ETA: 2 hours'
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white font-bold px-6 py-3 rounded-full mb-8 shadow-2xl"
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-lg uppercase tracking-wide">Our Revolutionary Feature</span>
            <Zap className="w-6 h-6 animate-pulse" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            AI <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-green-400 bg-clip-text text-transparent">Auto-Reporting</span>
            <br />
            System
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-4">
            The world's first <strong className="text-teal-300">fully automated adverse drug reaction reporting system </strong>
            that analyzes, classifies, and routes reports in real-time without human intervention.
          </p>
          
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            From symptom to clinician in under <strong className="text-teal-300 text-2xl">2 seconds</strong> ⚡
          </p>
        </motion.div>

        {/* Live Demo Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              <Activity className="w-8 h-8 inline-block mr-3 text-teal-400" />
              Watch AI Auto-Reporting in Action
            </h3>
            
            {/* Timeline */}
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 -translate-y-1/2" 
                   style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

              <div className="grid md:grid-cols-4 gap-8">
                {demoSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <motion.button
                      onClick={() => setActiveDemo(activeDemo === step.id ? null : step.id)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-br ${step.color} rounded-2xl p-6 shadow-2xl relative z-10 transition-all cursor-pointer`}
                    >
                      {/* Time Badge */}
                      <div className="absolute -top-3 -right-3 bg-teal-400 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                        {step.time}
                      </div>
                      
                      {/* Step Number */}
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-slate-800 shadow-xl border-4 border-slate-900">
                        {step.id}
                      </div>

                      <div className="flex flex-col items-center text-center mt-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{step.title}</h4>
                        <p className="text-white/80 text-sm">{step.description}</p>
                      </div>
                    </motion.button>

                    {/* Example Popup */}
                    <AnimatePresence>
                      {activeDemo === step.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -10 }}
                          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white rounded-xl p-4 shadow-2xl z-20 w-64 border-4 border-teal-400"
                        >
                          <p className="text-sm text-slate-700 italic">"{step.example}"</p>
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-400 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Zap,
              title: '98% Faster',
              stat: '2 seconds',
              description: 'Traditional reporting takes 20-30 minutes. Our AI does it in 2 seconds.',
              color: 'from-blue-500 to-teal-500'
            },
            {
              icon: Brain,
              title: 'AI-Powered',
              stat: 'Smart Analysis',
              description: 'Advanced AI trained on pharmacovigilance data and WHO severity criteria.',
              color: 'from-teal-500 to-blue-600'
            },
            {
              icon: Shield,
              title: '100% Coverage',
              stat: '24/7 Monitoring',
              description: 'Never miss a critical case. AI works round the clock.',
              color: 'from-teal-500 to-green-500'
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl text-center"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                <benefit.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-2xl font-bold text-teal-300 mb-4">{benefit.stat}</p>
              <p className="text-blue-100">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How It Eliminates Human Error */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 rounded-3xl p-12 mb-16 shadow-2xl border-2 border-white/20"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            <AlertTriangle className="w-12 h-12 inline-block mr-4 animate-pulse" />
            Why Manual Reporting Fails
          </h3>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-xl">❌</span>
                Traditional Method
              </h4>
              <ul className="space-y-4 text-white/95">
                <li className="flex items-start gap-3">
                  <span className="text-red-300 text-2xl">•</span>
                  <span className="text-lg">Patients forget to report (94% underreporting)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 text-2xl">•</span>
                  <span className="text-lg">Complex forms take 20-30 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 text-2xl">•</span>
                  <span className="text-lg">Inconsistent severity assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 text-2xl">•</span>
                  <span className="text-lg">Delayed clinician notification (hours/days)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-300 text-2xl">•</span>
                  <span className="text-lg">Manual data entry errors</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">✅</span>
                ChemoVigi AI Auto-Reporting
              </h4>
              <ul className="space-y-4 text-white/95">
                <li className="flex items-start gap-3">
                  <span className="text-green-300 text-2xl">✓</span>
                  <span className="text-lg">AI prompts patients at optimal times</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 text-2xl">✓</span>
                  <span className="text-lg">Natural language - just talk to AI (2 seconds)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 text-2xl">✓</span>
                  <span className="text-lg">Standardized WHO severity scoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 text-2xl">✓</span>
                  <span className="text-lg">Instant clinician alerts for urgent cases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-300 text-2xl">✓</span>
                  <span className="text-lg">Zero data entry - fully automated</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Technical Innovation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-10">
            <Brain className="w-10 h-10 inline-block mr-3 text-teal-400" />
            Powered by Advanced AI Technology
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Natural Language Processing', value: 'GPT-4 Level' },
              { label: 'WHO Database Integration', value: '500K+ Cases' },
              { label: 'Real-time Analysis', value: '<2 Second Response' },
              { label: 'Predictive Modeling', value: 'Smart AI' },
              { label: 'Auto-Classification', value: '47 Drug Categories' },
              { label: 'Pattern Recognition', value: 'ML-Powered' },
              { label: 'Alert Routing', value: 'Smart Triage' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-xl p-4 border border-white/20"
              >
                <p className="text-blue-200 text-sm mb-1">{tech.label}</p>
                <p className="text-white font-bold text-lg">{tech.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={onOpenChat}
            className="group bg-gradient-to-r from-teal-400 via-blue-400 to-green-400 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-teal-400/50 transition-all hover:scale-105"
          >
            <span className="flex items-center gap-3">
              Try AI Auto-Reporting Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          <p className="text-blue-200 mt-4">Experience the future of pharmacovigilance in real-time</p>
        </motion.div>
      </div>
    </section>
  );
}