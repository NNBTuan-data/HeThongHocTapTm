
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  BookOpen, 
  Zap, 
  ArrowRight,
  BrainCircuit,
  Star,
  Loader2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { getSmartLearningAssistant } from '../services/geminiService';
import { api } from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [aiTip, setAiTip] = useState<string>("Analyzing your data from the API...");
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const [studentProgress, setStudentProgress] = useState<any>(null);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const userName = localStorage.getItem('userName') || 'Student';

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (!userId) {
          navigate('/login');
          return;
        }

        // Gọi song song các API Java Spring với studentId
        const [progressList, quizzes] = await Promise.all([
          api.getStudentProgress(userId).catch(() => []),
          api.getQuizResults(userId).catch(() => [])
        ]);

        // Lấy progress đầu tiên hoặc fallback
        const progress = Array.isArray(progressList) && progressList.length > 0 
          ? progressList[0] 
          : { timeSpentMinutes: 750, averageQuizScore: 85 };

        setStudentProgress(progress);
        setQuizResults(quizzes || []);

        // Sau khi có dữ liệu progress, dùng Gemini để phân tích
        setIsLoadingAi(true);
        const tip = await getSmartLearningAssistant(
          "Dựa trên dữ liệu học tập này, hãy cho tôi 1 lời khuyên ngắn gọn.",
          `Điểm TB: ${progress.averageQuizScore}%, Thời gian học: ${progress.timeSpentMinutes} phút.`
        );
        setAiTip(tip || "Tiếp tục phát huy! Bạn đang đi đúng hướng.");
      } catch (err) {
        console.error("Dashboard data load failed", err);
      } finally {
        setIsLoadingAi(false);
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [userId, navigate]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {userName}! 👋</h1>
          <p className="text-slate-500 mt-1">Dữ liệu được cập nhật từ /api/student/{userId}/progress</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-amber-700">Level 12</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            <span className="font-bold text-indigo-700">7 Day Streak</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Metrics from API */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600 w-6 h-6" />
              </div>
              <p className="text-slate-500 text-sm font-medium">Courses Active</p>
              <h3 className="text-2xl font-bold mt-1">4</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="text-emerald-600 w-6 h-6" />
              </div>
              <p className="text-slate-500 text-sm font-medium">Time Spent</p>
              <h3 className="text-2xl font-bold mt-1">
                {studentProgress?.timeSpentMinutes ? Math.floor(studentProgress.timeSpentMinutes / 60) : 0}h
              </h3>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                <Star className="text-purple-600 w-6 h-6" />
              </div>
              <p className="text-slate-500 text-sm font-medium">Avg. Score</p>
              <h3 className="text-2xl font-bold mt-1">{studentProgress?.averageQuizScore || 0}%</h3>
            </div>
          </div>

          {/* Progress chart can stay as UI placeholder or use log data */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold mb-8">Performance History</h3>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{name: 'W1', score: 60}, {name: 'W2', score: 75}, {name: 'W3', score: studentProgress?.averageQuizScore || 85}]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                    <Area type="monotone" dataKey="score" stroke="#6366f1" fill="#6366f120" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* AI Advisor with Live API Context */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Personal Advisor</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                {isLoadingAi ? <Loader2 className="animate-spin w-5 h-5" /> : aiTip}
              </p>
              <button 
                onClick={() => navigate('/roadmap')}
                className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-2xl text-sm w-full hover:bg-indigo-50 transition-colors"
              >
                Cập nhật lộ trình
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          </div>

          {/* Real Quiz Results from API */}
          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <h3 className="font-bold mb-4">Kết quả Quiz gần đây</h3>
            <div className="space-y-4">
              {quizResults.length > 0 ? quizResults.slice(0, 3).map((quiz, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{quiz.quizTitle}</span>
                  <span className="text-sm font-bold text-emerald-400">{quiz.score}/{quiz.totalQuestions}</span>
                </div>
              )) : (
                <p className="text-xs text-slate-500">Chưa có kết quả bài kiểm tra nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
