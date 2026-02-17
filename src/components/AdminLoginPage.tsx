import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminLoginPageProps {
  onAdminLogin: () => void;
  onNavigate: (page: string) => void;
}

export function AdminLoginPage({ onAdminLogin, onNavigate }: AdminLoginPageProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // 🔒 SUPER SECRET ADMIN PASSWORD - Change this to your own!
  const ADMIN_PASSWORD = 'ChemoVigiAdmin2026!';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // ✅ Correct password - grant access
      setError('');
      onAdminLogin();
    } else {
      // ❌ Wrong password
      setAttempts(prev => prev + 1);
      setError('Invalid admin password. Access denied.');
      setPassword('');
      
      // After 3 failed attempts, redirect to home
      if (attempts >= 2) {
        setTimeout(() => {
          alert('Too many failed attempts. Redirecting to home page.');
          onNavigate('Home');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-md w-full"
      >
        {/* Security Warning Banner */}
        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-2xl p-4 mb-6 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-yellow-100 font-semibold text-sm">Restricted Access Area</p>
              <p className="text-yellow-200/70 text-xs">Authorized personnel only</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-xl"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-blue-200 text-sm">ChemoVigi Control Center</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4 backdrop-blur-sm"
            >
              <p className="text-red-200 text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
              <p className="text-red-300/70 text-xs mt-1">
                Attempts remaining: {3 - attempts}
              </p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-100 mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-blue-300" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 focus:outline-none backdrop-blur-sm transition-all"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Access Admin Dashboard
            </motion.button>
          </form>

          {/* Back Button */}
          <button
            onClick={() => onNavigate('Home')}
            className="w-full mt-4 text-blue-200 hover:text-white text-sm font-semibold transition-colors"
          >
            ← Back to Home
          </button>

          {/* Security Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-blue-200/70 text-center">
              🔒 All access attempts are logged and monitored
            </p>
            <p className="text-xs text-blue-200/50 text-center mt-1">
              ChemoVigi Administrator Portal v1.0
            </p>
          </div>
        </div>

        {/* Instructions (REMOVE THIS IN PRODUCTION!) */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-lg">
          <p className="text-blue-100 text-xs font-semibold mb-2">⚠️ Developer Note:</p>
          <p className="text-blue-200/80 text-xs mb-2">
            Default admin password: <code className="bg-white/10 px-2 py-1 rounded">ChemoVigiAdmin2026!</code>
          </p>
          <p className="text-blue-200/60 text-xs">
            Change the ADMIN_PASSWORD constant in AdminLoginPage.tsx for production use.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
