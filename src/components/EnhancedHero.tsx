import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, AlertCircle, Shield, CheckCircle } from 'lucide-react';

interface EnhancedHeroProps {
  onNavigate?: (page: string) => void;
}

export function EnhancedHero({ onNavigate }: EnhancedHeroProps) {
  return (
    <div className="pt-24 pb-20 bg-gradient-to-br from-white via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => onNavigate?.('AIHealthcareAutomation')}
            className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-full px-6 py-2 text-white shadow-lg flex items-center gap-2 hover:from-blue-700 hover:to-teal-700 transition-all transform hover:scale-105"
          >
            <span className="text-sm font-semibold">🤖 AI Healthcare Automation</span>
          </button>
          <button
            onClick={() => onNavigate?.('PharmaceuticalsOncology')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-2 text-white shadow-lg flex items-center gap-2 hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            <span className="text-sm font-semibold">💊 Pharmaceuticals & Oncology</span>
          </button>
        </motion.div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              Improving Drug Safety Through
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Better Reporting</span>
            </h1>

            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-800 mb-2">The Problem:</p>
                  <p className="text-slate-700 leading-relaxed">
                    Adverse drug reactions and chemotherapy side effects are <strong>severely under-reported</strong>. 
                    Healthcare systems lack effective, accessible tools for patients and clinicians to report safety concerns. 
                    This creates dangerous gaps in pharmacovigilance and patient safety monitoring.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Statement */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-800 mb-2">Our Solution:</p>
                  <p className="text-slate-700 leading-relaxed">
                    <strong>ChemoVigi</strong> provides a secure, simple, and scalable platform for reporting adverse drug events, 
                    chemotherapy side effects, and substandard medications. With AI-assisted severity triage and clinician review, 
                    we make pharmacovigilance accessible, trustworthy, and actionable.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate?.('Register')}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate?.('About')}
                className="bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Video Explainer Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Video Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-center">
              <h3 className="text-white font-semibold text-xl mb-2">
                See How ChemoVigi Works
              </h3>
              <p className="text-blue-100">
                Watch our 2-minute explainer video
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="relative aspect-video bg-slate-900">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl mb-6 hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>

                <p className="text-white text-lg font-semibold">Click to Play Video</p>
                <p className="text-slate-400 text-sm mt-2">(Video integration ready for Vimeo/YouTube embed)</p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
            </div>

            {/* Video Caption */}
            <div className="p-6 bg-slate-50 text-center">
              <p className="text-slate-700">
                <strong>From Report to Resolution:</strong> Learn how ChemoVigi helps patients report symptoms, 
                AI triages severity, clinicians review cases, and everyone benefits from safer medication outcomes.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-600"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold">HIPAA-Ready Design</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold">Clinician Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold">Future-Ready Platform</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
