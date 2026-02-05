import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import LoanGame from './pages/LoanGame';
import BudgetGame from './pages/BudgetGame';
import FraudQuiz from './pages/FraudQuiz';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game/loan" element={<LoanGame />} />
          <Route path="/game/budget" element={<BudgetGame />} />
          <Route path="/game/quiz" element={<FraudQuiz />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
