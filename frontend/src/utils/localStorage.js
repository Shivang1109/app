// LocalStorage utility functions for the Gamified Financial Literacy Dashboard

const STORAGE_KEYS = {
  PROFILE: 'farmer_profile',
  SCORES: 'farmer_scores',
};

// Profile operations
export const saveProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getProfile = () => {
  const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return profile ? JSON.parse(profile) : null;
};

export const clearProfile = () => {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
};

// Scores operations
export const getScores = () => {
  const scores = localStorage.getItem(STORAGE_KEYS.SCORES);
  return scores ? JSON.parse(scores) : {
    totalScore: 0,
    loanScore: 0,
    budgetScore: 0,
    fraudScore: 0,
  };
};

export const saveScores = (scores) => {
  localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
};

export const updateScore = (category, points) => {
  const scores = getScores();
  scores[category] = Math.max(0, scores[category] + points);
  scores.totalScore = scores.loanScore + scores.budgetScore + scores.fraudScore;
  saveScores(scores);
  return scores;
};

export const resetScores = () => {
  saveScores({
    totalScore: 0,
    loanScore: 0,
    budgetScore: 0,
    fraudScore: 0,
  });
};

export const resetAll = () => {
  clearProfile();
  resetScores();
};
