import React, { useState, useEffect } from 'react';
import { SurveyType, SurveyData } from './types/survey';
import { INITIAL_SAMPLE_SURVEYS } from './utils/sampleData';
import { PastoralHeader } from './components/PastoralHeader';
import { PastoralScene } from './components/PastoralScene';
import { SurveySelection } from './components/SurveySelection';
import { SurveyForm } from './components/SurveyForm';
import { ThankYouModal } from './components/ThankYouModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Lock, Heart, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'survey' | 'admin'>('home');
  const [selectedSurveyType, setSelectedSurveyType] = useState<SurveyType>('sheep');
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<SurveyData[]>([]);

  // Check initial admin auth and load surveys
  useEffect(() => {
    const token = localStorage.getItem('admin_auth_token');
    if (token) {
      setIsAdminAuthenticated(true);
    }
    loadSurveysList();
  }, []);

  const loadSurveysList = async () => {
    try {
      const res = await fetch('/api/surveys?key=123456');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setSurveys(data);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend surveys fetch skipped, loading local cache');
    }

    // Fallback to local storage
    const cached = localStorage.getItem('local_surveys_cache');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSurveys(parsed);
          return;
        }
      } catch (err) {
        console.error('Error parsing local surveys cache', err);
      }
    }

    // If completely empty, seed with initial sample surveys for demonstration
    setSurveys(INITIAL_SAMPLE_SURVEYS);
    localStorage.setItem('local_surveys_cache', JSON.stringify(INITIAL_SAMPLE_SURVEYS));
  };

  const handleSelectSurveyType = (type: SurveyType) => {
    setSelectedSurveyType(type);
    setCurrentView('survey');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSurveySubmitSuccess = () => {
    setShowThankYou(true);
    // Reload surveys in background for admin
    loadSurveysList();
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminTrigger = () => {
    if (isAdminAuthenticated) {
      setCurrentView('admin');
      loadSurveysList();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowLoginModal(false);
    setCurrentView('admin');
    loadSurveysList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_auth_token');
    setIsAdminAuthenticated(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSurvey = async (id: string) => {
    try {
      await fetch(`/api/surveys/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Delete on server failed, updating local state');
    }

    const updated = surveys.filter((s) => s.id !== id);
    setSurveys(updated);
    localStorage.setItem('local_surveys_cache', JSON.stringify(updated));
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      await fetch(`/api/surveys/${id}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: notes }),
      });
    } catch (e) {
      console.warn('Server note save failed, updating local state');
    }

    const updated = surveys.map((s) => (s.id === id ? { ...s, adminNotes: notes } : s));
    setSurveys(updated);
    localStorage.setItem('local_surveys_cache', JSON.stringify(updated));
  };

  const handleReanalyze = async (id: string) => {
    try {
      const res = await fetch(`/api/surveys/${id}/reanalyze`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.aiAnalysis) {
          const updated = surveys.map((s) =>
            s.id === id ? { ...s, aiAnalysis: data.aiAnalysis } : s
          );
          setSurveys(updated);
          localStorage.setItem('local_surveys_cache', JSON.stringify(updated));
          return;
        }
      }
    } catch (e) {
      console.error('Re-analyze call failed', e);
    }

    // Heuristic refresh if server offline
    const updated = surveys.map((s) => {
      if (s.id === id && s.aiAnalysis) {
        return {
          ...s,
          aiAnalysis: {
            ...s.aiAnalysis,
            analyzedAt: new Date().toISOString(),
          },
        };
      }
      return s;
    });
    setSurveys(updated);
    localStorage.setItem('local_surveys_cache', JSON.stringify(updated));
  };

  const handleLoadSampleData = () => {
    setSurveys(INITIAL_SAMPLE_SURVEYS);
    localStorage.setItem('local_surveys_cache', JSON.stringify(INITIAL_SAMPLE_SURVEYS));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100/70 via-emerald-50/40 to-amber-50/50">
      {/* Top Banner & Header */}
      <PastoralHeader />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <div className="max-w-5xl mx-auto px-4">
            {/* Interactive Pastoral Meadow Scene */}
            <PastoralScene />

            {/* Survey Choice Cards */}
            <SurveySelection onSelectType={handleSelectSurveyType} />
          </div>
        )}

        {currentView === 'survey' && (
          <SurveyForm
            surveyType={selectedSurveyType}
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitSuccess={handleSurveySubmitSuccess}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            surveys={surveys}
            onLogout={handleAdminLogout}
            onRefresh={loadSurveysList}
            onDeleteSurvey={handleDeleteSurvey}
            onSaveNotes={handleSaveNotes}
            onReanalyze={handleReanalyze}
            onLoadSampleData={handleLoadSampleData}
          />
        )}
      </main>

      {/* Discreet Shepherd / Admin Access Floating Button at Bottom Corner */}
      <div className="fixed bottom-4 right-4 z-40 no-print">
        <button
          onClick={handleAdminTrigger}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-emerald-800 border border-emerald-200/80 shadow-md shadow-emerald-950/10 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-bold"
          title="Lối vào bảo mật dành riêng cho Người Chăn / Admin"
        >
          <Lock className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-12 transition-transform" />
          <span>ADMIN / NGƯỜI CHĂN</span>
          {isAdminAuthenticated && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* Modals */}
      {showThankYou && <ThankYouModal onClose={handleCloseThankYou} />}

      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Pastoral Footer */}
      <footer className="mt-auto py-6 border-t border-emerald-100/80 bg-white/40 backdrop-blur-xs text-center text-xs text-stone-500 no-print">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span>🌿</span>
            <span>Đồng cỏ xanh tươi &amp; Mé nước bình tịnh</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </div>
          <div className="text-[11px] text-stone-400">
            Nguyện xin bình an và sự hiệp một tràn đầy trên gia đình đức tin.
          </div>
        </div>
      </footer>
    </div>
  );
}
