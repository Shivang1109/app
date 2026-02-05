import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateScore } from '../utils/localStorage';
import { toast } from 'sonner';
import { ArrowLeft, Building2, Landmark, TrendingDown } from 'lucide-react';

export default function LoanGame() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const scenario = {
    title: 'Loan Decision Challenge',
    description: 'You need ₹50,000 for buying seeds for the upcoming season. Choose the best loan option:',
    options: [
      {
        id: 'moneylender',
        title: 'Local Moneylender',
        interest: '24% per year',
        features: ['Quick approval', 'No paperwork', 'Personal relationship'],
        points: -20,
        feedback: 'High interest rates can trap you in debt. Consider formal options for better rates.',
        icon: TrendingDown,
        color: 'red'
      },
      {
        id: 'bank',
        title: 'Bank Loan',
        interest: '12% per year',
        features: ['Moderate interest', 'Some paperwork', 'Formal process'],
        points: 30,
        feedback: 'Good choice! Bank loans offer reasonable rates and are regulated.',
        icon: Building2,
        color: 'blue'
      },
      {
        id: 'government',
        title: 'Government Scheme',
        interest: '4% per year',
        features: ['Lowest interest', 'Subsidized rates', 'Farmer-friendly'],
        points: 50,
        feedback: 'Excellent! Government schemes offer the best rates for farmers. Always check eligibility first.',
        icon: Landmark,
        color: 'green'
      },
    ],
  };

  const handleSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.error('Please select an option first');
      return;
    }

    const updatedScores = updateScore('loanScore', selectedOption.points);
    setShowResult(true);

    if (selectedOption.points > 0) {
      toast.success(`+${selectedOption.points} points earned!`);
    } else {
      toast.error(`${selectedOption.points} points. Learn and try again!`);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

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
              {scenario.title}
            </h1>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
          <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            {scenario.description}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-6">
          {scenario.options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedOption?.id === option.id;
            const showFeedback = showResult && isSelected;
            
            let borderClass = isSelected ? 'border-green-500 shadow-md' : 'border-green-100 hover:border-green-300 hover:shadow-md';
            
            let iconBgClass = 'bg-red-100';
            let iconColorClass = 'text-red-700';
            if (option.color === 'green') {
              iconBgClass = 'bg-green-100';
              iconColorClass = 'text-green-700';
            } else if (option.color === 'blue') {
              iconBgClass = 'bg-blue-100';
              iconColorClass = 'text-blue-700';
            }
            
            let feedbackBgClass = option.points > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200';
            let feedbackTextClass = option.points > 0 ? 'text-green-900' : 'text-red-900';
            
            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`bg-white rounded-2xl shadow-sm border-2 p-5 cursor-pointer transition-all duration-200 ${borderClass}`}
                data-testid={`loan-option-${option.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${iconBgClass}`}>
                    <Icon className={`w-6 h-6 ${iconColorClass}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {option.title}
                    </h3>
                    <p className="text-amber-700 font-bold text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Interest: {option.interest}
                    </p>
                    <ul className="space-y-1 mb-3">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600 text-sm flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {showFeedback && (
                      <div className={`mt-3 p-3 rounded-xl ${feedbackBgClass}`}>
                        <p className={`text-sm font-medium ${feedbackTextClass}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                          {option.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!showResult ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg shadow-green-700/20 transition-transform active:scale-95"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            data-testid="loan-submit-button"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg transition-transform active:scale-95"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            data-testid="loan-continue-button"
          >
            Continue to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
