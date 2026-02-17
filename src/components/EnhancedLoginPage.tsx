import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, User, Stethoscope, Loader2 } from 'lucide-react';
import { loginUser } from '../services/api';

interface EnhancedLoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (role: 'patient' | 'clinician', name: string, email: string) => void;
}

export function EnhancedLoginPage({ onNavigate, onLogin }: EnhancedLoginPageProps) {
  const [step, setStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'clinician' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: 'patient' | 'clinician') => {
    setSelectedRole(role);
    setStep('credentials');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call backend API
      const response = await loginUser({
        email,
        password,
        role: selectedRole,
      });

      // Success! Login user
      console.log('Login successful:', response);
      onLogin(selectedRole, response.user.name, response.user.email);
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* STEP 1: ROLE SELECTION */}
        {step === 'role' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-white mb-2">Welcome Back</h2>
              <p className="text-white/80 text-sm">Sign in to your ChemoVigi account</p>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
                I am signing in as...
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* PATIENT LOGIN */}
                <motion.button
                  onClick={() => handleRoleSelect('patient')}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-2">Patient</h4>
                  <p className="text-slate-600 text-sm">
                    Access your reports and health history
                  </p>
                </motion.button>

                {/* CLINICIAN LOGIN */}
                <motion.button
                  onClick={() => handleRoleSelect('clinician')}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-300 rounded-2xl p-8 text-center hover:border-teal-500 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-2">Clinician</h4>
                  <p className="text-slate-600 text-sm">
                    Review cases and manage patients
                  </p>
                </motion.button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onNavigate('Register')}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: CREDENTIALS */}
        {step === 'credentials' && selectedRole && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${
              selectedRole === 'patient' ? 'from-blue-600 to-blue-700' : 'from-teal-600 to-teal-700'
            } p-8 text-center`}>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                {selectedRole === 'patient' ? (
                  <User className="w-8 h-8 text-white" />
                ) : (
                  <Stethoscope className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-white mb-2">
                {selectedRole === 'patient' ? 'Patient' : 'Clinician'} Sign In
              </h2>
              <p className="text-white/80 text-sm">Enter your credentials to continue</p>
            </div>

            <div className="p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-semibold">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-semibold">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('role')}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                  >
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 bg-gradient-to-r ${
                      selectedRole === 'patient' 
                        ? 'from-blue-600 to-blue-700' 
                        : 'from-teal-600 to-teal-700'
                    } text-white rounded-lg hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => onNavigate('Register')}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-xs text-gray-500"
        >
          🔒 Your data is protected with hospital-grade encryption
        </motion.p>
      </motion.div>
    </div>
  );
}
