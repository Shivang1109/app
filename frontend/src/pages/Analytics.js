import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getScores, resetAll } from '../utils/localStorage';
import { ArrowLeft, TrendingUp, Award, RotateCcw } from 'lucide-react';

export default function Analytics() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [scores, setScores] = useState({ totalScore: 0, loanScore: 0, budgetScore: 0, fraudScore: 0 });

  useEffect(() => {
    const userProfile = getProfile();
    if (!userProfile) {
      navigate('/');
      return;
    }
    setProfile(userProfile);
    setScores(getScores());
  }, [navigate]);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetAll();
      navigate('/');
    }
  };

  if (!profile) return null;

  const modules = [
    { name: 'Loan Decision', score: scores.loanScore, maxScore: 100, color: 'green' },
    { name: 'Budget Challenge', score: scores.budgetScore, maxScore: 100, color: 'blue' },
    { name: 'Fraud Awareness', score: scores.fraudScore, maxScore: 100, color: 'red' },
  ];

  const overallProgress = ((scores.totalScore / 300) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-white rounded-full transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft className="w-6 h-6 text-green-900" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Your Progress
            </h1>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Total Score</p>
              <p className="text-5xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="analytics-total-score">
                {scores.totalScore}
              </p>
              <p className="text-green-100 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>out of 300 points</p>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <Award className="w-12 h-12" strokeWidth={2} />
            </div>
          </div>
          <div className="h-3 rounded-full bg-white/20 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <p className="text-green-100 text-sm mt-2 text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
            {overallProgress}% Complete
          </p>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 mb-6">
          <h2 className="text-lg font-bold text-green-900 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Profile Information
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Name:</span>
              <span className="font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>{profile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Crop Type:</span>
              <span className="font-medium text-gray-900 capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>{profile.cropType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Region:</span>
              <span className="font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>{profile.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Risk Preference:</span>
              <span className="font-medium text-gray-900 capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>{profile.riskPreference}</span>
            </div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Module Progress
          </h2>
          <div className="space-y-4">
            {modules.map((module, idx) => {
              const percentage = ((module.score / module.maxScore) * 100).toFixed(0);
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl shadow-sm border border-green-100 p-5"
                  data-testid={`analytics-module-${idx}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {module.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-700" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {module.score}
                      </span>
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        / {module.maxScore}
                      </span>
                    </div>
                  </div>
                  <div className="h-3 rounded-full bg-green-100 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        module.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        module.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {percentage}% Complete
                    </span>
                    {percentage < 100 && (
                      <span className="text-xs text-amber-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Keep learning!
                      </span>
                    )}
                    {percentage == 100 && (
                      <span className="text-xs text-green-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        ✓ Mastered
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-200 rounded-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-700" strokeWidth={2} />
            </div>
            <div>
              <p className="text-blue-900 font-bold text-sm mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Learning Insights
              </p>
              <ul className="space-y-1 text-sm text-blue-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                <li>• Complete all modules to maximize your financial knowledge</li>
                <li>• Replay modules to improve your scores</li>
                <li>• Apply these learnings in your real financial decisions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reset Progress Button */}
        <button
          onClick={handleReset}
          className="w-full bg-red-50 hover:bg-red-100 text-red-700 rounded-full px-6 py-4 font-bold text-lg border-2 border-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          data-testid="reset-progress-button"
        >
          <RotateCcw className="w-5 h-5" strokeWidth={2} />
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
