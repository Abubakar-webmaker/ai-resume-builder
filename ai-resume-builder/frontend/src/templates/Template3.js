import React from 'react';

function Template3({ resume, formData }) {
  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      maxWidth: '800px',
      margin: '0 auto',
      background: '#ffffff',
      color: '#1a1a1a',
      padding: '0',
    }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #059669, #34d399)',
        padding: '40px',
        color: '#ffffff',
      }}>
        <h1 style={{ fontSize: '2.2rem', margin: '0 0 6px 0' }}>{formData?.name}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '0 0 16px 0' }}>{formData?.jobTitle}</p>
        <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', flexWrap: 'wrap' }}>
          {formData?.email && (
            <span style={{ background: 'rgba(0,0,0,0.15)', padding: '4px 12px', borderRadius: '20px' }}>
              📧 {formData.email}
            </span>
          )}
          {formData?.phone && (
            <span style={{ background: 'rgba(0,0,0,0.15)', padding: '4px 12px', borderRadius: '20px' }}>
              📞 {formData.phone}
            </span>
          )}
          {formData?.location && (
            <span style={{ background: 'rgba(0,0,0,0.15)', padding: '4px 12px', borderRadius: '20px' }}>
              📍 {formData.location}
            </span>
          )}
        </div>
      </div>

      {/* Skills Bar */}
      {formData?.skills && (
        <div style={{ background: '#f0fdf4', padding: '16px 40px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {formData.skills.split(',').map((skill, i) => (
            <span key={i} style={{
              background: '#059669',
              color: '#ffffff',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
            }}>
              {skill.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Resume Content */}
      <div style={{ padding: '32px 40px' }}>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '0.95rem' }}>
          {resume}
        </div>
      </div>
    </div>
  );
}

export default Template3;