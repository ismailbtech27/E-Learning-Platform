import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tutor: '',
        fees: 0,
        imageUrl: ''
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        fetch('http://localhost:8080/api/courses')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching courses:", err));
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            const res = await fetch(`http://localhost:8080/api/courses/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setCourses(courses.filter(c => c.id !== id));
            } else {
                alert("Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchCourses();
                setShowModal(false);
                setFormData({ title: '', description: '', tutor: '', fees: 0, imageUrl: '' });
                alert("Course created successfully!");
            } else {
                alert("Failed to create course");
            }
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white font-sans transition-colors duration-300">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors shadow-sm"
                    >
                        <Plus size={20} /> Add New Course
                    </button>
                </div>

                <div className="bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden shadow-sm">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-[#333] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#252525]">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-1">Image</div>
                        <div className="col-span-4">Title</div>
                        <div className="col-span-3">Tutor</div>
                        <div className="col-span-1">Fees</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading courses...</div>
                    ) : courses.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No courses found. Add one to get started.</div>
                    ) : (
                        courses.map(course => (
                            <div key={course.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-[#333] items-center hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors">
                                <div className="col-span-1 text-gray-500">#{course.id}</div>
                                <div className="col-span-1">
                                    <img src={course.imageUrl || "placeholder.png"} className="w-10 h-10 rounded object-cover bg-gray-200 dark:bg-[#333]" />
                                </div>
                                <div className="col-span-4 font-medium">{course.title}</div>
                                <div className="col-span-3 text-gray-500 dark:text-gray-400 text-sm">{course.tutor}</div>
                                <div className="col-span-1 text-blue-600 dark:text-[#00e5ff] font-semibold">${course.fees}</div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <button
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-white dark:hover:bg-[#333] rounded transition-colors"
                                        title="Edit (Coming Soon)"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-300 dark:hover:bg-red-500/10 rounded transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-2xl w-full max-w-lg shadow-2xl">
                        <div className="p-6 border-b border-gray-200 dark:border-[#333] flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Course</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Advanced React Patterns"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Tutor Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                        value={formData.tutor}
                                        onChange={e => setFormData({ ...formData, tutor: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Fees ($)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                        value={formData.fees}
                                        onChange={e => setFormData({ ...formData, fees: parseFloat(e.target.value) })}
                                        placeholder="49.99"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Cover Image URL</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="url"
                                            className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                            value={formData.imageUrl}
                                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-[#333] rounded-lg flex items-center justify-center overflow-hidden border border-gray-300 dark:border-[#333]">
                                        {formData.imageUrl ? (
                                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon size={20} className="text-gray-400 dark:text-gray-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Description</label>
                                <textarea
                                    className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors h-32 resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of what students will learn..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black font-bold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors mt-4 flex items-center justify-center gap-2"
                            >
                                <Save size={20} /> Create Course
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
