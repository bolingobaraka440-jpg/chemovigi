import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, Stethoscope, CheckCircle, Loader2 } from 'lucide-react';
import { registerUser, loginUser } from '../services/api';
import { validateEmail } from '../utils/emailValidator';

interface EnhancedRegisterPageProps {
  onNavigate: (page: string) => void;
  onRegister: (role: 'patient' | 'clinician', name: string, email: string) => void;
}

export function EnhancedRegisterPage({ onNavigate, onRegister }: EnhancedRegisterPageProps) {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'clinician' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '', // For clinicians
    specialty: '', // For clinicians
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // 🔥 NEW: Success message

  const handleRoleSelect = (role: 'patient' | 'clinician') => {
    setSelectedRole(role);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    // 🔥 VALIDATE EMAIL - Check if it's a REAL email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || 'Invalid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (selectedRole === 'clinician' && (!formData.licenseNumber || !formData.specialty)) {
      setError('Please provide license number and specialty');
      return;
    }

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare registration data
      const registrationData: any = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      };

      // Add clinician-specific fields
      if (selectedRole === 'clinician') {
        registrationData.licenseNumber = formData.licenseNumber;
        registrationData.specialty = formData.specialty;
      }

      // 🔥 Call backend API to register
      // Store user data for later use after email verification
      localStorage.setItem('pendingUser', JSON.stringify({
        email: formData.email,
        name: formData.fullName,
        role: selectedRole,
      }));

      const response = await registerUser(registrationData);

      console.log('Registration successful!', response);

      // 🔥 Show success message - User must verify email
      setShowSuccessMessage(true);
      
      // Don't auto-redirect - user stays on success screen
      // They will be redirected after clicking email verification link

    } catch (error: any) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed. Please try again.');
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
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-white mb-2">Join ChemoVigi</h2>
              <p className="text-white/80 text-sm">Choose your account type to get started</p>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
                I am a...
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* PATIENT OPTION */}
                <motion.button
                  onClick={() => handleRoleSelect('patient')}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-8 text-left hover:border-blue-500 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-3">Patient</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Report medication side effects, track your health history, and get AI-powered insights.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Submit adverse event reports</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>View your report history</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>AI chat support</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Drug information access</span>
                    </li>
                  </ul>
                </motion.button>

                {/* CLINICIAN OPTION */}
                <motion.button
                  onClick={() => handleRoleSelect('clinician')}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-300 rounded-2xl p-8 text-left hover:border-teal-500 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-3">Clinician</h4>
                  <p className="text-slate-600 text-sm mb-4">
                    Review patient reports, verify severity, and provide clinical expertise.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Review adverse event reports</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Severity alerts & triage</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Patient case management</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Analytics & insights</span>
                    </li>
                  </ul>
                </motion.button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => onNavigate('Login')}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REGISTRATION DETAILS */}
        {step === 'details' && selectedRole && (
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
                {selectedRole === 'patient' ? 'Patient' : 'Clinician'} Registration
              </h2>
              <p className="text-white/80 text-sm">Complete your profile to get started</p>
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

              {showSuccessMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"
                >
                  Registration successful! Please check your email to verify your account.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-semibold">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-semibold">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Clinician-specific fields */}
                {selectedRole === 'clinician' && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm font-semibold">
                        Medical License Number *
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        placeholder="e.g., MD123456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm font-semibold">
                        Specialty *
                      </label>
                      <select
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select specialty</option>
                        <option value="oncology">Oncology</option>
                        <option value="internal-medicine">Internal Medicine</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="nursing">Nursing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-semibold">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-semibold">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
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
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => onNavigate('Login')}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign in here
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
          🔒 Your information is protected with hospital-grade encryption
        </motion.p>
      </motion.div>
    </div>
  );
}