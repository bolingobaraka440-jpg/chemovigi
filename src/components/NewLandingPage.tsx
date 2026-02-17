import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, AlertCircle, Shield, CheckCircle, Play, FileText, Brain, UserCheck, Sparkles, Lock, Zap, TrendingUp, Building2, HeartPulse, Globe, Users, ChevronDown, ExternalLink, BookOpen, Activity, ClipboardCheck, Pill, Calculator } from 'lucide-react';
import { ADRPreventionSection } from './ADRPreventionSection';
import { RwandaFDAPartnership } from './RwandaFDAPartnership';

interface NewLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function NewLandingPage({ onGetStarted, onLogin }: NewLandingPageProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'how-it-works', 'features', 'drug-info', 'partners'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection('overview')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CV</span>
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-blue-600 font-bold text-xl">Chemo</span>
                  <span className="text-teal-600 font-bold text-xl">Vigi</span>
                </div>
              </div>
            </motion.div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'features', label: 'Features' },
                { id: 'drug-info', label: 'Drug Info' },
                { id: 'partners', label: 'Partners' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-medium transition-colors ${
                    activeSection === item.id ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLogin}
                className="px-6 py-2 text-slate-700 font-semibold hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* SECTION 1: THE CRITICAL HEALTH CHALLENGE - NOW FIRST */}
      <section id="overview" className="relative pt-32 pb-20 bg-white overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Alert Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-100 border-2 border-red-300 rounded-full px-5 py-2 mb-8 shadow-lg"
            >
              <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="text-sm font-bold text-red-800 uppercase tracking-wide">Critical Health Challenge</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight mb-8">
              The Problem We're Solving
            </h1>
          </motion.div>

          {/* Animated Problem Cards with Slide-In Effect */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white border-4 border-red-300 rounded-3xl p-8 shadow-2xl h-full relative overflow-hidden"
              >
                {/* Animated background pulse */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-red-900 mb-4">1.3M+</h3>
                  <p className="text-lg text-slate-700 font-semibold mb-3">Emergency Visits</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Adverse drug reactions cause over <strong>1.3 million emergency department visits</strong> annually 
                    in the United States alone, yet most could be prevented with better monitoring.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white border-4 border-orange-300 rounded-3xl p-8 shadow-2xl h-full relative overflow-hidden"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 bg-orange-500 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-orange-900 mb-4">94%</h3>
                  <p className="text-lg text-slate-700 font-semibold mb-3">Underreported</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>94% of adverse drug reactions go unreported</strong> due to complex reporting systems, 
                    lack of awareness, and time constraints faced by healthcare providers and patients.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white border-4 border-purple-300 rounded-3xl p-8 shadow-2xl h-full relative overflow-hidden"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute inset-0 bg-purple-500 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-purple-900 mb-4">45-46%</h3>
                  <p className="text-lg text-slate-700 font-semibold mb-3">Preventable</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Research shows that <strong>45-46% of adverse drug reactions are preventable</strong> through 
                    better reporting, monitoring, and early intervention systems.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Simple Hero Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Improving Drug Safety
                <br />
                Through Better Reporting
              </h2>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">
              ChemoVigi provides a simple, secure platform for reporting adverse drug events with AI-powered analysis 
              and clinical verification — making pharmacovigilance accessible and actionable for everyone.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-slate-700 px-10 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              Sign In
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm font-semibold">See How We Solve This</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section id="how-it-works" className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              How ChemoVigi Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A seamless, intelligent workflow connecting patients, AI technology, and healthcare professionals.
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-teal-200 to-green-200 -translate-y-1/2" style={{ width: 'calc(100% - 10rem)', left: '5rem' }} />

            <div className="grid lg:grid-cols-4 gap-12">
              {[
                {
                  step: 1,
                  icon: FileText,
                  title: 'Patient Reports',
                  description: 'Users quickly report adverse reactions or medication concerns through our secure, mobile-friendly platform.',
                  color: 'from-blue-500 to-blue-600',
                  details: ['3-minute simple forms', 'Photo upload support', 'Anonymous option available']
                },
                {
                  step: 2,
                  icon: Brain,
                  title: 'AI Analysis',
                  description: 'Advanced machine learning analyzes the report instantly, classifies severity using WHO criteria, and flags urgent cases.',
                  color: 'from-purple-500 to-purple-600',
                  details: ['Severity scoring (1-5)', 'Drug interaction checks', 'Instant triage decisions']
                },
                {
                  step: 3,
                  icon: UserCheck,
                  title: 'Clinician Review',
                  description: 'Verified healthcare professionals review flagged cases, add clinical context, and provide evidence-based guidance.',
                  color: 'from-teal-500 to-teal-600',
                  details: ['Board-certified reviewers', 'Treatment recommendations', 'Follow-up protocols']
                },
                {
                  step: 4,
                  icon: Shield,
                  title: 'Safer Outcomes',
                  description: 'Better monitoring, faster responses, and data-driven insights lead to improved patient safety worldwide.',
                  color: 'from-green-500 to-green-600',
                  details: ['Patient notifications', 'Regulatory reporting', 'Global safety data']
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-32 h-32 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-2xl mb-6 relative z-10`}
                  >
                    <item.icon className="w-14 h-14 text-white" />
                    
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700 shadow-lg">
                      {item.step}
                    </div>
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="bg-white rounded-xl p-4 text-left shadow-lg">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
            >
              Experience the Workflow
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ADR PREVENTION SECTION */}
      <ADRPreventionSection />

      {/* RWANDA FDA PARTNERSHIP */}
      <RwandaFDAPartnership />

      {/* SECTION 3: FEATURES */}
      <section id="features" className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Powerful Features for Complete Safety
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need for comprehensive pharmacovigilance and patient safety monitoring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Quick Reporting',
                description: 'Report adverse events in minutes with our intuitive interface.',
                gradient: 'from-blue-500 to-blue-600',
                features: ['Mobile-optimized', 'Multi-language', 'Photo upload'],
              },
              {
                icon: Brain,
                title: 'AI-Powered Triage',
                description: 'Real-time analysis and severity classification using WHO criteria.',
                gradient: 'from-purple-500 to-purple-600',
                features: ['Real-time analysis', 'WHO scoring', 'Drug interaction alerts'],
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Bank-level encryption and HIPAA-ready design.',
                gradient: 'from-teal-500 to-teal-600',
                features: ['End-to-end encryption', 'HIPAA compliance', 'Audit logging'],
              },
              {
                icon: Users,
                title: 'Dual Interface',
                description: 'Optimized experiences for both patients and healthcare professionals.',
                gradient: 'from-green-500 to-green-600',
                features: ['Patient portal', 'Clinical dashboard', 'Smart notifications'],
              },
              {
                icon: TrendingUp,
                title: 'Analytics & Insights',
                description: 'Comprehensive reporting and data visualization.',
                gradient: 'from-orange-500 to-orange-600',
                features: ['Real-time dashboards', 'Trend visualization', 'Export capabilities'],
              },
              {
                icon: Pill,
                title: 'Drug Database',
                description: 'Access comprehensive drug information and personalized dosing.',
                gradient: 'from-pink-500 to-pink-600',
                features: ['15+ drugs', 'Dosage calculator', 'Safety warnings'],
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 hover:border-blue-300 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl inline-flex items-center gap-2"
            >
              Explore All Features
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: DRUG INFO PREVIEW */}
      <section id="drug-info" className="relative py-32 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
              <Pill className="w-5 h-5" />
              <span className="font-semibold">Drug Information & Dosage Calculator</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Comprehensive Drug Database
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Access detailed information about chemotherapy and cancer drugs. Get personalized dosage recommendations 
              based on your age, sex, weight, and height.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">15+ Drugs Available</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Comprehensive information on chemotherapy drugs including Doxorubicin, Paclitaxel, Cisplatin, 
                Methotrexate, and many more. Each entry includes side effects, warnings, storage, and interactions.
              </p>
              <ul className="space-y-3">
                {['Dosage information for all age groups', 'Weight-based calculations', 'Safety warnings and precautions', 'Drug interaction alerts'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">AI-Powered Dosage Calculator</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Get personalized medication dosage recommendations based on your specific metrics. Our AI analyzes 
                your age, sex, weight, and height to provide safe, accurate dosing guidance.
              </p>
              <ul className="space-y-3">
                {['Personalized for your metrics', 'BSA-based calculations', 'Age-appropriate dosing', 'AI verification and guidance'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl inline-flex items-center gap-2"
            >
              <Pill className="w-5 h-5" />
              Explore Drug Database
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: PARTNERS */}
      <section id="partners" className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Building a Safer Healthcare Ecosystem
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Collaborating with regulatory bodies, healthcare institutions, and research organizations 
              to strengthen global pharmacovigilance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Regulatory Bodies',
                description: 'Partnerships with WHO, FDA, and national centers.',
                color: 'blue',
              },
              {
                icon: HeartPulse,
                title: 'Healthcare Institutions',
                description: 'Hospitals and cancer treatment centers.',
                color: 'teal',
              },
              {
                icon: Globe,
                title: 'Research Organizations',
                description: 'Universities and clinical trials.',
                color: 'purple',
              },
              {
                icon: Users,
                title: 'Patient Advocacy',
                description: 'Support networks and safety organizations.',
                color: 'green',
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-slate-200 hover:border-blue-300 transition-all text-center"
              >
                <div className={`w-14 h-14 bg-${category.color}-100 rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <category.icon className={`w-7 h-7 text-${category.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{category.title}</h3>
                <p className="text-slate-600 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl inline-flex items-center gap-2"
            >
              Join the Network
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-teal-600 to-green-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make Drug Safety Better?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of patients and healthcare professionals making pharmacovigilance accessible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                Get Started Free
              </motion.button>
              <motion.button
                onClick={onLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
