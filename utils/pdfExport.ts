// PDF Export utility using jsPDF and html2canvas
// This provides client-side PDF generation

export const exportToPDF = async (content: string, filename: string = 'analysis-report.pdf'): Promise<void> => {
  try {
    // Dynamic import to reduce bundle size
    const { default: jsPDF } = await import('jspdf');

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - (margin * 2);

    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Website Analysis Report', margin, margin + 10);

    // Add metadata
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, margin + 20);

    // Add content
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(content, maxWidth);

    let yPosition = margin + 30;
    const lineHeight = 7;

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }

      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Save the PDF
    doc.save(filename);

    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export PDF. Make sure jsPDF is installed.');
  }
};

// Export to Markdown file
export const exportToMarkdown = (content: string, filename: string = 'analysis-report.md'): void => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

// Copy to clipboard
export const copyToClipboard = async (content: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// Export to JSON (for programmatic use)
export const exportToJSON = (data: any, filename: string = 'analysis-data.json'): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
