import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate slight delay for UX
        await new Promise(resolve => setTimeout(resolve, 300));

        const success = login(password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid password. Please try again.');
            setPassword('');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6467f2] via-[#4f52c9] to-[#3a3d9e] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                        <span className="material-symbols-outlined text-white text-3xl">link</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">LinkManager</h1>
                    <p className="text-white/70 mt-2">Admin Dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-[#1e2030] rounded-2xl shadow-2xl p-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                        Welcome Back
                    </h2>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#25283d] pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary"
                                    placeholder="Enter your password"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[20px]">login</span>
                                    Login
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-white/50 text-sm mt-6">
                    © 2024 LinkManager. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
