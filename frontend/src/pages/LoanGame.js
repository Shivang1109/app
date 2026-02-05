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
          <LoanOption 
            option={scenario.options[0]}
            isSelected={selectedOption?.id === scenario.options[0].id}
            showResult={showResult}
            onSelect={() => handleSelect(scenario.options[0])}
          />
          <LoanOption 
            option={scenario.options[1]}
            isSelected={selectedOption?.id === scenario.options[1].id}
            showResult={showResult}
            onSelect={() => handleSelect(scenario.options[1])}
          />
          <LoanOption 
            option={scenario.options[2]}
            isSelected={selectedOption?.id === scenario.options[2].id}
            showResult={showResult}
            onSelect={() => handleSelect(scenario.options[2])}
          />
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
