import React from 'react';

function Template1({ resume, formData }) {
  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px',
      background: '#ffffff',
      color: '#1a1a1a',
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '3px solid #2563eb',
        paddingBottom: '20px',
        marginBottom: '24px'
      }}>
        <h1 style={{ fontSize: '2rem', color: '#2563eb', margin: 0 }}>{formData?.name}</h1>
        <p style={{ fontSize: '1.1rem', color: '#555', margin: '6px 0' }}>{formData?.jobTitle}</p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
          {formData?.email && <span>📧 {formData.email}</span>}
          {formData?.phone && <span>📞 {formData.phone}</span>}
          {formData?.location && <span>📍 {formData.location}</span>}
        </div>
      </div>

      {/* Resume Content */}
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '0.95rem' }}>
        {resume}
      </div>
    </div>
  );
}

export default Template1;