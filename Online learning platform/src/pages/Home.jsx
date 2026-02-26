import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Award } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-[#00e5ff] selection:text-black transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <div className="relative py-32 overflow-hidden bg-white dark:bg-[#121212]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-[#00e5ff]/10 dark:via-[#121212] dark:to-[#121212]" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-200 dark:border-[#00e5ff]/30 bg-blue-50 dark:bg-[#00e5ff]/10 text-blue-600 dark:text-[#00e5ff] text-sm font-medium backdrop-blur-sm">
                        🚀 Launch your career today
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-gray-400">
                        Master the Future of <br />
                        <span className="text-blue-600 dark:text-[#00e5ff] drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">Development</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Unlock your potential with expert-led courses. Build real-world projects and master the latest technologies with our premium learning platform.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/courses" className="group relative bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-all duration-300 shadow-lg dark:shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center">
                            Explore Courses
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/signup" className="px-8 py-4 rounded-full font-bold text-lg border border-gray-300 dark:border-[#333] hover:border-blue-600 dark:hover:border-[#00e5ff] text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-all duration-300 backdrop-blur-sm">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] hover:border-blue-300 dark:hover:border-[#00e5ff]/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-[#00e5ff]/10 flex items-center justify-center text-blue-600 dark:text-[#00e5ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">Expert-Led content</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Learn directly from industry veterans and specialized professionals who have worked at top tech companies.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] hover:border-blue-300 dark:hover:border-[#00e5ff]/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-[#00e5ff]/10 flex items-center justify-center text-blue-600 dark:text-[#00e5ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">Self-Paced Learning</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Access high-quality content 24/7 on any device. Start, pause, and resume your learning journey whenever you want.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] hover:border-blue-300 dark:hover:border-[#00e5ff]/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
                        <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-[#00e5ff]/10 flex items-center justify-center text-blue-600 dark:text-[#00e5ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Award size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">Career Certificates</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Earn verified certificates upon completion to showcase your mastery and boost your professional portfolio.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
