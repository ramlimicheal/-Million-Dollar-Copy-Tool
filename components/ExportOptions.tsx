import React, { useState } from 'react';
import { exportToPDF, exportToMarkdown, copyToClipboard } from '../utils/pdfExport';

interface ExportOptionsProps {
  content: string;
  onGenerateCode?: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ content, onGenerateCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePDFExport = async () => {
    try {
      await exportToPDF(content, `analysis-${Date.now()}.pdf`);
    } catch (error) {
      alert('PDF export requires jsPDF library. Install with: npm install jspdf');
    }
  };

  const handleMarkdownExport = () => {
    exportToMarkdown(content, `analysis-${Date.now()}.md`);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-4 p-4 bg-gray-800 rounded-lg">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
      >
        {copied ? '✓ Copied!' : '📋 Copy to Clipboard'}
      </button>

      <button
        onClick={handleMarkdownExport}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
      >
        📄 Export Markdown
      </button>

      <button
        onClick={handlePDFExport}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition-colors"
      >
        📑 Export PDF
      </button>

      {onGenerateCode && (
        <button
          onClick={onGenerateCode}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded font-medium transition-colors"
        >
          🏗️ Generate Code Scaffolding
        </button>
      )}
    </div>
  );
};
