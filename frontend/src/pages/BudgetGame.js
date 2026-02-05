import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateScore } from '../utils/localStorage';
import { toast } from 'sonner';
import { ArrowLeft, PiggyBank } from 'lucide-react';

export default function BudgetGame() {
  const navigate = useNavigate();
  const [savings, setSavings] = useState(5000);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const monthlyIncome = 30000;
  const minSavings = 1000;
  const maxSavings = 20000;

  const calculateScore = (savingsAmount) => {
    const savingsPercentage = (savingsAmount / monthlyIncome) * 100;
    
    if (savingsPercentage >= 20) {
      return { points: 50, feedback: 'Excellent! Saving 20% or more is a great financial habit.', level: 'high' };
    } else if (savingsPercentage >= 10) {
      return { points: 30, feedback: 'Good job! You\'re saving a healthy portion of your income.', level: 'medium' };
    } else {
      return { points: 10, feedback: 'Keep trying! Aim to save at least 10% of your income for better financial health.', level: 'low' };
    }
  };

  const handleSubmit = () => {
    const scoreResult = calculateScore(savings);
    updateScore('budgetScore', scoreResult.points);
    setResult(scoreResult);
    setShowResult(true);
    toast.success(`+${scoreResult.points} points earned!`);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const savingsPercentage = ((savings / monthlyIncome) * 100).toFixed(1);
  const expenses = monthlyIncome - savings;

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
              Budget Challenge
            </h1>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex-shrink-0">
              <PiggyBank className="w-8 h-8 text-amber-700" strokeWidth={2} />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your monthly income is <span className="font-bold text-green-700">₹{monthlyIncome.toLocaleString()}</span>
              </p>
              <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                How much should you save each month? Use the slider to decide.
              </p>
            </div>
          </div>
        </div>

        {/* Savings Slider Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                Monthly Savings
              </label>
              <div className="text-right">
                <span className="text-3xl font-bold text-green-700" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="savings-amount">
                  ₹{savings.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 ml-2">({savingsPercentage}%)</span>
              </div>
            </div>
            
            <input
              type="range"
              min={minSavings}
              max={maxSavings}
              step={500}
              value={savings}
              onChange={(e) => !showResult && setSavings(Number(e.target.value))}
              className="w-full h-3 bg-green-100 rounded-full outline-none appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #15803d 0%, #15803d ${((savings - minSavings) / (maxSavings - minSavings)) * 100}%, #dcfce7 ${((savings - minSavings) / (maxSavings - minSavings)) * 100}%, #dcfce7 100%)`
              }}
              data-testid="savings-slider"
              disabled={showResult}
            />
            
            <div className="flex justify-between text-xs text-gray-500 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>₹{minSavings.toLocaleString()}</span>
              <span>₹{maxSavings.toLocaleString()}</span>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
              <span className="text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Savings</span>
              <span className="text-green-700 font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>₹{savings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
              <span className="text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Available for Expenses</span>
              <span className="text-amber-700 font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>₹{expenses.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>Savings Rate</span>
              <span className="font-bold text-green-700">{savingsPercentage}%</span>
            </div>
            <div className="h-4 rounded-full bg-green-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
                style={{ width: `${savingsPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {showResult && result && (
          <div className={`rounded-2xl shadow-sm border p-6 mb-6 ${
            result.level === 'high' ? 'bg-green-50 border-green-200' :
            result.level === 'medium' ? 'bg-blue-50 border-blue-200' :
            'bg-amber-50 border-amber-200'
          }`}>
            <p className={`text-lg font-medium mb-2 ${
              result.level === 'high' ? 'text-green-900' :
              result.level === 'medium' ? 'text-blue-900' :
              'text-amber-900'
            }`} style={{ fontFamily: 'Manrope, sans-serif' }}>
              {result.feedback}
            </p>
            <p className={`text-sm ${
              result.level === 'high' ? 'text-green-700' :
              result.level === 'medium' ? 'text-blue-700' :
              'text-amber-700'
            }`} style={{ fontFamily: 'Inter, sans-serif' }}>
              You earned {result.points} points!
            </p>
          </div>
        )}

        {/* Action Button */}
        {!showResult ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg shadow-green-700/20 transition-transform active:scale-95"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            data-testid="budget-submit-button"
          >
            Submit Budget
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg transition-transform active:scale-95"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            data-testid="budget-continue-button"
          >
            Continue to Dashboard
          </button>
        )}

        {/* Tips Card */}
        {!showResult && (
          <div className="mt-6 bg-blue-50 rounded-2xl border border-blue-100 p-5">
            <p className="text-sm text-blue-900 font-medium mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              💡 Budget Tip
            </p>
            <p className="text-sm text-blue-800" style={{ fontFamily: 'Inter, sans-serif' }}>
              Financial experts recommend saving at least 20% of your income for a secure future.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
