import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#333] sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black px-2 py-1 rounded text-sm font-extrabold">LP</span>
                    <span className="tracking-wide">Learning Platform</span>
                </Link>
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#00e5ff] transition-colors text-sm font-medium">Home</Link>
                    <Link to="/courses" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#00e5ff] transition-colors text-sm font-medium">Courses</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#00e5ff] transition-colors text-sm font-medium">Dashboard</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#00e5ff] transition-colors text-sm font-medium">Admin</Link>
                            )}
                            <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#00e5ff] transition-colors text-sm font-medium">Profile</Link>
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-[#333]">
                                <span className="text-gray-900 dark:text-white font-medium text-sm">{user.username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#00e5ff] transition-colors text-sm font-medium">Login</Link>
                            <Link to="/signup" className="text-white dark:text-black bg-blue-600 dark:bg-[#00e5ff] px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors shadow-lg dark:shadow-[0_0_10px_rgba(0,229,255,0.3)]">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
