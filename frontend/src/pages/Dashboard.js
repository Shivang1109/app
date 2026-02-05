import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getScores } from '../utils/localStorage';
import { Coins, TrendingUp, PiggyBank, Shield, BookOpen, Calculator, AlertTriangle, BarChart3 } from 'lucide-react';

function ModuleCard({ module, onNavigate }) {
  const Icon = module.icon;
  
  return (
    <div
      onClick={onNavigate}
      className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer group"
      data-testid={module.testId}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 bg-gradient-to-br ${module.color} rounded-xl shadow-lg flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-green-900 mb-1 group-hover:text-green-700 transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
            {module.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {module.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-green-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${module.color} transition-all duration-500`}
                style={{ width: `${Math.min((module.score / 100) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {module.score} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
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

  if (!profile) return null;

  const modules = [
    {
      id: 'loan',
      title: 'Loan Decision Game',
      description: 'Learn to choose the best loan options',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      score: scores.loanScore,
      path: '/game/loan',
      testId: 'module-loan-card'
    },
    {
      id: 'budget',
      title: 'Budget Challenge',
      description: 'Master the art of saving and planning',
      icon: Calculator,
      color: 'from-amber-500 to-amber-600',
      score: scores.budgetScore,
      path: '/game/budget',
      testId: 'module-budget-card'
    },
    {
      id: 'fraud',
      title: 'Fraud Awareness Quiz',
      description: 'Protect yourself from scams',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      score: scores.fraudScore,
      path: '/game/quiz',
      testId: 'module-fraud-card'
    },
  ];

  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Welcome back, {profile.name}!
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Continue your financial learning journey
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Total Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg">
                <Coins className="w-5 h-5 text-amber-700" strokeWidth={2} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Total Score</p>
            <p className="text-3xl font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="total-score">
              {scores.totalScore}
            </p>
          </div>

          {/* Loan Skill Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-700" strokeWidth={2} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Loan Skill</p>
            <p className="text-3xl font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="loan-score">
              {scores.loanScore}
            </p>
          </div>

          {/* Budget Skill Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                <PiggyBank className="w-5 h-5 text-blue-700" strokeWidth={2} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Budget Skill</p>
            <p className="text-3xl font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="budget-score">
              {scores.budgetScore}
            </p>
          </div>

          {/* Fraud Safety Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-lg">
                <Shield className="w-5 h-5 text-red-700" strokeWidth={2} />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Fraud Safety</p>
            <p className="text-3xl font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="fraud-score">
              {scores.fraudScore}
            </p>
          </div>
        </div>

        {/* Learning Modules Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Learning Modules
          </h2>
          <div className="flex flex-col gap-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => navigate(module.path)}
                  className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer group"
                  data-testid={module.testId}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${module.color} rounded-xl shadow-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-green-900 mb-1 group-hover:text-green-700 transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {module.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {module.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-green-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${module.color} transition-all duration-500`}
                            style={{ width: `${Math.min((module.score / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {module.score} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analytics Button */}
        <button
          onClick={() => navigate('/analytics')}
          className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full px-6 py-4 font-bold text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          style={{ fontFamily: 'Manrope, sans-serif' }}
          data-testid="view-analytics-button"
        >
          <BarChart3 className="w-5 h-5" strokeWidth={2} />
          View Analytics
        </button>
      </div>
    </div>
  );
}
