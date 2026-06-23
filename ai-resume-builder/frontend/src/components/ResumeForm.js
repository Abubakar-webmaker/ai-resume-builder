import React, { useState } from 'react';

const steps = ['Personal Info', 'Experience', 'Education', 'Skills'];

function ResumeForm({ onGenerate, loading }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', jobTitle: '', location: '',
    experience: '', education: '', skills: '', summary: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="form-container">
      {/* Step Indicator */}
      <div className="steps">
        {steps.map((s, i) => (
          <div key={i} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <div className="step-circle">{i < step ? '✓' : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* Step 0 - Personal Info */}
      {step === 0 && (
        <div className="step-content">
          <h3>Personal Information</h3>
          <div className="form-row">
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <input name="location" placeholder="Location (e.g. Karachi, Pakistan)" value={formData.location} onChange={handleChange} />
          </div>
          <input name="jobTitle" placeholder="Job Title (e.g. Full Stack Developer)" value={formData.jobTitle} onChange={handleChange} />
        </div>
      )}

      {/* Step 1 - Experience */}
      {step === 1 && (
        <div className="step-content">
          <h3>Work Experience</h3>
          <textarea
            name="experience"
            placeholder="Describe your work experience...
Example:
Full Stack Developer at XYZ Company (2023-2024)
- Built REST APIs with Node.js
- Developed React.js frontend"
            value={formData.experience}
            onChange={handleChange}
            rows={8}
          />
        </div>
      )}

      {/* Step 2 - Education */}
      {step === 2 && (
        <div className="step-content">
          <h3>Education</h3>
          <textarea
            name="education"
            placeholder="Describe your education...
Example:
Intermediate - Karachi Board (2024)
Full Stack MERN Certification - Adamjee Institute (2025)"
            value={formData.education}
            onChange={handleChange}
            rows={6}
          />
        </div>
      )}

      {/* Step 3 - Skills */}
      {step === 3 && (
        <div className="step-content">
          <h3>Skills</h3>
          <textarea
            name="skills"
            placeholder="List your skills...
Example:
React.js, Node.js, Express.js, MongoDB, React Native, TypeScript, Next.js, Git"
            value={formData.skills}
            onChange={handleChange}
            rows={4}
          />
          <textarea
            name="summary"
            placeholder="Professional Summary (optional - AI will generate if empty)"
            value={formData.summary}
            onChange={handleChange}
            rows={4}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="form-buttons">
        {step > 0 && (
          <button className="btn-secondary" onClick={prev}>← Back</button>
        )}
        {step < steps.length - 1 ? (
          <button className="btn-primary" onClick={next}>Next →</button>
        ) : (
          <button className="btn-generate" onClick={() => onGenerate(formData)} disabled={loading}>
            {loading ? '⏳ Generating...' : '✨ Generate Resume'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ResumeForm;