import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data);
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] font-sans selection:bg-blue-200 dark:selection:bg-[#00e5ff] selection:text-black transition-colors duration-300">
            <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-[#333]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to continue learning</p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-400 text-sm mb-2">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 pl-10 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username"
                            />
                            <User size={18} className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-400 text-sm mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-[#333] rounded-lg p-3 pl-10 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-[#00e5ff] focus:outline-none transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                            <Lock size={18} className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 dark:bg-[#00e5ff] text-white dark:text-black font-bold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-[#00b8cc] transition-colors shadow-lg dark:shadow-[0_0_15px_rgba(0,229,255,0.3)] mt-2"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-[#00e5ff] font-bold hover:underline">Create Account</Link>
                </div>
            </div>
        </div>
    );
}
