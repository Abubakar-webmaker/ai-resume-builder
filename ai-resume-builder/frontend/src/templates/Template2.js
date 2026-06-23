import React from 'react';

function Template2({ resume, formData }) {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#ffffff',
      color: '#1a1a1a',
    }}>
      {/* Header */}
      <div style={{
        background: '#7c3aed',
        padding: 'clamp(24px, 5vw, 40px)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          flexShrink: 0,
        }}>
          👤
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', margin: '0 0 4px 0' }}>{formData?.name}</h1>
          <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', opacity: 0.85, margin: 0 }}>{formData?.jobTitle}</p>
        </div>
      </div>

      {/* Contact + Skills Row */}
      <div style={{
        background: '#f3f0ff',
        padding: '16px clamp(16px, 4vw, 32px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#7c3aed', marginBottom: '8px' }}>CONTACT</h3>
          {formData?.email && <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}>📧 {formData.email}</p>}
          {formData?.phone && <p style={{ fontSize: '0.85rem', marginBottom: '4px' }}>📞 {formData.phone}</p>}
          {formData?.location && <p style={{ fontSize: '0.85rem' }}>📍 {formData.location}</p>}
        </div>

        {formData?.skills && (
          <div style={{ flex: '2', minWidth: '200px' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#7c3aed', marginBottom: '8px' }}>SKILLS</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {formData.skills.split(',').map((skill, i) => (
                <span key={i} style={{
                  background: '#7c3aed',
                  color: '#fff',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                }}>
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resume Content */}
      <div style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
          {resume}
        </div>
      </div>
    </div>
  );
}

export default Template2;