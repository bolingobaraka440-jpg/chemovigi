import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Mail, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

interface EmailConfirmationPageProps {
  onNavigate: (page: string) => void;
  onLogin: (role: 'patient' | 'clinician', name: string, email: string) => void;
}

export function EmailConfirmationPage({ onNavigate, onLogin }: EmailConfirmationPageProps) {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const [userRole, setUserRole] = useState<'patient' | 'clinician'>('patient');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Check for email verification token in URL
    const handleEmailVerification = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const type = urlParams.get('type');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        // Check for errors first
        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Email verification failed. Please try again.');
          return;
        }

        if (type === 'signup' && accessToken) {
          // Email verification successful!
          setStatus('success');
          setMessage('Email verified successfully!');

          // Store token
          localStorage.setItem('authToken', accessToken);

          // Get pending user data (saved during registration)
          const pendingUserStr = localStorage.getItem('pendingUser');
          
          if (pendingUserStr) {
            const pendingUser = JSON.parse(pendingUserStr);
            
            // Also store in regular user storage
            localStorage.setItem('user', JSON.stringify(pendingUser));
            
            setUserRole(pendingUser.role || 'patient');
            
            // Start countdown to auto-login
            let counter = 3;
            const interval = setInterval(() => {
              counter--;
              setCountdown(counter);
              
              if (counter === 0) {
                clearInterval(interval);
                // Auto-login and redirect to dashboard
                onLogin(pendingUser.role || 'patient', pendingUser.name, pendingUser.email);
                
                // Clean up pending user data
                localStorage.removeItem('pendingUser');
              }
            }, 1000);
          } else {
            // If no pending user, redirect to login
            setTimeout(() => {
              onNavigate('Login');
            }, 3000);
          }
        } else {
          // No valid token
          setStatus('error');
          setMessage('Invalid or expired verification link. Please try registering again.');
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    handleEmailVerification();
  }, [onLogin, onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        {/* ChemoVigi Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-baseline justify-center gap-0.5">
            <span className="text-blue-600 font-bold text-3xl">Chemo</span>
            <span className="text-teal-600 font-bold text-3xl">Vigi</span>
          </div>
          <p className="text-slate-500 text-sm mt-2">Email Verification</p>
        </div>

        {/* Verifying State */}
        {status === 'verifying' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Verifying Email</h2>
            <p className="text-slate-600">{message}</p>
          </motion.div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              🎉 Email Verified!
            </h2>
            <p className="text-slate-600 mb-6">{message}</p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-slate-700 mb-3">
                Redirecting to your dashboard in:
              </p>
              <motion.div
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-bold text-blue-600 mb-2"
              >
                {countdown}
              </motion.div>
              <p className="text-xs text-slate-500">
                Setting up your {userRole} account...
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                  const user = JSON.parse(storedUser);
                  onLogin(user.role || 'patient', user.name, user.email);
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Go to Dashboard Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-slate-600 mb-6">{message}</p>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('Register')}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Register Again
              </button>
              
              <button
                onClick={() => onNavigate('Login')}
                className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Back to Login
              </button>
            </div>
          </motion.div>
        )}

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Need help?{' '}
            <button
              onClick={() => onNavigate('Contact')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Contact Support
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}