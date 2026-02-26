import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../AuthContext';
import { PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp, FileCode, Code } from 'lucide-react';
import AssignmentOverview from '../components/assignments/AssignmentOverview';
import ProblemSolver from '../components/assignments/ProblemSolver';

export default function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);

    
    const [viewMode, setViewMode] = useState('video');

    
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeAssignment, setActiveAssignment] = useState(null);
    const [activeProblem, setActiveProblem] = useState(null);

    const [expandedModule, setExpandedModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:8080/api/courses/${id}`).then(res => res.json()),
            fetch(`http://localhost:8080/api/courses/${id}/modules`).then(res => res.json()),
            
        ]).then(async ([courseData, modulesData]) => {
            setCourse(courseData);

            const modulesWithAssignments = await Promise.all(modulesData.map(async (m) => {
                const res = await fetch(`http://localhost:8080/api/modules/${m.id}/assignments`);
                const assignments = await res.json();
                return { ...m, assignments }; // Merge assignments
            }));

            // Fetch problems for assignments? Or lazy load them? Lazy load is better for "Overview".

            setModules(modulesWithAssignments);

            // Default State
            if (modulesWithAssignments.length > 0) {
                if (modulesWithAssignments[0].topics.length > 0) {
                    setActiveVideo(modulesWithAssignments[0].topics[0]);
                    setExpandedModule(modulesWithAssignments[0].id);
                }
            }

            setLoading(false);
        }).catch(err => {
            console.error("Error loading course:", err);
            setLoading(false);
        });
    }, [id]);

    const handleTopicClick = (topic) => {
        setViewMode('video');
        setActiveVideo(topic);
    };

    const handleAssignmentClick = async (assignment) => {
        // Fetch problems for this assignment when clicked
        try {
            const res = await fetch(`http://localhost:8080/api/assignments/${assignment.id}/problems`);
            const problems = await res.json();
            setActiveAssignment({ ...assignment, problems });
            setViewMode('assignment');
        } catch (err) {
            console.error("Error fetching problems:", err);
        }
    };

    const handleProblemSelect = (problem) => {
        setActiveProblem(problem);
        setViewMode('problem');
    };

    const toggleModule = (moduleId) => {
        setExpandedModule(expandedModule === moduleId ? null : moduleId);
    };

    if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white flex items-center justify-center">Loading...</div>;
    if (!course) return <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white flex items-center justify-center">Course not found.</div>;

    // Full Screen Problem Solving Mode (Different Layout)
    if (viewMode === 'problem') {
        return (
            <div className="h-screen flex flex-col overflow-hidden">
                <Navbar />
                {/* Navbar is optional here, maybe we want full focus. Keeping it for navigation. */}
                <div className="flex-1 overflow-hidden">
                    <ProblemSolver
                        problem={activeProblem}
                        onBack={() => setViewMode('assignment')}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white font-sans transition-colors duration-300 flex flex-col">
            <Navbar />

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-[calc(100vh-64px)]">
                {/* Main Content Area */}
                {viewMode === 'video' && (
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-white dark:bg-[#121212]">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-6">
                                <button onClick={() => navigate('/courses')} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                                    ← Back to Courses
                                </button>
                                <h1 className="text-2xl font-bold">{course.title}</h1>
                            </div>

                            {/* Video Player Container */}
                            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-8 border border-gray-200 dark:border-[#333]">
                                {activeVideo ? (
                                    <iframe
                                        src={activeVideo.videoUrl}
                                        title={activeVideo.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                        frameBorder="0"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        Select a topic to start watching
                                    </div>
                                )}
                            </div>

                            {/* Video Info */}
                            {activeVideo && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-[#00e5ff]">{activeVideo.title}</h2>
                                    <div className="bg-gray-50 dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#333]">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{activeVideo.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {viewMode === 'assignment' && (
                    <AssignmentOverview
                        assignment={activeAssignment}
                        onSelectProblem={handleProblemSelect}
                        onBack={() => setViewMode('video')}
                    />
                )}

                {/* Sidebar - Course Content */}
                <div className="w-full lg:w-96 bg-gray-50 dark:bg-[#1e1e1e] border-l border-gray-200 dark:border-[#333] overflow-y-auto flex-shrink-0">
                    <div className="p-6 border-b border-gray-200 dark:border-[#333]">
                        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Course Content</h2>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{modules.length} Modules</span>
                            <span>{modules.reduce((acc, m) => acc + m.topics.length, 0)} Lessons</span>
                        </div>
                    </div>

                    <div className="p-4 space-y-4">
                        {modules.map((module, index) => (
                            <div key={module.id} className="border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden bg-white dark:bg-[#252525] shadow-sm">
                                <button
                                    onClick={() => toggleModule(module.id)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors"
                                >
                                    <div className="text-left">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Module {index + 1}</div>
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">{module.title}</div>
                                    </div>
                                    {expandedModule === module.id ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                                </button>

                                {expandedModule === module.id && (
                                    <div className="bg-gray-50 dark:bg-[#1a1a1a]">
                                        {/* Topics (Videos) */}
                                        {module.topics.map((topic) => (
                                            <button
                                                key={`topic-${topic.id}`}
                                                onClick={() => handleTopicClick(topic)}
                                                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors text-left border-t border-gray-200 dark:border-[#333] ${activeVideo?.id === topic.id && viewMode === 'video' ? 'bg-blue-50 dark:bg-[#00e5ff]/10 border-l-4 border-l-blue-600 dark:border-l-[#00e5ff]' : ''}`}
                                            >
                                                {activeVideo?.id === topic.id && viewMode === 'video' ? (
                                                    <PlayCircle size={18} className="text-blue-600 dark:text-[#00e5ff] min-w-[18px]" />
                                                ) : (
                                                    <CheckCircle size={18} className="text-gray-400 dark:text-gray-600 min-w-[18px]" />
                                                )}
                                                <div className="overflow-hidden">
                                                    <div className={`text-sm truncate ${activeVideo?.id === topic.id && viewMode === 'video' ? 'text-blue-600 dark:text-[#00e5ff]' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {topic.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">Video • 10:00</div>
                                                </div>
                                            </button>
                                        ))}

                                        {/* Assignments */}
                                        {module.assignments && module.assignments.map((assignment) => (
                                            <button
                                                key={`assignment-${assignment.id}`}
                                                onClick={() => handleAssignmentClick(assignment)}
                                                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors text-left border-t border-gray-200 dark:border-[#333] ${activeAssignment?.id === assignment.id && viewMode === 'assignment' ? 'bg-purple-50 dark:bg-purple-900/10 border-l-4 border-l-purple-600' : ''}`}
                                            >
                                                <FileCode size={18} className="text-purple-600 dark:text-purple-400 min-w-[18px]" />
                                                <div>
                                                    <div className={`text-sm font-medium ${activeAssignment?.id === assignment.id && viewMode === 'assignment' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {assignment.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">Assignment • {assignment.difficulty}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
