import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateScore } from '../utils/localStorage';
import { toast } from 'sonner';
import { ArrowLeft, Shield, Check, X } from 'lucide-react';

export default function FraudQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      id: 1,
      question: 'A person calls claiming to be from your bank and asks for your ATM PIN to "verify your account". What should you do?',
      options: [
        { id: 'a', text: 'Share the PIN as they are from the bank', correct: false },
        { id: 'b', text: 'Never share PIN with anyone, even bank staff', correct: true },
        { id: 'c', text: 'Share only half of the PIN', correct: false },
        { id: 'd', text: 'Ask them to come to your home', correct: false },
      ],
      explanation: 'Banks NEVER ask for your PIN, OTP, or password. These should always remain confidential.',
      points: 25,
    },
    {
      id: 2,
      question: 'You receive an SMS saying you won a government subsidy of ₹50,000. It asks you to click a link and enter bank details. What should you do?',
      options: [
        { id: 'a', text: 'Click the link immediately to claim money', correct: false },
        { id: 'b', text: 'Ignore it - government doesn\'t ask for bank details via SMS', correct: true },
        { id: 'c', text: 'Forward it to all your friends', correct: false },
        { id: 'd', text: 'Reply with your bank account number', correct: false },
      ],
      explanation: 'Government subsidies are processed through official channels, never via SMS links. This is a phishing scam.',
      points: 25,
    },
    {
      id: 3,
      question: 'Someone shares an OTP (One-Time Password) request on your phone, saying they need it to send you money. Should you share it?',
      options: [
        { id: 'a', text: 'Yes, if they promise to send money', correct: false },
        { id: 'b', text: 'No, OTPs should never be shared with anyone', correct: true },
        { id: 'c', text: 'Only if they are family members', correct: false },
        { id: 'd', text: 'Share it after they send the money first', correct: false },
      ],
      explanation: 'OTPs are meant only for you. Sharing them can allow scammers to access your bank account or digital wallet.',
      points: 25,
    },
    {
      id: 4,
      question: 'A person offers you a loan with very low interest but asks for advance payment before processing. What should you do?',
      options: [
        { id: 'a', text: 'Pay immediately to get the loan', correct: false },
        { id: 'b', text: 'Be cautious - legitimate loans don\'t require advance payment', correct: true },
        { id: 'c', text: 'Pay half the amount first', correct: false },
        { id: 'd', text: 'Take the loan and pay later', correct: false },
      ],
      explanation: 'Legitimate banks and financial institutions never ask for upfront payment. This is a common loan scam.',
      points: 25,
    },
  ];

  const handleSelectAnswer = (option) => {
    if (showResult) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast.error('Please select an answer');
      return;
    }

    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer.correct;
    const pointsEarned = isCorrect ? currentQ.points : 0;

    setAnswers([...answers, { questionId: currentQ.id, correct: isCorrect }]);
    setTotalScore(totalScore + pointsEarned);
    setShowResult(true);

    if (isCorrect) {
      toast.success(`Correct! +${currentQ.points} points`);
    } else {
      toast.error('Incorrect. Learn from this!');
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      updateScore('fraudScore', totalScore);
      navigate('/dashboard');
      toast.success(`Quiz completed! Total: ${totalScore} points`);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Fraud Awareness Quiz
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-green-100">
            <Shield className="w-4 h-4 text-green-700" strokeWidth={2} />
            <span className="text-sm font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="quiz-score">
              {totalScore}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 rounded-full bg-green-100 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
              <Shield className="w-6 h-6 text-red-700" strokeWidth={2} />
            </div>
            <p className="text-lg text-gray-900 leading-relaxed font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              {question.question}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option) => {
            const isSelected = selectedAnswer?.id === option.id;
            const showCorrect = showResult && option.correct;
            const showIncorrect = showResult && isSelected && !option.correct;
            
            return (
              <div
                key={option.id}
                onClick={() => handleSelectAnswer(option)}
                className={`bg-white rounded-2xl shadow-sm border-2 p-4 cursor-pointer transition-all duration-200 ${
                  showCorrect ? 'border-green-500 bg-green-50' :
                  showIncorrect ? 'border-red-500 bg-red-50' :
                  isSelected ? 'border-green-500 shadow-md' :
                  'border-green-100 hover:border-green-300 hover:shadow-md'
                }`}
                data-testid={`quiz-option-${option.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                    showCorrect ? 'bg-green-500 text-white' :
                    showIncorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-green-700 text-white' :
                    'bg-green-100 text-green-700'
                  }`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {showCorrect ? <Check className="w-5 h-5" strokeWidth={3} /> :
                     showIncorrect ? <X className="w-5 h-5" strokeWidth={3} /> :
                     option.id.toUpperCase()}
                  </div>
                  <p className="flex-1 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {option.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation Card */}
        {showResult && (
          <div className={`rounded-2xl shadow-sm border p-5 mb-6 ${
            selectedAnswer?.correct 
              ? 'bg-green-50 border-green-200' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <p className={`text-sm font-bold mb-2 ${
              selectedAnswer?.correct ? 'text-green-900' : 'text-amber-900'
            }`} style={{ fontFamily: 'Manrope, sans-serif' }}>
              {selectedAnswer?.correct ? '✓ Correct!' : '✗ Learn from this:'}
            </p>
            <p className={`text-sm ${
              selectedAnswer?.correct ? 'text-green-800' : 'text-amber-800'
            }`} style={{ fontFamily: 'Inter, sans-serif' }}>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        {!showResult ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg shadow-green-700/20 transition-transform active:scale-95"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            data-testid="quiz-submit-button"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-4 font-bold text-lg shadow-lg transition-transform active:scale-95"
            style={{ fontFamily: 'Manrope, sans-serif' }}
            data-testid="quiz-next-button"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}
