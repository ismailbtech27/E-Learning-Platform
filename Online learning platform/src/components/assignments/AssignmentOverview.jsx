import { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle, Clock, Award, ArrowRight, ChevronDown } from 'lucide-react';

export default function AssignmentOverview({ assignment, onSelectProblem, onBack }) {
    if (!assignment) return null;

    return (
        <div className="flex-1 overflow-y-auto bg-white dark:bg-[#121212] p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-6 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                    <ArrowRight className="rotate-180" size={16} /> Back to Course
                </button>

                {/* Header Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-[#121212] rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 border border-white/10">
                            {assignment.difficulty}
                        </span>
                        <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
                        <p className="text-blue-100 max-w-2xl">{assignment.description}</p>

                        <div className="flex gap-6 mt-6">
                            <div className="bg-black/20 rounded-lg p-3 px-6 backdrop-blur-sm border border-white/10">
                                <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Total Marks</p>
                                <p className="text-2xl font-bold">{assignment.totalMarks}</p>
                            </div>
                            <div className="bg-black/20 rounded-lg p-3 px-6 backdrop-blur-sm border border-white/10">
                                <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Problems</p>
                                <p className="text-2xl font-bold">{assignment.problems?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Problems List */}
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Problems</h2>
                <div className="space-y-3">
                    {assignment.problems?.map((problem, index) => (
                        <div
                            key={problem.id}
                            className="bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-xl p-5 hover:border-blue-400 dark:hover:border-[#00e5ff] transition-all cursor-pointer group flex items-center justify-between shadow-sm"
                            onClick={() => onSelectProblem(problem)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#333] flex items-center justify-center text-gray-400 font-bold border border-gray-200 dark:border-[#444] group-hover:border-blue-500 group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">
                                        {problem.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{problem.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className={`text-xs px-2 py-1 rounded border ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900' :
                                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900' :
                                            'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900'
                                    }`}>
                                    {problem.difficulty}
                                </span>
                                <div className="text-right min-w-[60px]">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{problem.marks}</span>
                                    <span className="text-xs text-gray-500 ml-1">pts</span>
                                </div>
                                <ArrowRight className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-[#00e5ff] transition-colors" size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
