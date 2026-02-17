import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Mail, User, Building } from 'lucide-react';

interface ClinicianLoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export function ClinicianLoginPage({ onNavigate, onLogin }: ClinicianLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-16">
      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-slate-800 mb-3">Clinician Portal</h1>
          <p className="text-slate-600">Secure access for medical professionals</p>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-700" />
            <p className="text-sm text-blue-800">
              This is a secure clinician-only portal. All access is logged and monitored.
            </p>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Professional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="doctor@hospital.com"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-teal-700 text-white py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-teal-800 transition-all shadow-lg"
            >
              Access Clinician Portal
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">New clinician?</span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => onNavigate('ClinicianRegister')}
            className="w-full border-2 border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-700 transition-all"
          >
            Request Clinical Access
          </button>
        </motion.div>

        {/* Back to Patient Portal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => onNavigate('Login')}
            className="text-slate-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Patient Login
          </button>
        </motion.div>
      </div>
    </div>
  );
}
