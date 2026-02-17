import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, AlertCircle, Shield, CheckCircle, Play } from 'lucide-react';

interface DemoLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function DemoLandingPage({ onGetStarted, onLogin }: DemoLandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Demo Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CV</span>
              </div>
              <div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-blue-600 font-bold text-xl">Chemo</span>
                  <span className="text-teal-600 font-bold text-xl">Vigi</span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#overview" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Overview
              </a>
              <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="#features" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Features
              </a>
              <a href="#partners" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Partners
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLogin}
                className="px-6 py-2 text-slate-700 font-semibold hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="pt-32 pb-20 bg-gradient-to-br from-white via-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight mb-6">
                Improving Drug Safety Through
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Better Reporting</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8">
                A professional pharmacovigilance platform for adverse event reporting, 
                chemotherapy side effect monitoring, and patient safety.
              </p>

              {/* Problem & Solution */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                {/* Problem */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800 mb-2">The Problem</p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Adverse drug reactions are severely under-reported. Healthcare systems lack effective tools 
                        for patients and clinicians to report safety concerns, creating dangerous gaps in pharmacovigilance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Solution */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800 mb-2">Our Solution</p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        ChemoVigi provides secure, simple, and scalable reporting with AI-assisted severity triage 
                        and clinician review, making pharmacovigilance accessible, trustworthy, and actionable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onLogin}
                  className="bg-white text-slate-700 px-10 py-4 rounded-xl font-semibold text-lg shadow-lg border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  Sign In
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">HIPAA-Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Clinician Verified</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Video Header */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-center">
                <h3 className="text-white font-semibold text-xl mb-2">
                  See How ChemoVigi Works
                </h3>
                <p className="text-blue-100">
                  2-minute overview of our platform
                </p>
              </div>

              {/* Video Embed */}
              <div className="relative aspect-video bg-slate-900">
                {/* Actual Vimeo Embed - Medical explanation video */}
                <iframe
                  src="https://player.vimeo.com/video/76979871?h=8272c4e8b8&title=0&byline=0&portrait=0"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="ChemoVigi Platform Overview"
                />
              </div>

              {/* Caption */}
              <div className="p-6 bg-slate-50">
                <p className="text-slate-700 text-center">
                  <strong>From Report to Resolution:</strong> Learn how ChemoVigi connects patients, AI technology, 
                  and healthcare professionals to create a safer medication ecosystem.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2024 ChemoVigi. A professional pharmacovigilance and drug safety platform.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            This is a demonstration page. Click "Get Started" to access the full platform.
          </p>
        </div>
      </footer>
    </div>
  );
}