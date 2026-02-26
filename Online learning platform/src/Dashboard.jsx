import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, PlayCircle, Clock, Award } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.username) {
            fetch(`http://localhost:8080/api/enrollments/my-courses?username=${user.username}`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed");
                    return res.json();
                })
                .then(data => {
                    setCourses(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching courses:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-[#00e5ff] selection:text-black transition-colors duration-300">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-12 relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-r dark:from-[#1e1e1e] dark:to-[#252525] p-8 border border-gray-200 dark:border-[#333] shadow-sm">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Award size={120} className="text-blue-600 dark:text-[#00e5ff]" />
                    </div>
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Welcome back, <span className="text-blue-600 dark:text-[#00e5ff]">{user?.username}</span>! 👋
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">You're making great progress. Ready to continue learning?</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#333] flex items-center gap-4 hover:border-blue-400 dark:hover:border-[#00e5ff]/50 transition-colors shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#00e5ff]/10 flex items-center justify-center text-blue-600 dark:text-[#00e5ff]">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Enrolled Courses</p>
                            <p className="text-2xl font-bold">{courses.length}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#333] flex items-center gap-4 hover:border-blue-400 dark:hover:border-[#00e5ff]/50 transition-colors shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#00e5ff]/10 flex items-center justify-center text-blue-600 dark:text-[#00e5ff]">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Hours Spent</p>
                            <p className="text-2xl font-bold">12.5</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#333] flex items-center gap-4 hover:border-blue-400 dark:hover:border-[#00e5ff]/50 transition-colors shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#00e5ff]/10 flex items-center justify-center text-blue-600 dark:text-[#00e5ff]">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Certificates</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <PlayCircle className="text-blue-600 dark:text-[#00e5ff]" /> My Learning
                </h2>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading your courses...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <div key={course.id} className="bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-200 dark:border-[#333] hover:border-blue-400 dark:hover:border-[#00e5ff] transition-all duration-300 group flex flex-col shadow-sm hover:shadow-md">
                                    <div className="h-40 bg-gray-100 dark:bg-[#252525] relative">
                                        {/* Placeholder for image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                                            <BookOpen size={48} />
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors line-clamp-1">{course.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-500 mb-4 text-sm">{course.tutor}</p>

                                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#333]">
                                            <div className="w-full bg-gray-200 dark:bg-[#333] rounded-full h-2 mb-4">
                                                <div className="bg-blue-600 dark:bg-[#00e5ff] h-2 rounded-full" style={{ width: '0%' }}></div>
                                            </div>
                                            <Link
                                                to={`/course/${course.id}`} // Changed to main course page for now as /learn might need specific implementation
                                                className="block w-full text-center bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black font-bold py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors"
                                            >
                                                Continue Learning
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-[#333] border-dashed">
                                <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-[#333] mb-4 text-gray-400">
                                    <BookOpen size={32} />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">You are not enrolled in any courses yet.</p>
                                <Link to="/courses" className="inline-flex items-center gap-2 bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black font-bold px-6 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors">
                                    Browse Courses
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
