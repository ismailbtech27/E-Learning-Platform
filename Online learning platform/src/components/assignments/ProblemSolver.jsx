import { useState } from 'react';
import { ArrowRight, Play, RefreshCw, Maximize2, CheckCircle } from 'lucide-react';

export default function ProblemSolver({ problem, onBack }) {
    const [code, setCode] = useState(problem?.codeTemplate || '// Write your code here');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    if (!problem) return null;

    const handleRun = () => {
        setIsRunning(true);
        // Simulate execution
        setTimeout(() => {
            setIsRunning(false);
            setOutput('Hello, World!\n\nProcess finished with exit code 0');
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-[#121212] text-white">
            {/* Header */}
            <div className="h-14 border-b border-[#333] flex items-center justify-between px-4 bg-[#1e1e1e]">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-gray-400 hover:text-white">
                        <ArrowRight className="rotate-180" size={20} />
                    </button>
                    <h2 className="font-bold text-lg truncate max-w-md">{problem.title}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#252525] hover:bg-[#333] rounded text-sm transition-colors border border-[#444]">
                        <RefreshCw size={14} /> Reset
                    </button>
                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                        {isRunning ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
                        Run Code
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-colors">
                        Submit
                    </button>
                </div>
            </div>

            {/* Main Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Problem Description */}
                <div className="w-1/3 border-r border-[#333] bg-[#1a1a1a] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent">
                        <h3 className="text-xl font-bold mb-4">Problem Description</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            {problem.description}
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-400 mb-2 uppercase text-xs tracking-wider">Input Format</h4>
                                <div className="bg-[#252525] p-3 rounded text-sm text-gray-300 border border-[#333]">
                                    No input required.
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-400 mb-2 uppercase text-xs tracking-wider">Output Format</h4>
                                <div className="bg-[#252525] p-3 rounded text-sm text-gray-300 border border-[#333]">
                                    Print "Hello, World!" to the console.
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-400 mb-2 uppercase text-xs tracking-wider">Sample Output</h4>
                                <div className="bg-[#121212] p-3 rounded text-sm font-mono text-green-400 border border-[#333]">
                                    Hello, World!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Code Editor & Output */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                    {/* Fake Monaco Editor */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 p-4 font-mono text-sm leading-6">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-transparent resize-none focus:outline-none text-gray-300 selection:bg-blue-500/30"
                                spellCheck="false"
                            />
                        </div>
                    </div>

                    {/* Console Output */}
                    <div className="h-1/3 border-t border-[#333] bg-[#121212] flex flex-col">
                        <div className="px-4 py-2 border-b border-[#333] flex justify-between items-center bg-[#1a1a1a]">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Console Output</span>
                            <button className="text-gray-500 hover:text-gray-300"><Maximize2 size={14} /></button>
                        </div>
                        <div className="p-4 font-mono text-sm flex-1 overflow-y-auto text-gray-300">
                            {output || <span className="text-gray-600 italic">Run execution to see output...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
