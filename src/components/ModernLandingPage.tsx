import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, AlertCircle, Shield, CheckCircle, Play, FileText, Brain, UserCheck, Sparkles, Lock, Zap, TrendingUp, Building2, HeartPulse, Globe, Users, ChevronDown, ExternalLink, BookOpen, Activity, ClipboardCheck, Pill, Calculator } from 'lucide-react';
import { ADRPreventionSection } from './ADRPreventionSection';
import { RwandaFDAPartnership } from './RwandaFDAPartnership';
import { AIAutoReportingShowcase } from './AIAutoReportingShowcase';

interface ModernLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function ModernLandingPage({ onGetStarted, onLogin }: ModernLandingPageProps) {
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
      const sections = ['overview', 'adr-prevention', 'problem', 'how-it-works', 'features', 'partners'];
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

      {/* SECTION 1: SPLIT HERO - Left: Text, Right: 3D Molecule Animation */}
      <section id="overview" className="relative pt-32 pb-20 min-h-screen flex items-center bg-gradient-to-br from-white via-blue-50/30 to-teal-50/30 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Professional Pharmacovigilance Platform</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                  Improving Drug Safety
                </span>
                <br />
                Through Better Reporting
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                ChemoVigi provides a simple, secure platform for reporting adverse drug events with AI-powered 
                analysis and clinical verification — making pharmacovigilance accessible and actionable for everyone.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
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
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {[
                  { icon: CheckCircle, text: 'HIPAA-Ready' },
                  { icon: Lock, text: 'Secure' },
                  { icon: Shield, text: 'Verified' },
                  { icon: Zap, text: 'AI-Powered' }
                ].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="flex items-center gap-2 text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
                  >
                    <badge.icon className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE - 3D Molecule/DNA Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] flex items-center justify-center"
            >
              {/* Animated DNA Strand */}
              <div className="relative w-full h-full">
                {/* Central Helix */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`helix-${i}`}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: `${i * 50}px` }}
                    animate={{
                      rotateZ: [0, 360],
                      x: [0, 30, 0, -30, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'linear',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Left Sphere */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            '0 0 20px rgba(59, 130, 246, 0.5)',
                            '0 0 40px rgba(59, 130, 246, 0.8)',
                            '0 0 20px rgba(59, 130, 246, 0.5)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                      
                      {/* Connection Line */}
                      <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                      
                      {/* Right Sphere */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 shadow-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            '0 0 20px rgba(20, 184, 166, 0.5)',
                            '0 0 40px rgba(20, 184, 166, 0.8)',
                            '0 0 20px rgba(20, 184, 166, 0.5)',
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.15 + 0.5,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Floating Molecules */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`molecule-${i}`}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, 20, 0],
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 6 + Math.random() * 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                  >
                    <div className="relative">
                      <motion.div
                        className={`w-6 h-6 rounded-full ${
                          i % 3 === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                          i % 3 === 1 ? 'bg-gradient-to-br from-teal-400 to-teal-600' :
                          'bg-gradient-to-br from-green-400 to-green-600'
                        } shadow-lg`}
                        animate={{
                          boxShadow: [
                            '0 0 15px rgba(59, 130, 246, 0.4)',
                            '0 0 30px rgba(20, 184, 166, 0.6)',
                            '0 0 15px rgba(34, 197, 94, 0.4)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                      {/* Connecting lines between nearby molecules */}
                      {i > 0 && i % 2 === 0 && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-300/40 to-transparent origin-left"
                          style={{ transform: 'rotate(45deg)' }}
                          animate={{ opacity: [0.2, 0.6, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Orbiting Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`orbit-${i}`}
                    className="absolute left-1/2 top-1/2"
                    style={{ transformOrigin: 'center' }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg"
                      style={{
                        transform: `translate(${100 + i * 30}px, 0)`,
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-green-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <button
              onClick={() => scrollToSection('adr-prevention')}
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
        </div>
      </section>

      {/* SECTION 2: ADR PREVENTION - 46% Statistic */}
      <section id="adr-prevention">
        <ADRPreventionSection />
      </section>

      {/* SECTION 3: THE CRITICAL HEALTH CHALLENGE - 3 Cards */}
      <section id="problem" className="relative py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-100 border-2 border-red-300 rounded-full px-5 py-2 mb-8"
            >
              <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />
              <span className="text-sm font-bold text-red-800 uppercase tracking-wide">Critical Health Challenge</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight mb-4">
              The Problem We're Solving
            </h2>
          </motion.div>

          {/* 3 Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white border-4 border-red-300 rounded-3xl p-8 shadow-2xl h-full relative overflow-hidden"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-red-900 mb-4">1.3M+</h3>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
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
                  <h3 className="text-4xl font-bold text-orange-900 mb-4">94%</h3>
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
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
                  <h3 className="text-4xl font-bold text-purple-900 mb-4">45-46%</h3>
                  <p className="text-lg text-slate-700 font-semibold mb-3">Preventable</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Research shows that <strong>45-46% of adverse drug reactions are preventable</strong> through 
                    better reporting, monitoring, and early intervention systems.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
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
                  description: 'Users quickly report adverse reactions through our secure platform.',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  step: 2,
                  icon: Brain,
                  title: 'AI Analysis',
                  description: 'Advanced ML analyzes reports instantly using WHO criteria.',
                  color: 'from-purple-500 to-purple-600',
                },
                {
                  step: 3,
                  icon: UserCheck,
                  title: 'Clinician Review',
                  description: 'Verified professionals review and provide evidence-based guidance.',
                  color: 'from-teal-500 to-teal-600',
                },
                {
                  step: 4,
                  icon: Shield,
                  title: 'Safer Outcomes',
                  description: 'Better monitoring leads to improved patient safety worldwide.',
                  color: 'from-green-500 to-green-600',
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
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RWANDA FDA PARTNERSHIP */}
      <RwandaFDAPartnership />

      {/* AI AUTO-REPORTING SHOWCASE */}
      <AIAutoReportingShowcase onOpenChat={onLogin} />

      {/* SECTION 5: FEATURES */}
      <section id="features" className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need for comprehensive pharmacovigilance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'Quick Reporting', gradient: 'from-blue-500 to-blue-600' },
              { icon: Brain, title: 'AI-Powered Triage', gradient: 'from-purple-500 to-purple-600' },
              { icon: Shield, title: 'Secure & Private', gradient: 'from-teal-500 to-teal-600' },
              { icon: Users, title: 'Dual Interface', gradient: 'from-green-500 to-green-600' },
              { icon: TrendingUp, title: 'Analytics', gradient: 'from-orange-500 to-orange-600' },
              { icon: Pill, title: 'Drug Database', gradient: 'from-pink-500 to-pink-600' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PARTNERS */}
      <section id="partners" className="relative py-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              Building a Safer Healthcare Ecosystem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Regulatory Bodies' },
              { icon: HeartPulse, title: 'Healthcare Institutions' },
              { icon: Globe, title: 'Research Organizations' },
              { icon: Users, title: 'Patient Advocacy' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl text-center"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <category.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
              </motion.div>
            ))}
          </div>
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
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05 }}
                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl"
              >
                Get Started Free
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}