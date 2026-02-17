import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, CheckCircle, AlertTriangle, FileText, ArrowRight, Bot, User as UserIcon } from 'lucide-react';
import { Report } from '../App';
import { PatientQuickReportForm } from './PatientQuickReportForm';

interface EnhancedQuickReportingPageProps {
  onNavigate: (page: string) => void;
  onReportSubmit: (report: Report) => void;
  userName: string;
  userEmail: string;
  onOpenChat: () => void;
}

export function EnhancedQuickReportingPage({ 
  onNavigate, 
  onReportSubmit, 
  userName, 
  userEmail,
  onOpenChat 
}: EnhancedQuickReportingPageProps) {
  const [step, setStep] = useState<'choice' | 'form'>('choice');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: CHOICE */}
          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <FileText className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-5xl font-bold text-slate-800 mb-4">Report Side Effects</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Choose how you'd like to report your medication side effects
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* QUICK FORM */}
                <motion.button
                  onClick={() => setStep('form')}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border-2 border-blue-300 rounded-3xl p-8 text-left hover:border-blue-500 hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Quick Form</h3>
                  <p className="text-slate-600 mb-6">
                    Fill out a simple form with medication details and symptoms. Fast and straightforward.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.button>

                {/* AI CHAT ASSISTANCE */}
                <motion.button
                  onClick={() => {
                    onOpenChat();
                    // Could set step to 'ai' if you want to track this
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 text-left hover:shadow-2xl transition-all text-white"
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Talk to AI Assistant</h3>
                  <p className="text-teal-50 mb-6">
                    Chat with our AI to describe your symptoms naturally. It will help create a detailed report for you.
                  </p>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Sparkles className="w-5 h-5" />
                    <span>Start Conversation</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm text-white">
                    💡 Recommended: AI helps analyze severity and provides clinical insights
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: FORM */}
          {step === 'form' && (
            <PatientQuickReportForm
              onNavigate={onNavigate}
              onReportSubmit={onReportSubmit}
              userName={userName}
              userEmail={userEmail}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}