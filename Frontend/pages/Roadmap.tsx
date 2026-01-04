
import React, { useState, useEffect } from 'react';
import { BrainCircuit, CheckCircle2, Circle, Clock, Target, Sparkles, ChevronRight } from 'lucide-react';
import { generatePersonalizedPath } from '../services/geminiService';

const Roadmap: React.FC = () => {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      const data = await generatePersonalizedPath({
        currentLevel: 'Intermediate',
        interests: ['Web Development', 'React', 'TypeScript'],
        targetGoal: 'Senior Frontend Engineer',
        recentScores: [85, 92, 78]
      });
      setRoadmap(data);
      setLoading(false);
    };
    fetchRoadmap();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">EduSmart AI is crafting your path...</h3>
        <p className="text-slate-500 mt-2">Analyzing your performance and career goals.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              AI Generated Roadmap
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{roadmap?.summary || 'Your Learning Strategy'}</h1>
          <p className="text-slate-600 leading-relaxed max-w-2xl">
            Based on your progress in Data Structures and React, we've identified the key areas to focus on to reach your Senior Developer goal.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold px-2 flex items-center gap-3">
          <Target className="text-indigo-600 w-6 h-6" />
          Key Milestones
        </h2>
        
        <div className="space-y-4">
          {roadmap?.steps?.map((step: any, idx: number) => (
            <div 
              key={idx} 
              className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all flex items-start gap-6 cursor-pointer"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  idx === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'
                }`}>
                  {idx === 0 ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </div>
                {idx !== roadmap.steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-slate-100 my-2 group-hover:bg-indigo-100 transition-colors"></div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-bold text-lg ${idx === 0 ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    step.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {step.priority} Priority
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    Est. 4 hours
                  </span>
                  <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 group/btn">
                    Start Learning 
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
