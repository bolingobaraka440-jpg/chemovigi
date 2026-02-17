import React from 'react';
import { Shield, FileText, AlertCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-4">
              <span className="text-blue-400 text-xl">Chemo</span>
              <span className="text-green-400 text-xl">Vigi</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Advanced pharmacovigilance platform dedicated to patient safety and medication monitoring.
            </p>
            <p className="text-gray-500 text-xs">
              Empowering patients and clinicians with AI-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Medical Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Emergency: 1-800-CHEMOVIGI</li>
              <li>
                <a 
                  href="mailto:support@chemovigi.com" 
                  className="hover:text-blue-400 transition-colors"
                >
                  Email: support@chemovigi.com
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/chemovigi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Instagram: @chemovigi
                </a>
              </li>
              <li>Medical District, MD 20001</li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h5 className="text-yellow-400 text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Important Medical Disclaimer
            </h5>
            <p className="text-gray-400 text-xs leading-relaxed">
              ChemoVigi is a pharmacovigilance reporting platform. This service is not intended to replace professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions regarding 
              a medical condition. In case of emergency, call 911 or your local emergency services immediately.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 ChemoVigi. All rights reserved. • Built with care for patient safety
          </p>
          <p className="text-gray-600 text-xs mt-2">
            HIPAA Compliant • Hospital-Grade Encryption • Secure Data Protection
          </p>
        </div>
      </div>
    </footer>
  );
}