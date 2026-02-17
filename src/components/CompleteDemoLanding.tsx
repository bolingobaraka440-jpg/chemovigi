import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, AlertCircle, Shield, CheckCircle, Play, FileText, Brain, UserCheck, Sparkles, Lock, Zap, TrendingUp, Building2, HeartPulse, Globe, Users, ChevronDown, ExternalLink, BookOpen, Activity, ClipboardCheck } from 'lucide-react';
import { ADRPreventionSection } from './ADRPreventionSection';
import { RwandaFDAPartnership } from './RwandaFDAPartnership';

interface CompleteDemoLandingProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function CompleteDemoLanding({ onGetStarted, onLogin }: CompleteDemoLandingProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const { scrollY } = useScroll();
  
  // Parallax effect for hero
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
      const sections = ['overview', 'how-it-works', 'features', 'partners'];
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

      {/* SECTION 1: OVERVIEW / HERO */}
      <section id="overview" className="relative pt-24 pb-32 bg-white overflow-hidden">
        {/* Animated Background Orbs - CONTAINED */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-40 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 w-full z-10"
        >
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 mb-6 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Professional Pharmacovigilance Platform</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight mb-6">
                Improving Drug Safety
                <br />
                Through{' '}
                <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                  Better Reporting
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed">
                A complete platform for adverse event reporting, chemotherapy side effect monitoring, 
                and patient safety — powered by AI and trusted by healthcare professionals.
              </p>

              {/* Problem & Solution Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white border-2 border-red-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 mb-2">The Problem</p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Adverse drug reactions cause over <strong>1.3 million emergency visits</strong> annually in the US alone. 
                        Yet 94% of reactions go unreported due to complex systems, lack of awareness, and time constraints.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 mb-2">Our Solution</p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        ChemoVigi makes reporting <strong>simple, secure, and actionable</strong>. AI analyzes reports in real-time, 
                        clinicians verify findings, and regulatory insights drive safer medication practices globally.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Overview Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mb-10 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">3 min</div>
                  <div className="text-sm text-slate-600">Average Report Time</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-3xl font-bold text-teal-600 mb-1">AI-Powered</div>
                  <div className="text-sm text-slate-600">Severity Detection</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">24/7</div>
                  <div className="text-sm text-slate-600">Clinician Support</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-4 mb-12"
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

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                {[
                  { icon: CheckCircle, text: 'HIPAA-Ready Design' },
                  { icon: Lock, text: 'Bank-Level Security' },
                  { icon: Shield, text: 'Clinician Verified' },
                  { icon: Zap, text: 'AI-Powered Analysis' }
                ].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex items-center gap-2 text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <badge.icon className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Video Section - TRULY outside parallax wrapper now */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="relative max-w-5xl mx-auto px-6 w-full z-10 mt-20"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-200 hover:border-blue-300 transition-all">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-center">
                <h3 className="text-white font-bold text-2xl mb-2 flex items-center justify-center gap-2">
                  <Play className="w-6 h-6" />
                  Understanding Pharmacovigilance & Drug Safety
                </h3>
                <p className="text-blue-100">Learn why adverse event reporting saves lives</p>
              </div>

              <div className="relative aspect-video bg-slate-900">
                {/* WHO Pharmacovigilance Educational Video */}
                <iframe
                  src="https://www.youtube.com/embed/EJCxgt7Qb1k"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Pharmacovigilance and Drug Safety Overview"
                />
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 text-center">
                <p className="text-slate-700 font-medium mb-4">
                  <strong>Why Reporting Matters:</strong> See how pharmacovigilance systems monitor medication safety, 
                  detect adverse reactions, and protect patients worldwide.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>Real-time Monitoring</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClipboardCheck className="w-4 h-4 text-teal-600" />
                    <span>Clinical Verification</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span>Global Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-16 relative z-10"
          >
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm font-semibold">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section id="how-it-works" className="relative py-32 bg-white overflow-hidden z-10">
        {/* Background Pattern */}
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
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              A seamless, intelligent workflow connecting patients, cutting-edge AI technology, 
              and experienced healthcare professionals for faster, safer medication monitoring.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">100% Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">Real-Time AI Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">Expert Clinical Review</span>
              </div>
            </div>
          </motion.div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-teal-200 to-green-200 -translate-y-1/2" style={{ width: 'calc(100% - 10rem)', left: '5rem' }} />

            <div className="grid lg:grid-cols-4 gap-12">
              {[
                {
                  step: 1,
                  icon: FileText,
                  title: 'Patient Reports',
                  description: 'Users quickly report adverse reactions, chemotherapy side effects, or medication concerns through our secure, mobile-friendly platform.',
                  color: 'from-blue-500 to-blue-600',
                  details: [
                    '3-minute simple forms',
                    'Photo upload support',
                    'Multi-language interface',
                    'Anonymous option available'
                  ]
                },
                {
                  step: 2,
                  icon: Brain,
                  title: 'AI Analysis',
                  description: 'Advanced machine learning analyzes the report instantly, classifies severity using WHO criteria, and flags urgent cases requiring immediate clinical attention.',
                  color: 'from-purple-500 to-purple-600',
                  details: [
                    'Severity scoring (1-5)',
                    'Drug interaction checks',
                    'Pattern recognition',
                    'Instant triage decisions'
                  ]
                },
                {
                  step: 3,
                  icon: UserCheck,
                  title: 'Clinician Review',
                  description: 'Verified healthcare professionals review flagged cases, add clinical context, confirm diagnoses, and provide evidence-based medical guidance.',
                  color: 'from-teal-500 to-teal-600',
                  details: [
                    'Board-certified reviewers',
                    'Clinical documentation',
                    'Treatment recommendations',
                    'Follow-up protocols'
                  ]
                },
                {
                  step: 4,
                  icon: Shield,
                  title: 'Safer Outcomes',
                  description: 'Better monitoring, faster regulatory responses, and data-driven insights lead to improved patient safety, medication adjustments, and healthcare quality worldwide.',
                  color: 'from-green-500 to-green-600',
                  details: [
                    'Patient notifications',
                    'Regulatory reporting',
                    'Trend analysis',
                    'Global safety data'
                  ]
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
                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-32 h-32 mx-auto bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-2xl mb-6 relative z-10`}
                  >
                    <item.icon className="w-14 h-14 text-white" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700 shadow-lg">
                      {item.step}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Details List */}
                    <div className="bg-slate-50 rounded-xl p-4 text-left">
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

          {/* Process Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-10 border-2 border-blue-200"
          >
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">
              Why This Process Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Speed</h4>
                <p className="text-sm text-slate-600">
                  AI processes reports in seconds, not days. Urgent cases get immediate attention.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Accuracy</h4>
                <p className="text-sm text-slate-600">
                  AI + Human expertise ensures reliable severity classification and clinical decisions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Impact</h4>
                <p className="text-sm text-slate-600">
                  Data-driven insights improve drug safety policies and save lives globally.
                </p>
              </div>
            </div>
          </motion.div>

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
      <section id="features" className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
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
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Everything you need for comprehensive pharmacovigilance, adverse event management, 
              and patient safety monitoring — all in one secure platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Quick Reporting',
                description: 'Report adverse events in minutes with our intuitive, mobile-friendly interface. No complex forms, medical jargon, or technical knowledge required.',
                gradient: 'from-blue-500 to-blue-600',
                features: ['Mobile-optimized design', 'Multi-language support', 'Offline capability', 'Photo/document upload'],
                link: 'QuickReporting'
              },
              {
                icon: Brain,
                title: 'AI-Powered Triage',
                description: 'Advanced machine learning algorithms analyze reports in real-time, classify severity using WHO criteria, and prioritize urgent cases automatically.',
                gradient: 'from-purple-500 to-purple-600',
                features: ['Real-time analysis', 'WHO severity scoring', 'Pattern detection', 'Drug interaction alerts'],
                link: 'AISeverity'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Bank-level encryption, HIPAA-ready design, and strict privacy controls protect sensitive health information at every step.',
                gradient: 'from-teal-500 to-teal-600',
                features: ['End-to-end encryption', 'HIPAA compliance ready', 'Role-based access', 'Audit logging'],
                link: 'SecureAccounts'
              },
              {
                icon: Users,
                title: 'Dual Interface',
                description: 'Separate optimized experiences for patients and healthcare professionals, each with appropriate tools, dashboards, and workflows.',
                gradient: 'from-green-500 to-green-600',
                features: ['Patient-friendly portal', 'Clinical dashboard', 'Seamless collaboration', 'Smart notifications'],
                link: 'Home'
              },
              {
                icon: TrendingUp,
                title: 'Analytics & Insights',
                description: 'Comprehensive reporting, trend analysis, and data visualization help identify patterns, make informed decisions, and improve safety outcomes.',
                gradient: 'from-orange-500 to-orange-600',
                features: ['Real-time dashboards', 'Custom reports', 'Trend visualization', 'Export capabilities'],
                link: 'Research'
              },
              {
                icon: Globe,
                title: 'Drug Database',
                description: 'Access standardized chemotherapy drug information, safety warnings, usage guidelines, and storage instructions — no login required.',
                gradient: 'from-pink-500 to-pink-600',
                features: ['Searchable database', 'Safety warnings', 'Storage guidelines', 'Dosage information'],
                link: 'Drug Info'
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

                <div className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => {
                    onGetStarted();
                    // Navigate to specific feature page after entering app
                  }}
                  className="w-full bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-100 hover:to-teal-100 text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore This Feature</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-3xl p-10 shadow-2xl border-2 border-blue-200"
          >
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">
              Plus Many More Features
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, text: 'Research Library' },
                { icon: Activity, text: 'Live Monitoring' },
                { icon: ClipboardCheck, text: 'Compliance Tools' },
                { icon: HeartPulse, text: 'Patient Support' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

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
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl inline-flex items-center gap-2"
            >
              Explore All Features
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PARTNERS */}
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
              Collaborating with regulatory bodies, healthcare institutions, research organizations, 
              and patient advocacy groups to strengthen global pharmacovigilance and medication safety.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: Shield,
                title: 'Regulatory Bodies',
                description: 'Future partnerships with WHO, FDA, EMA, and national pharmacovigilance centers to align with global drug safety standards.',
                color: 'blue',
                partners: ['WHO Programs', 'FDA MedWatch', 'EMA Safety', 'National Centers']
              },
              {
                icon: HeartPulse,
                title: 'Healthcare Institutions',
                description: 'Collaborating with hospitals, cancer treatment centers, and clinical networks to improve real-world safety monitoring.',
                color: 'teal',
                partners: ['Cancer Centers', 'Teaching Hospitals', 'Community Clinics', 'Health Networks']
              },
              {
                icon: Globe,
                title: 'Research Organizations',
                description: 'Supporting academic institutions, clinical trials, and pharmacovigilance studies with secure data and insights.',
                color: 'purple',
                partners: ['Universities', 'Research Institutes', 'Clinical Trials', 'Global Health Orgs']
              },
              {
                icon: Users,
                title: 'Patient Advocacy',
                description: 'Empowering patient voices, safety awareness campaigns, and support networks to improve medication literacy.',
                color: 'green',
                partners: ['Advocacy Groups', 'Support Networks', 'Safety Organizations', 'Patient Communities']
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border-2 border-slate-200 hover:border-blue-300 transition-all"
              >
                <div className={`w-14 h-14 bg-${category.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                  <category.icon className={`w-7 h-7 text-${category.color}-600`} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {category.title}
                </h3>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2">
                  {category.partners.map((partner, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{partner}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                    Future Partnership
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partnership Principles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-12 border-2 border-blue-200"
          >
            <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">
              Our Partnership Principles
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Privacy First',
                  description: 'Patient confidentiality and data protection are non-negotiable in every partnership. All collaborations meet strictest privacy standards.'
                },
                {
                  icon: Globe,
                  title: 'Open Collaboration',
                  description: 'Transparent communication, shared goals, and mutual respect drive our ecosystem forward. We believe in collective impact.'
                },
                {
                  icon: HeartPulse,
                  title: 'Patient-Centric',
                  description: 'Every partnership prioritizes improving patient safety, healthcare outcomes, and medication quality of life above all else.'
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <principle.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-teal-600 to-green-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-96 h-96 border-8 border-white rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] border-8 border-white rounded-full"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Improve Drug Safety?
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Join ChemoVigi today and be part of the future of pharmacovigilance. 
              Report safely, get AI-powered insights, and contribute to global medication safety.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-12 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              >
                Get Started Free
              </motion.button>
              <motion.button
                onClick={onLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-800 text-white px-12 py-5 rounded-xl font-bold text-xl shadow-2xl border-2 border-white/20 hover:bg-blue-900 transition-all"
              >
                Sign In
              </motion.button>
            </div>

            <div className="mt-12 text-blue-100">
              <p className="text-sm">No credit card required • Get started in minutes • Professional support included</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CV</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-blue-400 font-bold text-xl">Chemo</span>
                <span className="text-teal-400 font-bold text-xl">Vigi</span>
              </div>
            </div>
            <p className="text-slate-400 mb-2">
              Professional pharmacovigilance and drug safety platform
            </p>
            <p className="text-slate-500 text-sm">
              © 2024 ChemoVigi. Improving patient safety through better reporting.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}