import React, { useState } from 'react';
import { LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { ChemoVigiLogo } from './ChemoVigiLogo';

interface AppNavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function AppNavbar({ onNavigate, currentPage, isLoggedIn, onLogout }: AppNavbarProps) {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [drugInfoDropdownOpen, setDrugInfoDropdownOpen] = useState(false);

  const mainTabs = ['Home', 'AI Features', 'Research', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <ChemoVigiLogo 
            size="small"
            showText={true}
            onClick={() => onNavigate('Home')}
          />

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {mainTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onNavigate(tab)}
                className="relative group px-3 py-2"
              >
                <span className={`transition-all duration-300 ${
                  currentPage === tab 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                } group-hover:scale-105 inline-block`}>
                  {tab}
                </span>
                <span className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                  currentPage === tab 
                    ? 'w-full bg-gradient-to-r from-blue-500 to-teal-500' 
                    : 'w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-teal-400'
                }`}></span>
              </button>
            ))}
            
            {/* Drug Info Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDrugInfoDropdownOpen(!drugInfoDropdownOpen)}
                className="relative group px-3 py-2 flex items-center gap-1"
              >
                <span className={`transition-all duration-300 ${
                  currentPage === 'Drug Info' || currentPage === 'DrugDatabase'
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                } group-hover:scale-105`}>
                  Drug Info
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${drugInfoDropdownOpen ? 'rotate-180' : ''} ${
                  currentPage === 'Drug Info' || currentPage === 'DrugDatabase' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </button>

              {/* Dropdown Menu */}
              {drugInfoDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate('Drug Info');
                      setDrugInfoDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Drug Standardization
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('DrugDatabase');
                      setDrugInfoDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Drug Database
                  </button>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="relative group px-3 py-2 flex items-center gap-1"
              >
                <span className={`transition-all duration-300 ${
                  currentPage === 'About' || currentPage === 'Our Team'
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                } group-hover:scale-105`}>
                  About
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''} ${
                  currentPage === 'About' || currentPage === 'Our Team' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </button>

              {/* Dropdown Menu */}
              {aboutDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate('About');
                      setAboutDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    About ChemoVigi
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('Our Team');
                      setAboutDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Our Team
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons or User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-slate-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('Login')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                
                <button
                  onClick={() => onNavigate('Register')}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Background Overlay */}
      {(aboutDropdownOpen || drugInfoDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setAboutDropdownOpen(false);
            setDrugInfoDropdownOpen(false);
          }}
        />
      )}
    </nav>
  );
}