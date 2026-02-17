import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  FileText,
  Send,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { Report } from '../App';

interface AnalyticsDashboardProps {
  reports: Report[];
}

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

export function AnalyticsDashboard({ reports }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [exportSuccess, setExportSuccess] = useState(false);

  // Data processing functions
  const getSeverityData = () => {
    const severityCounts = {
      Critical: reports.filter(r => r.severity === 'Critical').length,
      Severe: reports.filter(r => r.severity === 'Severe').length,
      Moderate: reports.filter(r => r.severity === 'Moderate').length,
      Mild: reports.filter(r => r.severity === 'Mild').length,
    };

    return [
      { name: 'Critical', value: severityCounts.Critical, color: '#DC2626' },
      { name: 'Severe', value: severityCounts.Severe, color: '#F97316' },
      { name: 'Moderate', value: severityCounts.Moderate, color: '#EAB308' },
      { name: 'Mild', value: severityCounts.Mild, color: '#16A34A' },
    ];
  };

  const getDrugData = () => {
    const drugCounts: { [key: string]: number } = {};
    reports.forEach(report => {
      drugCounts[report.drug] = (drugCounts[report.drug] || 0) + 1;
    });

    return Object.entries(drugCounts)
      .map(([drug, count]) => ({ drug, reports: count }))
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 6);
  };

  const getTimeSeriesData = () => {
    // Simplified time series data
    const timeData = [
      { period: 'Week 1', reports: 12, critical: 2 },
      { period: 'Week 2', reports: 18, critical: 3 },
      { period: 'Week 3', reports: 15, critical: 1 },
      { period: 'Week 4', reports: 22, critical: 4 },
      { period: 'Week 5', reports: 19, critical: 2 },
      { period: 'Week 6', reports: 25, critical: 5 },
    ];

    return timeData;
  };

  // Export functions
  const exportToPDF = () => {
    // Simulate PDF export
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
    
    // In production, this would generate a real PDF
    console.log('Exporting to PDF...', { timeRange, reports: reports.length });
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Patient', 'Drug', 'Severity', 'Date', 'Status', 'Urgency'];
    const rows = reports.map(r => [
      r.id,
      r.patientName,
      r.drug,
      r.severity,
      r.dateReported,
      r.status,
      r.urgency
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adr-report-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const sendToRwandaFDA = () => {
    // Simulate sending to FDA
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
    
    // In production, this would send via secure API
    console.log('Sending to Rwanda FDA...', { 
      timeRange, 
      reportsCount: reports.length,
      timestamp: new Date().toISOString()
    });
  };

  const severityData = getSeverityData();
  const drugData = getDrugData();
  const timeSeriesData = getTimeSeriesData();

  // Calculate key metrics
  const totalReports = reports.length;
  const criticalReports = reports.filter(r => r.severity === 'Critical').length;
  const averageResponseTime = '4.2 hours'; // Mock data
  const aiAnalysisRate = ((reports.filter(r => r.aiAnalyzed).length / totalReports) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            Analytics & FDA Reporting
          </h2>
          <p className="text-slate-600 mt-1">Comprehensive drug safety analysis</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          {(['daily', 'weekly', 'monthly', 'yearly'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: totalReports, icon: FileText, color: 'blue' },
          { label: 'Critical Cases', value: criticalReports, icon: AlertTriangle, color: 'red' },
          { label: 'Avg Response', value: averageResponseTime, icon: Activity, color: 'teal' },
          { label: 'AI Analyzed', value: `${aiAnalysisRate}%`, icon: CheckCircle, color: 'green' },
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <TrendingUp className={`w-5 h-5 text-${metric.color}-600`} />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</div>
            <div className="text-sm text-slate-600">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Severity Distribution - Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">Severity Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
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
        </motion.div>

        {/* Top Reported Drugs - Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-800">Top Reported Drugs</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={drugData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="drug" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reports" fill="#14B8A6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Trend Analysis - Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
      >
        <div className="flex items-center gap-2 mb-4">
          <LineChartIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-800">Reporting Trends - {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={2} name="Total Reports" />
            <Line type="monotone" dataKey="critical" stroke="#DC2626" strokeWidth={2} name="Critical Cases" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Export & FDA Submission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200"
      >
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-blue-600" />
          Export & Submit Reports
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Export to PDF */}
          <motion.button
            onClick={exportToPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-blue-300 rounded-lg p-4 hover:shadow-lg transition-all group"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-800 mb-1">Export to PDF</div>
            <div className="text-sm text-slate-600">Download comprehensive report</div>
          </motion.button>

          {/* Export to CSV */}
          <motion.button
            onClick={exportToCSV}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border-2 border-teal-300 rounded-lg p-4 hover:shadow-lg transition-all group"
          >
            <Download className="w-8 h-8 text-teal-600 mb-3 mx-auto group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-800 mb-1">Export to CSV</div>
            <div className="text-sm text-slate-600">Download data for analysis</div>
          </motion.button>

          {/* Send to Rwanda FDA */}
          <motion.button
            onClick={sendToRwandaFDA}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-4 hover:shadow-lg transition-all group relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <Send className="w-8 h-8 mb-3 mx-auto group-hover:scale-110 transition-transform relative z-10" />
            <div className="font-bold mb-1 relative z-10">Send to Rwanda FDA</div>
            <div className="text-sm opacity-90 relative z-10">Submit official report</div>
          </motion.button>
        </div>

        {/* Success Message */}
        {exportSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-green-100 border border-green-300 rounded-lg p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Success!</p>
              <p className="text-sm text-green-700">Report processed and ready for submission</p>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-slate-700">
            <strong>📊 Rwanda FDA Partnership:</strong> All reports are automatically formatted 
            according to WHO pharmacovigilance standards and can be directly submitted to the 
            Rwanda Food and Drug Authority for regulatory review.
          </p>
        </div>
      </motion.div>

      {/* Additional Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
      >
        <h3 className="text-lg font-bold text-slate-800 mb-4">Key Insights & Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-4">
            <p className="font-semibold text-yellow-800 mb-1">⚠️ High Alert</p>
            <p className="text-sm text-yellow-700">
              {criticalReports} critical cases require immediate attention. Review and respond within 24 hours.
            </p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
            <p className="font-semibold text-blue-800 mb-1">🤖 AI Performance</p>
            <p className="text-sm text-blue-700">
              {aiAnalysisRate}% of reports analyzed by AI, improving detection accuracy and response time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
