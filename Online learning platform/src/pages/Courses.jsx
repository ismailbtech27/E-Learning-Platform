import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/courses')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching courses:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-[#00e5ff] selection:text-black transition-colors duration-300">
            <Navbar />

            {/* Header Section */}
            <div className="relative py-20 overflow-hidden mb-12 bg-white dark:bg-[#121212]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-[#00e5ff]/5 dark:via-[#121212] dark:to-[#121212]" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
                        Explore Our <span className="text-blue-600 dark:text-[#00e5ff] drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">Premium Courses</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Elevate your skills with industry-standard curriculum and expert guidance.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-[#00e5ff]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div key={course.id} className="bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-200 dark:border-[#333] hover:border-blue-300 dark:hover:border-[#00e5ff] transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] group flex flex-col h-full shadow-sm">
                                {/* Course Image */}
                                <div className="h-48 overflow-hidden relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 z-10" />
                                    <img
                                        src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"}
                                        alt={course.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 z-20">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-[#00e5ff]/20 text-blue-800 dark:text-[#00e5ff] text-xs rounded-full border border-blue-100 dark:border-[#00e5ff]/30 backdrop-blur-sm font-medium">
                                            Programming
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">{course.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>

                                    <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-500 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-[#333] flex items-center justify-center text-blue-600 dark:text-[#00e5ff] font-bold">
                                                {course.tutor && course.tutor.charAt(0)}
                                            </div>
                                            <span>{course.tutor}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span>4.8 (1.2k)</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-[#333]">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{course.fees}</span>
                                        <Link
                                            to={`/course/${course.id}`}
                                            className="px-4 py-2 bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors shadow-md dark:shadow-[0_0_15px_rgba(0,229,255,0.3)] block text-center"
                                        >
                                            Enroll Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {courses.length === 0 && (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                <p className="text-xl">No courses available at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
