export type SurveyType = 'sheep' | 'cow';

export interface AIAnalysis {
  overview: string;
  personalityStrengths: string[];
  hiddenChallenges: string[];
  communicationTips: string[];
  actionPlan: string[];
  shepherdAdvice: string;
  analyzedAt: string;
}

export interface SurveyData {
  id: string;
  surveyType: SurveyType;
  submittedAt: string;
  fullName: string;
  nickname: string;
  birthDate: string;
  address: string;
  phone: string;
  workplace: string;
  position: string;
  lmsRole: string;
  careRelation: string; // sheep: "Ai đang chăm sóc?", cow: "Đang chăm sóc những ai?"
  completed70Lessons: string;
  completedFatherBook: string;
  completedPreachBook: string;
  fruitsCount: string;
  sixMonthPlan: string;
  uncomfortableThings: string;
  twoYearDifficulties: string;
  joyfulAchievements: string;
  lovelyCompliments: string;
  nextYearExpectations: string;
  aiAnalysis?: AIAnalysis;
  adminNotes?: string;
}
