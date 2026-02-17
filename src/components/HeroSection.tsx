import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Strip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
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

        <div className="grid lg:grid-cols-2 gap-0 min-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          {/* LEFT SIDE - White Text Panel */}
          <div className="relative bg-white p-12 lg:p-16 flex flex-col justify-center">
            {/* Blurred Medical Background */}
            <div 
              className="absolute inset-0 opacity-75 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1760074032600-36943c264fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZHJ1ZyUyMHNhZmV0eXxlbnwxfHx8fDE3NjU0ODQ4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
                filter: 'blur(0px)'
              }}
            />

            {/* White overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-white/50"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 leading-tight mb-6">
                  Report, Monitor, and Get AI-Guided Advice on Chemotherapy Side Effects
                </h1>
                
                <p className="text-gray-900 mb-8 max-w-lg text-lg">
                  <strong>Quickly report symptoms, track severity, and receive AI-supported guidance in real time.</strong>
                </p>

                {/* Feature Bullets - Now Clickable */}
                <div className="space-y-3 mb-10">
                  <button
                    onClick={() => onNavigate?.('QuickReporting')}
                    className="flex items-center gap-3 text-gray-900 w-full text-left group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-blue-600 transition-colors"><strong>Quick and easy reporting</strong></span>
                  </button>
                  <button
                    onClick={() => onNavigate?.('AISeverity')}
                    className="flex items-center gap-3 text-gray-900 w-full text-left group hover:bg-teal-50 p-3 rounded-lg transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-teal-600 transition-colors"><strong>AI-powered severity detection</strong></span>
                  </button>
                  <button
                    onClick={() => onNavigate?.('SecureAccounts')}
                    className="flex items-center gap-3 text-gray-900 w-full text-left group hover:bg-green-50 p-3 rounded-lg transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-green-600 transition-colors"><strong>Secure patient accounts</strong></span>
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onNavigate?.('Register')}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white hover:scale-105 transition-transform duration-300 shadow-lg flex items-center gap-2"
                  >
                    GET STARTED
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onNavigate?.('About')}
                    className="px-8 py-3 rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  >
                    LEARN MORE
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE - Gradient + Animation */}
          <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 p-12 lg:p-16 flex items-center justify-center overflow-hidden">
            {/* Diagonal Divider Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent opacity-30 -skew-x-12 transform -translate-x-8"></div>
            
            {/* Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20"></div>

            {/* Animation Container */}
            <div className="relative z-10">
              {/* Outer Glow Ring */}
              <motion.div
                className="relative w-80 h-80 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                  boxShadow: '0 0 80px rgba(255,255,255,0.3)'
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Inner Rotating Capsule */}
                <motion.div
                  className="absolute inset-8 rounded-full bg-white/90 backdrop-blur-sm shadow-2xl flex items-center justify-center overflow-hidden"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {/* People Icons Image */}
                  <img 
                    src="https://images.unsplash.com/vector-1739672892648-7378e9ebec1f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    className="w-32 h-32 object-contain"
                    style={{ transform: 'rotate(-360deg)' }}
                  />
                </motion.div>

                {/* Floating Orb 1 - Safety Icon */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white shadow-xl border-2 border-blue-200 flex items-center justify-center overflow-hidden"
                  animate={{
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1649262050717-d8e1e7abef13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBtZWRpY2FsJTIwaWNvbnxlbnwxfHx8fDE3NjU0ODQ4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Safety"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </motion.div>

                {/* Floating Orb 2 - Healthcare Icon */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white shadow-xl border-2 border-green-200 flex items-center justify-center overflow-hidden"
                  animate={{
                    y: [10, -10, 10],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU0MzA5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Healthcare"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </motion.div>
              </motion.div>

              {/* Caption */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-white text-lg mb-2">AI-aware monitoring</p>
                <p className="text-white/80 text-sm">Real-time alerts • Patient safety • Clinical insights</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}