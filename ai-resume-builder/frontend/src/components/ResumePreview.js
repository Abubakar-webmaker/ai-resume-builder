import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';

function ResumePreview({ resume, formData, template }) {
  const printRef = useRef();

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(resume, 180);
    doc.setFontSize(12);
    doc.text(lines, 15, 20);
    doc.save(`${formData?.name || 'Resume'}-resume.pdf`);
  };

  const renderTemplate = () => {
    switch (template) {
      case 1: return <Template1 resume={resume} formData={formData} />;
      case 2: return <Template2 resume={resume} formData={formData} />;
      case 3: return <Template3 resume={resume} formData={formData} />;
      default: return <Template1 resume={resume} formData={formData} />;
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2>Your Generated Resume</h2>
        <button className="btn-download" onClick={downloadPDF}>
          📄 Download PDF
        </button>
      </div>
      <div ref={printRef}>
        {renderTemplate()}
      </div>
    </div>
  );
}

export default ResumePreview;