import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Clock, AlertTriangle, CheckCircle, Plus, User, LogOut, History, MessageSquare, Pill, Settings, ArrowLeft } from 'lucide-react';
import { Report } from '../App';
import { ReportDetailsModal } from './ReportDetailsModal';

interface PatientDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userName: string;
  userEmail: string;
  reports: Report[];
}

export function PatientDashboard({ onNavigate, onLogout, userName, userEmail, reports }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'history'>('overview');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Calculate stats from actual reports
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'Under Review' || r.status === 'Urgent').length;
  const reviewedReports = reports.filter(r => r.status === 'Reviewed' || r.status === 'Closed').length;

  const stats = [
    { label: 'Total Reports', value: totalReports.toString(), icon: FileText, color: 'blue' },
    { label: 'Pending Review', value: pendingReports.toString(), icon: Clock, color: 'orange' },
    { label: 'Reviewed', value: reviewedReports.toString(), icon: CheckCircle, color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center gap-4">
              {/* BACK ARROW BUTTON */}
              <button
                onClick={() => onNavigate('Home')}
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors group"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden md:inline text-sm font-medium">Home</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CV</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-blue-600 font-bold text-xl">Chemo</span>
                    <span className="text-teal-600 font-bold text-xl">Vigi</span>
                  </div>
                  <p className="text-xs text-gray-500">Patient Portal</p>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-slate-800">{userName}</p>
                  <p className="text-xs text-slate-500">Patient</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white mb-8 shadow-xl"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-blue-100 mb-6">
            Your health and safety are our priority. Report any medication side effects quickly and securely.
          </p>
          <motion.button
            onClick={() => onNavigate('QuickReporting')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Submit New Report
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</span>
              </div>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="border-b border-slate-200">
            <div className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'reports', label: 'My Reports', icon: History },
                { id: 'history', label: 'Report History', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h3>
                {reports.slice(0, 2).map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        report.severity === 'Severe' ? 'bg-red-100' : 
                        report.severity === 'Moderate' ? 'bg-orange-100' : 'bg-yellow-100'
                      }`}>
                        <FileText className={`w-6 h-6 ${
                          report.severity === 'Severe' ? 'text-red-600' : 
                          report.severity === 'Moderate' ? 'text-orange-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{report.drug}</p>
                        <p className="text-sm text-slate-500">Reported on {report.dateReported}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        report.status === 'Under Review' ? 'bg-orange-100 text-orange-700' : 
                        report.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* REPORTS TAB */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800 mb-4">All My Reports</h3>
                {reports.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 mb-1">{report.drug}</h4>
                        <p className="text-sm text-slate-500">Report ID: #{report.id.toString().padStart(6, '0')}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        report.severity === 'Severe' ? 'bg-red-100 text-red-700' : 
                        report.severity === 'Moderate' ? 'bg-orange-100 text-orange-700' : 
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.severity}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Date Submitted</p>
                        <p className="font-semibold text-slate-800">{report.dateReported}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Status</p>
                        <p className="font-semibold text-slate-800">{report.status}</p>
                      </div>
                      <div>
                        <button
                          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                          onClick={() => setSelectedReport(report)}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Complete Report History</h3>
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center gap-4 p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{report.drug} - {report.severity}</p>
                        <p className="text-sm text-slate-600">{report.dateReported}</p>
                      </div>
                      <span className={`text-xs font-semibold ${
                        report.status === 'Closed' ? 'text-slate-600' : 'text-orange-600'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.button
            onClick={() => onNavigate('Drug Info')}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:border-blue-300 transition-all text-left"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Drug Information</h4>
            <p className="text-sm text-slate-600">Search chemotherapy drug database</p>
          </motion.button>

          <motion.button
            onClick={() => onNavigate('AI Features')}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:border-teal-300 transition-all text-left"
          >
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-teal-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">AI Chat Support</h4>
            <p className="text-sm text-slate-600">Get instant help and guidance</p>
          </motion.button>

          <motion.button
            onClick={() => onNavigate('PatientSettings')}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:border-slate-300 transition-all text-left"
          >
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-slate-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Account Settings</h4>
            <p className="text-sm text-slate-600">Manage your profile and preferences</p>
          </motion.button>
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          userRole="patient"
        />
      )}
    </div>
  );
}