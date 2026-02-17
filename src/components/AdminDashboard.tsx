import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Users, FileText, Activity, TrendingUp, Calendar,
  Shield, Eye, EyeOff, Search, Filter, Download, BarChart3,
  Clock, AlertCircle, CheckCircle, UserCheck, Stethoscope,
  Pill, AlertTriangle, ChevronDown, ChevronUp
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'clinician';
  createdAt: string;
  reportsCount?: number;
}

interface Report {
  id: number;
  patientName: string;
  patientEmail: string;
  drug: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  symptoms: string;
  dateReported: string;
  status: 'Under Review' | 'Reviewed' | 'Closed' | 'Urgent';
  reviewedAt?: string;
  reviewedBy?: string;
  userId: string;
  submittedBy?: 'patient' | 'clinician';
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'reports' | 'analytics'>('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'patient' | 'clinician'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Under Review' | 'Reviewed' | 'Urgent'>('all');
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Simulate API call - In production, call real admin endpoints
      // Mock data for demo
      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'patient', createdAt: '2026-02-01', reportsCount: 3 },
        { id: '2', name: 'Dr. Sarah Smith', email: 'sarah@hospital.com', role: 'clinician', createdAt: '2026-01-15', reportsCount: 0 },
        { id: '3', name: 'Mary Johnson', email: 'mary@example.com', role: 'patient', createdAt: '2026-02-10', reportsCount: 1 },
        { id: '4', name: 'Dr. Michael Brown', email: 'michael@clinic.com', role: 'clinician', createdAt: '2026-01-20', reportsCount: 2 },
      ];

      const mockReports: Report[] = [
        { id: 1, patientName: 'John Doe', patientEmail: 'john@example.com', drug: 'Cisplatin', severity: 'Moderate', symptoms: 'Nausea, vomiting', dateReported: '2026-02-13', status: 'Under Review', userId: '1', submittedBy: 'patient' },
        { id: 2, patientName: 'Mary Johnson', patientEmail: 'mary@example.com', drug: 'Doxorubicin', severity: 'Severe', symptoms: 'Hair loss, fatigue', dateReported: '2026-02-12', status: 'Reviewed', reviewedAt: '2026-02-13', reviewedBy: 'Dr. Sarah Smith', userId: '3', submittedBy: 'patient' },
        { id: 3, patientName: 'Robert Lee', patientEmail: 'robert@example.com', drug: 'Paclitaxel', severity: 'Mild', symptoms: 'Tingling in fingers', dateReported: '2026-02-14', status: 'Under Review', userId: '4', submittedBy: 'clinician' },
        { id: 4, patientName: 'John Doe', patientEmail: 'john@example.com', drug: 'Carboplatin', severity: 'Critical', symptoms: 'Severe allergic reaction', dateReported: '2026-02-15', status: 'Urgent', userId: '1', submittedBy: 'patient' },
      ];

      setUsers(mockUsers);
      setReports(mockReports);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Analytics calculations
  const totalUsers = users.length;
  const totalPatients = users.filter(u => u.role === 'patient').length;
  const totalClinicians = users.filter(u => u.role === 'clinician').length;
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'Under Review').length;
  const reviewedReports = reports.filter(r => r.status === 'Reviewed').length;
  const urgentReports = reports.filter(r => r.status === 'Urgent').length;

  // Drug analytics
  const drugStats = reports.reduce((acc, report) => {
    acc[report.drug] = (acc[report.drug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topDrugsData = Object.entries(drugStats)
    .map(([drug, count]) => ({ drug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Severity distribution
  const severityData = [
    { name: 'Mild', value: reports.filter(r => r.severity === 'Mild').length, color: '#10b981' },
    { name: 'Moderate', value: reports.filter(r => r.severity === 'Moderate').length, color: '#f59e0b' },
    { name: 'Severe', value: reports.filter(r => r.severity === 'Severe').length, color: '#ef4444' },
    { name: 'Critical', value: reports.filter(r => r.severity === 'Critical').length, color: '#dc2626' },
  ];

  // Timeline data (weekly)
  const getTimelineData = () => {
    const data = [];
    const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 4 : timeRange === 'monthly' ? 12 : 5;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      if (timeRange === 'daily') {
        date.setDate(date.getDate() - i);
        data.push({
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          reports: Math.floor(Math.random() * 10) + 1,
          users: Math.floor(Math.random() * 5) + 1,
        });
      } else if (timeRange === 'weekly') {
        date.setDate(date.getDate() - (i * 7));
        data.push({
          name: `Week ${days - i}`,
          reports: Math.floor(Math.random() * 20) + 5,
          users: Math.floor(Math.random() * 10) + 2,
        });
      } else if (timeRange === 'monthly') {
        date.setMonth(date.getMonth() - i);
        data.push({
          name: date.toLocaleDateString('en-US', { month: 'short' }),
          reports: Math.floor(Math.random() * 50) + 10,
          users: Math.floor(Math.random() * 20) + 5,
        });
      } else {
        data.push({
          name: `${new Date().getFullYear() - i}`,
          reports: Math.floor(Math.random() * 200) + 50,
          users: Math.floor(Math.random() * 100) + 20,
        });
      }
    }
    return data;
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.drug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('Home')}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-yellow-400" />
                  <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </div>
                <p className="text-blue-200 text-sm mt-1">ChemoVigi Control Center</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-t border-white/20 pt-4">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard
                    title="Total Users"
                    value={totalUsers}
                    icon={Users}
                    color="blue"
                    subtitle={`${totalPatients} patients, ${totalClinicians} clinicians`}
                  />
                  <StatsCard
                    title="Total Reports"
                    value={totalReports}
                    icon={FileText}
                    color="teal"
                    subtitle={`${pendingReports} pending`}
                  />
                  <StatsCard
                    title="Urgent Reports"
                    value={urgentReports}
                    icon={AlertTriangle}
                    color="red"
                    subtitle="Requires immediate attention"
                  />
                  <StatsCard
                    title="Reviewed"
                    value={reviewedReports}
                    icon={CheckCircle}
                    color="green"
                    subtitle="Completed reviews"
                  />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Severity Distribution */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Severity Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={severityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {severityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Drugs */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Top Reported Drugs</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topDrugsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="drug" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Reports</h3>
                  <div className="space-y-3">
                    {reports.slice(0, 5).map(report => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${
                            report.status === 'Urgent' ? 'bg-red-600' :
                            report.status === 'Under Review' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} />
                          <div>
                            <p className="font-semibold text-slate-800">{report.patientName}</p>
                            <p className="text-sm text-slate-600">{report.drug} - {report.severity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-700">{report.status}</p>
                          <p className="text-xs text-slate-500">{new Date(report.dateReported).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value as any)}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="patient">Patients Only</option>
                      <option value="clinician">Clinicians Only</option>
                    </select>
                  </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Reports</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {user.role === 'clinician' ? (
                                  <Stethoscope className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <UserCheck className="w-5 h-5 text-teal-600" />
                                )}
                                <span className="font-semibold text-slate-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.role === 'clinician' 
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-teal-100 text-teal-700'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{user.reportsCount || 0}</td>
                            <td className="px-6 py-4 text-slate-600">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* REPORTS TAB */}
            {activeTab === 'reports' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {filteredReports.map(report => (
                    <div key={report.id} className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            report.severity === 'Critical' ? 'bg-red-100' :
                            report.severity === 'Severe' ? 'bg-orange-100' :
                            report.severity === 'Moderate' ? 'bg-yellow-100' :
                            'bg-green-100'
                          }`}>
                            <Pill className={`w-6 h-6 ${
                              report.severity === 'Critical' ? 'text-red-600' :
                              report.severity === 'Severe' ? 'text-orange-600' :
                              report.severity === 'Moderate' ? 'text-yellow-600' :
                              'text-green-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg">{report.drug}</h4>
                            <p className="text-sm text-slate-600">{report.patientName} • {report.patientEmail}</p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          report.status === 'Urgent' ? 'bg-red-100 text-red-700' :
                          report.status === 'Under Review' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Severity</p>
                          <p className="font-semibold text-slate-800">{report.severity}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Reported</p>
                          <p className="font-semibold text-slate-800">{new Date(report.dateReported).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Submitted By</p>
                          <p className="font-semibold text-slate-800 capitalize">{report.submittedBy || 'patient'}</p>
                        </div>
                        {report.reviewedBy && (
                          <div>
                            <p className="text-slate-500">Reviewed By</p>
                            <p className="font-semibold text-slate-800">{report.reviewedBy}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-semibold text-slate-700 mb-1">Symptoms:</p>
                        <p className="text-slate-600">{report.symptoms}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Time Range Selector */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-800">Analytics Overview</h3>
                    <div className="flex gap-2">
                      {['daily', 'weekly', 'monthly', 'yearly'].map(range => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range as any)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${
                            timeRange === range
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Reports & Users Over Time</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={getTimelineData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="reports" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Reports" />
                      <Area type="monotone" dataKey="users" stackId="1" stroke="#14b8a6" fill="#14b8a6" name="New Users" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Drug Side Effects Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Drug Reports Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topDrugsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="drug" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#14b8a6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Monthly Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={getTimelineData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={3} name="Reports" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, icon: Icon, color, subtitle }: any) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    teal: 'from-teal-500 to-teal-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
      <h3 className="font-semibold text-slate-700">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}