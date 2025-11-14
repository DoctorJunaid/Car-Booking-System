import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircleIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { login } from '../utils/auth';
import { useToast } from '../components/Toast';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            const result = login(formData.email, formData.password);
            
            if (result.success) {
                toast.success('Login successful! Redirecting...');
                setTimeout(() => {
                    if (result.user.role === 'seller') {
                        navigate('/seller/dashboard');
                    } else {
                        navigate('/');
                    }
                    window.location.reload();
                }, 1000);
            } else {
                setError(result.message);
                toast.error(result.message);
                setIsLoading(false);
            }
        }, 500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8"
            >
                <div className="text-center">
                    <UserCircleIcon className="mx-auto h-12 w-12 text-purple-700" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-purple-700 hover:text-purple-600 transition-colors"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Demo Credentials Info */}
                    <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-sm font-medium text-purple-700 mb-2">Demo Credentials:</p>
                        <div className="text-xs text-purple-600 space-y-1">
                            <p><strong>Seller:</strong> ahmed@example.com / password123</p>
                            <p><strong>Buyer:</strong> sara@example.com / password123</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                        >
                            <XCircleIcon className="h-5 w-5 text-red-600" />
                            <p className="text-sm text-red-600">{error}</p>
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                    placeholder="Enter your password"
                                />
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-purple-700 hover:text-purple-600 transition-colors">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
