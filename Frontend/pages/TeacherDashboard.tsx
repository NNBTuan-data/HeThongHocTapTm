
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  MoreVertical,
  Search,
  Download,
  Loader2,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { api } from '../services/api';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const teacherId = parseInt(localStorage.getItem('userId') || '0');
  const userName = localStorage.getItem('userName') || 'Teacher';

  useEffect(() => {
    if (!teacherId) {
      navigate('/login');
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await api.getTeacherStudents();
        setStudents(data || []);
      } catch (err) {
        console.error("Teacher student load failed", err);
        setError("Failed to load students. Please try again.");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [teacherId, navigate]);

  const filteredStudents = students.filter(s =>
    s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileId');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName}! 👨‍🏫</h1>
          <p className="text-slate-500">Dữ liệu từ /api/teacher/students</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'blue' },
          { label: 'Avg. Class Score', value: students.length > 0 ? `${Math.round(students.reduce((sum, s) => sum + (s.averageQuizScore || 0), 0) / students.length)}%` : '0%', icon: TrendingUp, color: 'emerald' },
          { label: 'Total Classes', value: '5', icon: AlertCircle, color: 'amber' },
          { label: 'Active Sessions', value: students.filter(s => s.lastAccessed).length, icon: CheckCircle2, color: 'indigo' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className={`bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 text-indigo-600`} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold">Quản lý sinh viên</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm sinh viên..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 ring-indigo-500/20"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p>No students found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Avg Score</th>
                  <th className="px-6 py-4">Last Accessed</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 font-medium">{s.fullName || 'Unknown'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{s.email}</td>
                    <td className="px-6 py-4 font-semibold">{s.averageQuizScore || 0}%</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {s.lastAccessed ? new Date(s.lastAccessed).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
