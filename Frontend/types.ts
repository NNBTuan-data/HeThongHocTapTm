
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginResponse {
  userId: number;
  profileId: number;
  fullName: string;
  email: string;
  role: UserRole;
  token: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  progress?: number;
  teacherId: number;
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content?: string;
  order: number;
}

export interface Material {
  id: number;
  lessonId: number;
  title: string;
  type: 'VIDEO' | 'PDF' | 'DOC' | 'LINK';
  url: string;
}

export interface StudentProgress {
  id?: number;
  studentId: number;
  courseId: number;
  completedLessons: number[];
  averageQuizScore: number;
  lastAccessed: string;
  timeSpentMinutes: number;
}

export interface Recommendation {
  id: number;
  studentId: number;
  title: string;
  reason: string;
  type: 'MATERIAL' | 'COURSE' | 'ACTIVITY';
  url?: string;
}

export interface QuizResult {
  id?: number;
  studentId: number;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
}

export interface LearningLog {
  id?: number;
  studentId: number;
  timestamp: string;
  action: string;
  details: string;
}
