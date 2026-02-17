import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const tabs = ['Home', 'AI Features', 'Drug Info', 'Research', 'About', 'Our Team', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('Home')}>
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-md">
              {/* Video thumbnail placeholder - in production, use actual video */}
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-blue-600 font-bold">Chemo</span>
                <span className="text-green-600 font-bold">Vigi</span>
              </div>
              <p className="text-xs text-gray-500">Pharmacovigilance • Patient safety</p>
            </div>
          </div>

          {/* Right Side - Navigation Tabs + Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            {tabs.map((tab) => (
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
            
            {/* Login Button */}
            <button
              onClick={() => onNavigate('Login')}
              className="flex items-center gap-2 px-5 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Login</span>
            </button>
            
            {/* Register Button */}
            <button
              onClick={() => onNavigate('Register')}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full hover:from-blue-700 hover:to-teal-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
              <span className="font-medium">Register</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}