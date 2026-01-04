
import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, MoreVertical, Play, Clock, Star, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!userId) {
          setError("User not authenticated");
          return;
        }

        setLoading(true);
        const data = await api.getStudentCourses();
        setCourses(data || []);
      } catch (err: any) {
        console.error("Failed to fetch courses:", err);
        setError("Could not load courses from backend.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [userId]);

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-slate-500">Connected to /api/student/courses API</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-indigo-500/20 w-64 text-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">No courses found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={course.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-slate-900 p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Play className="fill-current w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">{course.description || 'No description available'}</p>
                
                <div className="space-y-3">
                  {course.progress !== undefined && (
                    <>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-bold text-indigo-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full transition-all duration-500" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>ID: {course.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;

