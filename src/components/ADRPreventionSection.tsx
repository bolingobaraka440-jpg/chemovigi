import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldCheck, TrendingDown, AlertCircle, CheckCircle, Activity, FileText } from 'lucide-react';

export function ADRPreventionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);

  // Counter animation for 45-46%
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 46;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Particle animation
  const particles = Array.from({ length: 20 });

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -20,
              opacity: 0 
            }}
            animate={isInView ? {
              y: window.innerHeight + 20,
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            } : {}}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full blur-sm"
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - Statistics & Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-300 rounded-full px-4 py-2 mb-4 shadow-lg"
              >
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Critical Healthcare Challenge</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                The Problem We're Solving
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Adverse Drug Reactions (ADRs) represent a significant public health challenge, 
                causing millions of emergency visits annually. The good news? Many are preventable.
              </p>
            </div>

            {/* Big Stat Display */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="relative bg-gradient-to-br from-blue-600 via-teal-600 to-green-600 rounded-3xl p-8 shadow-2xl overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white/90 font-semibold text-lg">Prevention is Possible</div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="text-7xl md:text-8xl font-bold text-white"
                    >
                      {count}%
                    </motion.div>
                    <div className="text-2xl text-white/80 font-semibold mb-2">of ADRs</div>
                  </div>
                  <div className="text-xl text-white/90 font-medium">
                    can be <span className="font-bold underline decoration-white/60 decoration-2 underline-offset-4">prevented</span> with better reporting
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Source: WHO Global Pharmacovigilance Studies</span>
                </div>
              </div>

              {/* Pulse effect */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white rounded-3xl"
              />
            </motion.div>

            {/* Key Points */}
            <div className="grid gap-4">
              {[
                { icon: TrendingDown, text: "Reduce emergency visits through early detection", color: "blue" },
                { icon: Activity, text: "Real-time AI analysis identifies patterns faster", color: "teal" },
                { icon: FileText, text: "Streamlined reporting increases clinician participation", color: "green" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-start gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <p className="text-slate-700 font-medium pt-2">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE - Animated Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200">
              {/* Placeholder for Video - User will import */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                {/* Video container with highlight */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-white/80 text-center"
                  >
                    <Activity className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Insert Your Video Here</p>
                    <p className="text-sm text-white/60 mt-2">Demonstration Video Placeholder</p>
                  </motion.div>
                </div>

                {/* Animated border highlight */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(20, 184, 166, 0.7)",
                      "0 0 20px rgba(59, 130, 246, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl"
                />
              </div>

              {/* Floating data points animation */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-200">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-3xl font-bold text-blue-600">1.3M+</div>
                  <div className="text-xs text-slate-600">Annual ER Visits</div>
                </motion.div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-teal-200">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-3xl font-bold text-teal-600">94%</div>
                  <div className="text-xs text-slate-600">Unreported Cases</div>
                </motion.div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-16 h-16 border-4 border-blue-400 border-dashed rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -right-8 w-20 h-20 border-4 border-teal-400 border-dashed rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
