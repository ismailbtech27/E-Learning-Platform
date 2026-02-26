import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { useAuth } from '../AuthContext';
import { User, Mail, Shield, BookOpen, Edit2, X, Camera } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ profileImageUrl: '' });

    useEffect(() => {
        if (user?.username) {
            fetchData();
        }
    }, [user]);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            fetch(`http://localhost:8080/api/auth/me?username=${user.username}`).then(res => res.json()),
            fetch(`http://localhost:8080/api/enrollments/my-courses?username=${user.username}`).then(res => res.json())
        ]).then(([userData, coursesData]) => {
            setUserDetails(userData);
            setEditForm({ profileImageUrl: userData.profileImageUrl || '' });
            setMyCourses(coursesData);
            setLoading(false);
        }).catch(err => {
            console.error("Error details:", err);
            setLoading(false);
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/auth/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: user.username,
                    profileImageUrl: editForm.profileImageUrl
                })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUserDetails(updatedUser);
                setShowEditModal(false);
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!user) return <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex items-center justify-center text-gray-900 dark:text-white">Please login to view profile.</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white font-sans selection:bg-blue-200 dark:selection:bg-[#00e5ff] selection:text-black transition-colors duration-300">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <span className="bg-blue-100 dark:bg-[#00e5ff]/10 p-2 rounded-lg text-blue-600 dark:text-[#00e5ff]"><User size={32} /></span>
                        My Profile
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar / User Info Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-[#333] p-8 text-center sticky top-24 relative group shadow-sm">
                                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-[#333] mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-blue-100 dark:border-[#00e5ff]/20 relative">
                                    {userDetails?.profileImageUrl ? (
                                        <img src={userDetails.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl font-bold text-blue-600 dark:text-[#00e5ff]">
                                            {userDetails?.username?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="absolute top-8 right-8 bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black p-2 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-transform hover:scale-110"
                                    title="Edit Profile"
                                >
                                    <Edit2 size={16} />
                                </button>

                                <h2 className="text-2xl font-bold mb-2">{userDetails?.username || user.username}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{userDetails?.email || "No email provided"}</p>

                                <div className="flex justify-center">
                                    <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-[#00e5ff]/10 text-blue-600 dark:text-[#00e5ff] text-sm font-bold border border-blue-200 dark:border-[#00e5ff]/20">
                                        {userDetails?.role || "STUDENT"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Personal Details */}
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-[#333] p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Shield size={20} className="text-blue-600 dark:text-[#00e5ff]" /> Account Details
                                </h3>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-gray-500 text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">Username</label>
                                        <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-lg p-4 text-gray-700 dark:text-gray-200">
                                            {userDetails?.username || user.username}
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-gray-500 text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-[#00e5ff] transition-colors">Email Address</label>
                                        <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-lg p-4 text-gray-700 dark:text-gray-200 flex items-center gap-3">
                                            <Mail size={18} className="text-gray-400 dark:text-gray-500" />
                                            {userDetails?.email || "user@example.com"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enrolled Courses List */}
                            <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl border border-gray-200 dark:border-[#333] p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <BookOpen size={20} className="text-blue-600 dark:text-[#00e5ff]" /> Enrolled Courses
                                </h3>

                                {loading ? (
                                    <div className="text-center py-8 text-gray-500">Loading...</div>
                                ) : myCourses.length > 0 ? (
                                    <div className="space-y-4">
                                        {myCourses.map(course => (
                                            <div key={course.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#252525] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors border border-transparent hover:border-blue-200 dark:hover:border-[#00e5ff]/30">
                                                <div className="w-12 h-12 rounded bg-gray-200 dark:bg-[#333] flex items-center justify-center text-blue-600 dark:text-[#00e5ff]">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">{course.title}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{course.tutor}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 border border-dashed border-gray-300 dark:border-[#333] rounded-xl">
                                        <p className="text-gray-500 mb-2">No active enrollments</p>
                                        <a href="/courses" className="text-blue-600 dark:text-[#00e5ff] text-sm hover:underline">Browse Courses</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="p-6 border-b border-gray-200 dark:border-[#333] flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Profile Image URL</label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 pl-10 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                        value={editForm.profileImageUrl}
                                        onChange={e => setEditForm({ ...editForm, profileImageUrl: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                    <Camera size={18} className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black font-bold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors mt-4"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
