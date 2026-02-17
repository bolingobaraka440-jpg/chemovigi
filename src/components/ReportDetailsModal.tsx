import React from 'react';
import { Report } from '../App';
import { Download, Printer, X } from 'lucide-react';

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
  userRole: 'patient' | 'clinician';
}

export function ReportDetailsModal({ report, onClose, userRole }: ReportDetailsModalProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>ADR Report - ${report.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
              .section { margin: 20px 0; }
              .section-title { font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
              .field { margin: 10px 0; display: flex; }
              .field-label { font-weight: bold; width: 200px; color: #374151; }
              .field-value { color: #1f2937; flex: 1; }
              .severity-badge { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: bold; }
              .severity-critical { background: #fee2e2; color: #991b1b; }
              .severity-severe { background: #fed7aa; color: #9a3412; }
              .severity-moderate { background: #fef3c7; color: #92400e; }
              .severity-mild { background: #d1fae5; color: #065f46; }
              .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">ChemoVigi</div>
              <div style="color: #6b7280;">Adverse Drug Reaction Report</div>
              <div style="margin-top: 10px; font-size: 14px;">Report ID: #${report.id}</div>
            </div>
            
            <div class="section">
              <div class="section-title">Patient Information</div>
              <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${report.patientName}</div>
              </div>
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${report.patientEmail}</div>
              </div>
              <div class="field">
                <div class="field-label">Date Reported:</div>
                <div class="field-value">${report.dateReported}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Drug Information</div>
              <div class="field">
                <div class="field-label">Drug Name:</div>
                <div class="field-value">${report.drug}</div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Reaction Details</div>
              <div class="field">
                <div class="field-label">Severity:</div>
                <div class="field-value">
                  <span class="severity-badge severity-${report.severity.toLowerCase()}">${report.severity}</span>
                </div>
              </div>
              <div class="field">
                <div class="field-label">Symptoms:</div>
                <div class="field-value">${report.symptoms}</div>
              </div>
              <div class="field">
                <div class="field-label">Status:</div>
                <div class="field-value">${report.status}</div>
              </div>
              <div class="field">
                <div class="field-label">Urgency:</div>
                <div class="field-value">${report.urgency}</div>
              </div>
            </div>
            
            ${report.aiAnalyzed ? `
            <div class="section">
              <div class="section-title">AI Analysis</div>
              <div class="field">
                <div class="field-label">AI Analyzed:</div>
                <div class="field-value">Yes</div>
              </div>
              ${report.aiSuggestion ? `
              <div class="field">
                <div class="field-label">AI Suggestion:</div>
                <div class="field-value">${report.aiSuggestion}</div>
              </div>
              ` : ''}
            </div>
            ` : ''}
            
            <div class="footer">
              <div>ChemoVigi - Improving Drug Safety Through Better Reporting</div>
              <div style="margin-top: 5px;">Generated on ${new Date().toLocaleString()}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleExportPDF = () => {
    // For now, we'll use the print functionality and let the user save as PDF
    // In a real app, you'd use a library like jsPDF or pdfmake
    alert('Please use your browser\'s print dialog and select "Save as PDF" as the destination.');
    handlePrint();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'Severe': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Mild': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Adverse Drug Reaction Report</h2>
            <p className="text-blue-100 text-sm mt-1">Report ID: #{report.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Patient Information */}
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              Patient Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Name</p>
                <p className="font-semibold text-slate-800">{report.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Email</p>
                <p className="font-semibold text-slate-800">{report.patientEmail}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Date Reported</p>
                <p className="font-semibold text-slate-800">{report.dateReported}</p>
              </div>
            </div>
          </div>

          {/* Drug Information */}
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              Drug Information
            </h3>
            <div>
              <p className="text-sm text-slate-600 mb-1">Drug Name</p>
              <p className="font-semibold text-slate-800">{report.drug}</p>
            </div>
          </div>

          {/* Reaction Details */}
          <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Reaction Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">Severity</p>
                <span className={`inline-block px-4 py-2 rounded-lg border-2 font-bold ${getSeverityColor(report.severity)}`}>
                  {report.severity}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Symptoms</p>
                <p className="text-slate-800">{report.symptoms}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <p className="font-semibold text-slate-800">{report.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Urgency</p>
                  <p className="font-semibold text-slate-800">{report.urgency}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {report.aiAnalyzed && (
            <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                AI Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    AI Analyzed
                  </span>
                </div>
                {report.aiSuggestion && (
                  <div>
                    <p className="text-sm text-blue-700 mb-1">AI Suggestion</p>
                    <p className="text-blue-900">{report.aiSuggestion}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 rounded-b-2xl flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
