import React from 'react';

const templates = [
  {
    id: 1,
    name: 'Professional',
    color: '#2563eb',
    preview: '👔'
  },
  {
    id: 2,
    name: 'Modern',
    color: '#7c3aed',
    preview: '🎨'
  },
  {
    id: 3,
    name: 'Creative',
    color: '#059669',
    preview: '✨'
  }
];

function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="template-selector">
      <h2>Select a Template</h2>
      <p>Choose a professional template to get started</p>
      <div className="template-grid">
        {templates.map((t) => (
          <div
            key={t.id}
            className={`template-card ${selected === t.id ? 'active' : ''}`}
            onClick={() => onSelect(t.id)}
            style={{ borderColor: selected === t.id ? t.color : '' }}
          >
            <div className="template-icon" style={{ background: t.color }}>
              {t.preview}
            </div>
            <h3>{t.name}</h3>
            {selected === t.id && <span className="selected-badge">✓ Selected</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;