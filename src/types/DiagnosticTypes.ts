export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  text: string;
  nextQuestionId?: string;
  action?: string;
  category?: string;
}

export interface DiagnosticSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  currentQuestionId?: string;
  answers: {
    questionId: string;
    answerId: string;
    timestamp: Date;
  }[];
  notes: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
} 