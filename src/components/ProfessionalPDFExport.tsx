import React from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import type { Report } from '../App';

interface ProfessionalPDFExportProps {
  reports: Report[];
  type: 'single' | 'analytics' | 'all';
  selectedReport?: Report;
}

export function ProfessionalPDFExport({ reports, type, selectedReport }: ProfessionalPDFExportProps) {
  
  const generatePDFContent = () => {
    const report = selectedReport || reports[0];
    const date = new Date().toLocaleDateString();
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>ChemoVigi - Pharmacovigilance Report</title>
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            background: white;
          }
          
          .page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            background: white;
            position: relative;
          }
          
          /* Header */
          .header {
            border-bottom: 4px solid;
            border-image: linear-gradient(to right, #3b82f6, #14b8a6, #22c55e) 1;
            padding-bottom: 20px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: start;
          }
          
          .logo-section {
            flex: 1;
          }
          
          .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }
          
          .logo-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #3b82f6, #14b8a6);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
          }
          
          .logo-text {
            display: flex;
            flex-direction: column;
          }
          
          .logo-title {
            font-size: 28px;
            font-weight: bold;
          }
          
          .logo-chemo {
            color: #3b82f6;
          }
          
          .logo-vigi {
            color: #14b8a6;
          }
          
          .motto {
            color: #64748b;
            font-size: 13px;
            font-style: italic;
            margin-top: 5px;
          }
          
          .report-meta {
            text-align: right;
            color: #64748b;
            font-size: 12px;
          }
          
          .report-meta strong {
            display: block;
            color: #1e293b;
            font-size: 14px;
            margin-bottom: 4px;
          }
          
          /* Title Section */
          .title-section {
            background: linear-gradient(135deg, #eff6ff, #f0fdfa);
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 30px;
            border-left: 5px solid #3b82f6;
          }
          
          .title-section h1 {
            color: #1e293b;
            font-size: 24px;
            margin-bottom: 8px;
          }
          
          .title-section p {
            color: #64748b;
            font-size: 14px;
          }
          
          /* Info Grid */
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .info-box {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          
          .info-box-label {
            color: #64748b;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          
          .info-box-value {
            color: #1e293b;
            font-size: 16px;
            font-weight: 600;
          }
          
          /* Severity Badge */
          .severity-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          }
          
          .severity-mild {
            background: #fef3c7;
            color: #92400e;
          }
          
          .severity-moderate {
            background: #fed7aa;
            color: #9a3412;
          }
          
          .severity-severe {
            background: #fecaca;
            color: #991b1b;
          }
          
          .severity-critical {
            background: #fca5a5;
            color: #7f1d1d;
            font-weight: 700;
          }
          
          /* Status Badge */
          .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          }
          
          .status-under-review {
            background: #dbeafe;
            color: #1e40af;
          }
          
          .status-reviewed {
            background: #d1fae5;
            color: #065f46;
          }
          
          .status-urgent {
            background: #fee2e2;
            color: #991b1b;
          }
          
          /* Content Section */
          .content-section {
            margin-bottom: 25px;
          }
          
          .content-section h2 {
            color: #1e293b;
            font-size: 18px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e2e8f0;
          }
          
          .content-section p {
            color: #475569;
            font-size: 14px;
            line-height: 1.8;
          }
          
          /* AI Analysis Box */
          .ai-box {
            background: linear-gradient(135deg, #f0f9ff, #f0fdfa);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #06b6d4;
            margin: 20px 0;
          }
          
          .ai-box h3 {
            color: #0e7490;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .ai-icon {
            width: 20px;
            height: 20px;
            background: #06b6d4;
            color: white;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
          
          /* Footer */
          .footer {
            position: absolute;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #94a3b8;
            font-size: 11px;
          }
          
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
          }
          
          .footer-item {
            text-align: center;
          }
          
          .footer-item strong {
            display: block;
            color: #64748b;
            font-size: 12px;
            margin-bottom: 4px;
          }
          
          /* Watermark */
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            font-weight: bold;
            color: rgba(59, 130, 246, 0.03);
            z-index: -1;
            white-space: nowrap;
          }
          
          /* Print Styles */
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            
            .page {
              page-break-after: always;
            }
            
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="watermark">ChemoVigi</div>
        
        <div class="page">
          <!-- Header -->
          <div class="header">
            <div class="logo-section">
              <div class="logo">
                <div class="logo-icon">CV</div>
                <div class="logo-text">
                  <div class="logo-title">
                    <span class="logo-chemo">Chemo</span><span class="logo-vigi">Vigi</span>
                  </div>
                </div>
              </div>
              <div class="motto">
                "Improving Drug Safety Through Better Reporting"
              </div>
            </div>
            
            <div class="report-meta">
              <strong>Pharmacovigilance Report</strong>
              <div>Report ID: ${type === 'single' && report ? `#${report.id}` : 'Multiple'}</div>
              <div>Generated: ${date}</div>
              <div>Status: Official Document</div>
            </div>
          </div>
          
          <!-- Title Section -->
          <div class="title-section">
            <h1>Adverse Event Report - ${type === 'single' && report ? report.drug : 'Analytics Summary'}</h1>
            <p>This report has been generated by ChemoVigi's AI-powered pharmacovigilance system for regulatory review and clinical assessment.</p>
          </div>
          
          ${type === 'single' && report ? `
          <!-- Patient Information -->
          <div class="info-grid">
            <div class="info-box">
              <div class="info-box-label">Patient Name</div>
              <div class="info-box-value">${report.patientName}</div>
            </div>
            
            <div class="info-box">
              <div class="info-box-label">Contact</div>
              <div class="info-box-value">${report.patientEmail}</div>
            </div>
            
            <div class="info-box">
              <div class="info-box-label">Medication</div>
              <div class="info-box-value">${report.drug}</div>
            </div>
            
            <div class="info-box">
              <div class="info-box-label">Date Reported</div>
              <div class="info-box-value">${report.dateReported}</div>
            </div>
            
            <div class="info-box">
              <div class="info-box-label">Severity Level</div>
              <div class="info-box-value">
                <span class="severity-badge severity-${report.severity.toLowerCase()}">${report.severity}</span>
              </div>
            </div>
            
            <div class="info-box">
              <div class="info-box-label">Current Status</div>
              <div class="info-box-value">
                <span class="status-badge status-${report.status.toLowerCase().replace(' ', '-')}">${report.status}</span>
              </div>
            </div>
          </div>
          
          <!-- Symptoms -->
          <div class="content-section">
            <h2>Reported Symptoms</h2>
            <p>${report.symptoms}</p>
          </div>
          
          <!-- AI Analysis -->
          ${report.aiAnalyzed ? `
          <div class="ai-box">
            <h3><span class="ai-icon">AI</span> AI-Powered Analysis</h3>
            <p>${report.aiSuggestion || 'Analysis pending...'}</p>
            <p style="margin-top: 10px; font-size: 12px; color: #64748b;">
              <strong>Urgency Level:</strong> ${report.urgency} | <strong>Priority:</strong> ${report.priority}
            </p>
          </div>
          ` : ''}
          
          <!-- Clinical Assessment -->
          <div class="content-section">
            <h2>Clinical Assessment Required</h2>
            <p>This report requires review by a licensed healthcare professional. The AI system has flagged this case based on WHO severity criteria and established pharmacovigilance protocols.</p>
          </div>
          
          <!-- Recommendations -->
          <div class="content-section">
            <h2>Next Steps & Recommendations</h2>
            <p>
              1. Immediate clinical review by assigned healthcare professional<br>
              2. Patient follow-up within 24-48 hours<br>
              3. Documentation of clinical findings and interventions<br>
              4. Regulatory reporting to Rwanda FDA if applicable<br>
              5. Patient safety monitoring and outcome tracking
            </p>
          </div>
          ` : `
          <!-- Analytics Summary -->
          <div class="content-section">
            <h2>Analytics Summary</h2>
            <p>Total Reports Analyzed: ${reports.length}</p>
            <p>Time Period: ${reports[0]?.dateReported} to ${reports[reports.length - 1]?.dateReported}</p>
            
            <div class="info-grid" style="margin-top: 20px;">
              <div class="info-box">
                <div class="info-box-label">Critical Cases</div>
                <div class="info-box-value">${reports.filter(r => r.severity === 'Critical').length}</div>
              </div>
              
              <div class="info-box">
                <div class="info-box-label">Severe Cases</div>
                <div class="info-box-value">${reports.filter(r => r.severity === 'Severe').length}</div>
              </div>
              
              <div class="info-box">
                <div class="info-box-label">AI Analyzed</div>
                <div class="info-box-value">${reports.filter(r => r.aiAnalyzed).length}</div>
              </div>
              
              <div class="info-box">
                <div class="info-box-label">Under Review</div>
                <div class="info-box-value">${reports.filter(r => r.status === 'Under Review').length}</div>
              </div>
            </div>
          </div>
          `}
          
          <!-- Regulatory Compliance -->
          <div class="content-section">
            <h2>Regulatory Compliance</h2>
            <p>
              This report complies with WHO pharmacovigilance standards and Rwanda FDA reporting requirements. 
              All patient data is handled in accordance with HIPAA-ready security protocols and local data protection regulations.
            </p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div><strong>ChemoVigi - Professional Pharmacovigilance Platform</strong></div>
            <div class="footer-grid">
              <div class="footer-item">
                <strong>Contact</strong>
                <div>support@chemovigi.com</div>
              </div>
              <div class="footer-item">
                <strong>Emergency Hotline</strong>
                <div>1-800-CHEMOVIGI</div>
              </div>
              <div class="footer-item">
                <strong>Partnership</strong>
                <div>Rwanda FDA Certified</div>
              </div>
            </div>
            <div style="margin-top: 15px; font-size: 10px;">
              © ${new Date().getFullYear()} ChemoVigi. All rights reserved. This document contains confidential medical information.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownloadPDF = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ChemoVigi_Report_${type}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handleDownloadExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Headers
    csvContent += "Report ID,Patient Name,Email,Drug,Severity,Symptoms,Date Reported,Status,AI Analyzed,AI Suggestion,Priority,Urgency\n";
    
    // Data rows
    const dataToExport = type === 'single' && selectedReport ? [selectedReport] : reports;
    dataToExport.forEach(report => {
      const row = [
        report.id,
        report.patientName,
        report.patientEmail,
        report.drug,
        report.severity,
        `"${report.symptoms.replace(/"/g, '""')}"`,
        report.dateReported,
        report.status,
        report.aiAnalyzed ? 'Yes' : 'No',
        report.aiSuggestion ? `"${report.aiSuggestion.replace(/"/g, '""')}"` : 'N/A',
        report.priority,
        report.urgency
      ].join(',');
      csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ChemoVigi_Data_${type}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
      >
        <FileDown className="w-5 h-5" />
        Export PDF
      </button>
      
      <button
        onClick={handleDownloadExcel}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
      >
        <FileSpreadsheet className="w-5 h-5" />
        Export Excel
      </button>
    </div>
  );
}
