import { useState, useEffect } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import TemplateSelector from './components/TemplateSelector';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

function App() {
  const [step, setStep] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resume, setResume] = useState('');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const loadingSteps = [
    '🤖 Initializing AI...',
    '📊 Analyzing your details...',
    '✍️ Crafting your resume...',
    '🎨 Applying finishing touches...',
    '✅ Almost done...'
  ];

useEffect(() => {
    if (loading) {
      let i = 0;
      setLoadingText(loadingSteps[0]);
      const interval = setInterval(() => {
        i = (i + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[i]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [loading, loadingSteps]);

  const handleTemplateSelect = (id) => setSelectedTemplate(id);
  const handleNext = () => { if (selectedTemplate) setStep('form'); };

  const generateResume = async (data) => {
    setFormData(data);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-resume', data);
      setResume(res.data.resume);
      setStep('preview');
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#667eea', '#764ba2', '#f093fb', '#34d399']
        });
      }, 300);
    } catch (err) {
      alert('Error generating resume. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      {/* Particle Background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
          }} />
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="typing-wrapper">
          <h1 className="typing-text">🤖 AI Resume Builder</h1>
        </div>
        <p className="header-sub">Create a professional resume in minutes with AI</p>
      </header>

      {/* Progress Bar */}
      <div className="progress-bar">
        {['Template', 'Details', 'Preview'].map((s, i) => {
          const stepKeys = ['template', 'form', 'preview'];
          const currentIndex = stepKeys.indexOf(step);
          const isActive = currentIndex >= i;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={`progress-step ${isActive ? 'active' : ''}`}>
                <span className="progress-num">{i + 1}</span>
                <span>{s}</span>
              </div>
              {i < 2 && <div className={`progress-line ${currentIndex > i ? 'done' : ''}`} />}
            </div>
          );
        })}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="loading-spinner" />
            <p className="loading-text">{loadingText}</p>
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="main">
        {step === 'template' && (
          <>
            <TemplateSelector selected={selectedTemplate} onSelect={handleTemplateSelect} />
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button className="btn-primary" onClick={handleNext} disabled={!selectedTemplate}>
                Next → Fill Details
              </button>
            </div>
          </>
        )}
        {step === 'form' && (
          <ResumeForm onGenerate={generateResume} loading={loading} />
        )}
        {step === 'preview' && (
          <ResumePreview resume={resume} formData={formData} template={selectedTemplate} />
        )}
      </main>
    </div>
  );
}

export default App;