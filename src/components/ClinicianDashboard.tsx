import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  User, 
  LogOut, 
  TrendingUp,
  Activity,
  Shield,
  Zap,
  FileText,
  Search,
  Filter,
  ArrowUpDown,
  Bell,
  Users,
  Stethoscope,
  AlertCircle,
  XCircle,
  ChevronDown,
  MessageSquare,
  Calculator,
  ArrowLeft
} from 'lucide-react';
import { Report } from '../App';
import { AnalyticsDashboard } from './AnalyticsDashboard';

interface ClinicianDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userName: string;
  reports: Report[];
  onUpdateReportStatus: (reportId: number, newStatus: 'Under Review' | 'Reviewed' | 'Closed' | 'Urgent') => void;
}

export function ClinicianDashboard({ onNavigate, onLogout, userName, reports, onUpdateReportStatus }: ClinicianDashboardProps) {
  const [activeTab, setActiveTab] = useState<'priority' | 'all' | 'analytics'>('priority');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Sort reports by priority
  const sortedReports = [...reports].sort((a, b) => a.priority - b.priority);
  
  // Filter reports
  const filteredReports = sortedReports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.drug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  // Calculate stats
  const urgentCases = reports.filter(r => r.urgency === 'Critical' || r.urgency === 'High').length;
  const pendingReview = reports.filter(r => r.status === 'Under Review' || r.status === 'Urgent').length;
  const totalPatients = new Set(reports.map(r => r.patientEmail)).size;
  const aiAnalyzedCount = reports.filter(r => r.aiAnalyzed).length;

  // Stats for analytics
  const severityBreakdown = {
    critical: reports.filter(r => r.severity === 'Critical').length,
    severe: reports.filter(r => r.severity === 'Severe').length,
    moderate: reports.filter(r => r.severity === 'Moderate').length,
    mild: reports.filter(r => r.severity === 'Mild').length,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'red';
      case 'Severe': return 'orange';
      case 'Moderate': return 'yellow';
      case 'Mild': return 'green';
      default: return 'gray';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-600 text-white animate-pulse';
      case 'High':
        return 'bg-orange-600 text-white';
      case 'Medium':
        return 'bg-yellow-600 text-white';
      case 'Low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* CLINICIAN HEADER */}
      <header className="bg-gradient-to-r from-teal-700 to-teal-600 border-b border-teal-800 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center gap-4">
              {/* BACK ARROW BUTTON */}
              <button
                onClick={() => onNavigate('Home')}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors group"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden md:inline text-sm font-medium">Home</span>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-2 ring-white/30">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-white font-bold text-2xl">Chemo</span>
                    <span className="text-teal-100 font-bold text-2xl">Vigi</span>
                  </div>
                  <p className="text-xs text-teal-100">Clinical Portal • Professional Edition</p>
                </div>
              </div>
            </div>

            {/* Alerts & User */}
            <div className="flex items-center gap-4">
              {/* Submit New Report Button */}
              <button
                onClick={() => onNavigate('ClinicianReporting')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden md:inline">New Report</span>
              </button>

              {/* Urgent Alerts */}
              {urgentCases > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <div className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg animate-pulse">
                    <Bell className="w-4 h-4" />
                    <span className="font-bold">{urgentCases} Urgent</span>
                  </div>
                </motion.div>
              )}

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-white">Dr. {userName}</p>
                  <p className="text-xs text-teal-100">Clinician</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-red-200 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              {urgentCases > 0 && (
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                  URGENT
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 font-medium mb-1">Urgent Cases</p>
            <p className="text-4xl font-bold text-red-600">{urgentCases}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 font-medium mb-1">Pending Review</p>
            <p className="text-4xl font-bold text-orange-600">{pendingReview}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 font-medium mb-1">Total Patients</p>
            <p className="text-4xl font-bold text-blue-600">{totalPatients}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-teal-200 hover:shadow-2xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-teal-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 font-medium mb-1">AI Analyzed</p>
            <p className="text-4xl font-bold text-teal-600">{aiAnalyzedCount}</p>
          </motion.div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 border border-slate-200">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex">
              {[
                { id: 'priority', label: 'Priority Triage', icon: AlertTriangle },
                { id: 'all', label: 'All Reports', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* PRIORITY TRIAGE TAB */}
            {activeTab === 'priority' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">🚨 Priority Queue</h3>
                    <p className="text-sm text-slate-600">Cases sorted by urgency and severity</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search patient or drug..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterSeverity}
                      onChange={(e) => setFilterSeverity(e.target.value)}
                      className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="all">All Severities</option>
                      <option value="Critical">Critical</option>
                      <option value="Severe">Severe</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Mild">Mild</option>
                    </select>
                  </div>
                </div>

                {filteredReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative bg-white border-2 rounded-xl p-6 hover:shadow-2xl transition-all cursor-pointer ${
                      report.urgency === 'Critical' ? 'border-red-500 bg-red-50' :
                      report.urgency === 'High' ? 'border-orange-500 bg-orange-50' :
                      report.urgency === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-slate-300'
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    {/* Priority Badge */}
                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-white">
                      #{report.priority}
                    </div>

                    <div className="ml-8 grid md:grid-cols-12 gap-4 items-start">
                      {/* Patient Info */}
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-slate-600" />
                          <p className="font-bold text-slate-800">{report.patientName}</p>
                        </div>
                        <p className="text-xs text-slate-500">{report.patientEmail}</p>
                        <p className="text-xs text-slate-500 mt-1">ID: #{report.id.toString().padStart(6, '0')}</p>
                      </div>

                      {/* Drug & Symptoms */}
                      <div className="md:col-span-4">
                        <p className="text-sm text-slate-600 mb-1">Drug:</p>
                        <p className="font-bold text-lg text-slate-800 mb-3">{report.drug}</p>
                        <p className="text-sm text-slate-600 mb-1">Symptoms:</p>
                        <p className="text-sm text-slate-700">{report.symptoms}</p>
                      </div>

                      {/* Severity & Status */}
                      <div className="md:col-span-2">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Severity:</p>
                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold bg-${getSeverityColor(report.severity)}-100 text-${getSeverityColor(report.severity)}-700`}>
                              {report.severity}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Urgency:</p>
                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${getUrgencyBadge(report.urgency)}`}>
                              {report.urgency}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* AI Analysis & Date */}
                      <div className="md:col-span-3">
                        <div className="space-y-3">
                          {report.aiAnalyzed && report.aiSuggestion && (
                            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-teal-600" />
                                <p className="text-xs font-bold text-teal-700">AI Analysis</p>
                              </div>
                              <p className="text-xs text-teal-700">{report.aiSuggestion}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-slate-500">Reported:</p>
                            <p className="text-sm font-semibold text-slate-700">{report.dateReported}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Status:</p>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              report.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                              report.status === 'Under Review' ? 'bg-orange-100 text-orange-700' :
                              report.status === 'Reviewed' ? 'bg-green-100 text-green-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ALL REPORTS TAB */}
            {activeTab === 'all' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">All Patient Reports</h3>
                <div className="grid gap-4">
                  {reports.map((report) => (
                    <div key={report.id} className="bg-white border border-slate-300 rounded-lg p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{report.patientName} - {report.drug}</p>
                          <p className="text-sm text-slate-600">{report.symptoms}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-${getSeverityColor(report.severity)}-100 text-${getSeverityColor(report.severity)}-700`}>
                            {report.severity}
                          </span>
                          <p className="text-xs text-slate-500 mt-2">{report.dateReported}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <AnalyticsDashboard reports={reports} />
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.button
            onClick={() => onNavigate('DosageCalculator')}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white text-left hover:shadow-2xl transition-all"
          >
            <Calculator className="w-12 h-12 mb-4" />
            <h4 className="font-bold text-lg mb-2">Dosage Calculator</h4>
            <p className="text-sm text-purple-100">Calculate personalized drug dosages</p>
          </motion.button>

          <motion.button
            onClick={() => onNavigate('AI Features')}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-2xl shadow-xl text-white text-left hover:shadow-2xl transition-all"
          >
            <MessageSquare className="w-12 h-12 mb-4" />
            <h4 className="font-bold text-lg mb-2">AI Assistant</h4>
            <p className="text-sm text-teal-100">Get AI-powered clinical insights</p>
          </motion.button>

          <motion.button
            onClick={() => onNavigate('Research')}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white text-left hover:shadow-2xl transition-all"
          >
            <Activity className="w-12 h-12 mb-4" />
            <h4 className="font-bold text-lg mb-2">Research Database</h4>
            <p className="text-sm text-blue-100">Access clinical research data</p>
          </motion.button>
        </div>
      </div>

      {/* REPORT DETAIL MODAL */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-500 p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-2xl">Report Details</h3>
                  <p className="text-teal-100 text-sm">ID: #{selectedReport.id.toString().padStart(6, '0')}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Patient Name</p>
                    <p className="font-bold text-lg text-slate-800">{selectedReport.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Contact</p>
                    <p className="font-semibold text-slate-700">{selectedReport.patientEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Drug/Medication</p>
                    <p className="font-bold text-lg text-slate-800">{selectedReport.drug}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Date Reported</p>
                    <p className="font-semibold text-slate-700">{selectedReport.dateReported}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-2">Symptoms</p>
                  <p className="text-slate-800 bg-slate-50 p-4 rounded-lg">{selectedReport.symptoms}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-xs text-red-600 mb-1">Severity</p>
                    <p className="font-bold text-lg text-red-700">{selectedReport.severity}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-xs text-orange-600 mb-1">Urgency</p>
                    <p className="font-bold text-lg text-orange-700">{selectedReport.urgency}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Status</p>
                    <p className="font-bold text-lg text-blue-700">{selectedReport.status}</p>
                  </div>
                </div>

                {selectedReport.aiAnalyzed && selectedReport.aiSuggestion && (
                  <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-teal-600" />
                      <p className="font-bold text-teal-700">AI Clinical Suggestion</p>
                    </div>
                    <p className="text-teal-800">{selectedReport.aiSuggestion}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      onUpdateReportStatus(selectedReport.id, 'Reviewed');
                      setSelectedReport(null);
                    }}
                    className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Reviewed
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = `mailto:${selectedReport.patientEmail}?subject=Regarding Your ADR Report - ${selectedReport.drug}&body=Dear ${selectedReport.patientName},%0D%0A%0D%0AThis is regarding your adverse drug reaction report for ${selectedReport.drug} submitted on ${selectedReport.dateReported}.%0D%0A%0D%0ABest regards,%0D%0ADr. ${userName}%0D%0AChemoVigi Clinical Team`;
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Contact Patient
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}