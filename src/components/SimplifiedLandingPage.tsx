import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, CheckCircle, Lock, Zap, ChevronDown, Sparkles, Brain, Users, HeartPulse, Play, X } from 'lucide-react';
import { AIAutoReportingShowcase } from './AIAutoReportingShowcase';
import { ChemoVigiLogo } from './ChemoVigiLogo';

interface SimplifiedLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function SimplifiedLandingPage({ onGetStarted, onLogin }: SimplifiedLandingPageProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <ChemoVigiLogo 
              size="small"
              showText={true}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Simple Nav Links - Removed Partners */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#overview" className="text-slate-700 hover:text-blue-600 font-semibold transition-colors">Overview</a>
              <a href="#features" className="text-slate-700 hover:text-blue-600 font-semibold transition-colors">Features</a>
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

      {/* HERO SECTION - Split Layout */}
      <section id="overview" className="relative pt-32 pb-20 min-h-screen flex items-center bg-gradient-to-br from-white via-blue-50/30 to-teal-50/30">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT - Text */}
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
                ChemoVigi provides a simple, secure platform for reporting adverse drug reactions with AI-powered 
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
                <motion.button
                  onClick={() => setIsVideoModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl border-2 border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Our Video
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

            {/* RIGHT - 3D DNA Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] flex items-center justify-center"
            >
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
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                      />
                      <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                      />
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
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 + 0.5 }}
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
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
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
            <a
              href="#features"
              className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-sm font-semibold">See our features</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION - AI AUTO-REPORTING SHOWCASE */}
      <section id="features">
        <AIAutoReportingShowcase onOpenChat={onLogin} />
      </section>

      {/* FOOTER CTA */}
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
            <p className="text-xl text-blue-100 mb-8">
              Join healthcare providers worldwide in improving adverse drug reaction reporting
            </p>
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

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CV</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-blue-400 font-bold text-xl">Chemo</span>
                    <span className="text-teal-400 font-bold text-xl">Vigi</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Improving Drug Safety Through Better Reporting
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>📧 chemovigi.official@gmail.com</p>
                <p>📱 +250 795 127 587</p>
                <p>📱 +250 780 606 332</p>
                <p>📸 @chemovigi_official</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Platform</h3>
              <div className="space-y-2">
                <button onClick={onGetStarted} className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Get Started
                </button>
                <button onClick={onLogin} className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Sign In
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} ChemoVigi. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setIsVideoModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-6xl mx-4 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-800/90 hover:bg-slate-700 text-white p-3 rounded-full transition-all shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <video
                className="w-full h-full"
                controls
                autoPlay
                src="/videos/chemovigi.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="p-6 bg-gradient-to-r from-blue-900 to-teal-900">
              <h3 className="text-2xl font-bold text-white mb-2">ChemoVigi Platform Overview</h3>
              <p className="text-blue-100">Discover how ChemoVigi is revolutionizing adverse drug reaction reporting with AI-powered analysis and clinical verification.</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}