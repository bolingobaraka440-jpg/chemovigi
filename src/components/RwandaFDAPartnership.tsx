import React from 'react';
import { motion } from 'motion/react';
import { Building2, Shield, CheckCircle, FileText, TrendingUp, Award, Globe, Users, Activity } from 'lucide-react';

export function RwandaFDAPartnership() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2 mb-4">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Strategic Partnership</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Primary Partner
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Working directly with regulatory authorities to improve drug safety across Rwanda
          </p>
        </motion.div>

        {/* Main Partnership Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-12"
        >
          {/* Gradient Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-teal-600 to-blue-600 p-8 text-white">
            <motion.div
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-600 to-blue-600 opacity-50"
              style={{ backgroundSize: '200% 100%' }}
            />
            
            <div className="relative flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-xl"
              >
                <Shield className="w-12 h-12 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2">Rwanda FDA</h3>
                <p className="text-lg text-white/90">Rwanda Food and Drug Authority</p>
                <div className="flex items-center gap-2 mt-3">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold text-white/90">First & Most Important Partner</span>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden lg:block"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="text-3xl font-bold">2026</div>
                  <div className="text-sm opacity-90">Partnership</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Our Commitment
                </h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  ChemoVigi provides Rwanda FDA with comprehensive, real-time adverse drug reaction reports 
                  submitted by verified clinicians across the country. Our AI-assisted platform ensures 
                  data quality and regulatory compliance.
                </p>
                <div className="space-y-2">
                  {[
                    "WHO-compliant reporting formats",
                    "Real-time data transmission",
                    "Clinician-verified submissions",
                    "AI-enhanced data quality"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  Impact Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "100%", label: "Regulatory Compliant", icon: Shield },
                    { value: "24/7", label: "Data Availability", icon: Activity },
                    { value: "Real-time", label: "Report Processing", icon: Zap },
                    { value: "Nationwide", label: "Coverage", icon: Globe }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 text-center border border-blue-200"
                    >
                      <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                      <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                How Rwanda FDA Benefits
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Comprehensive Data",
                    description: "Access to all ADR reports from clinicians nationwide in standardized format"
                  },
                  {
                    title: "Analytics & Insights",
                    description: "Daily, weekly, monthly, and yearly analysis of drug safety patterns"
                  },
                  {
                    title: "Early Warning System",
                    description: "AI-powered detection of emerging safety signals and drug interactions"
                  }
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                  >
                    <h5 className="font-bold text-slate-800 mb-2">{benefit.title}</h5>
                    <p className="text-sm text-slate-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-600 mb-4">
            All clinician reports are automatically formatted and transmitted to Rwanda FDA in compliance with 
            <span className="font-semibold text-slate-800"> WHO pharmacovigilance standards</span>
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span>Active Partnership</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>FDA-Verified Platform</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Missing import for Zap icon
import { Zap } from 'lucide-react';
