import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentRole, setCurrentUser } = useApp();
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Mock credentials for demo
  const mockCredentials = {
    teacher: {
      email: 'teacher@school.com',
      password: 'teacher123',
      name: 'Prof. John Smith',
    },
    student: {
      email: 'student@school.com',
      password: 'student123',
      name: 'Alex Johnson',
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const credentials = mockCredentials[selectedRole];

    if (
      formData.email === credentials.email &&
      formData.password === credentials.password
    ) {
      // Successful login
      setCurrentRole(selectedRole);
      setCurrentUser({
        name: credentials.name,
        email: credentials.email,
        role: selectedRole,
      });
      
      // Navigate to appropriate dashboard
      if (selectedRole === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const autofillCredentials = () => {
    const credentials = mockCredentials[selectedRole];
    setFormData({
      email: credentials.email,
      password: credentials.password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <span className="text-5xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Assignment Grading System
          </p>
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Login as:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('student');
                setFormData({ email: '', password: '' });
                setError('');
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'student'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">👨‍🎓</div>
              <div className="font-semibold">Student</div>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('teacher');
                setFormData({ email: '', password: '' });
                setError('');
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedRole === 'teacher'
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-300'
              }`}
            >
              <div className="text-3xl mb-2">👨‍🏫</div>
              <div className="font-semibold">Teacher</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="input-field"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button type="submit" className="btn-primary w-full py-3 text-lg">
            Login as {selectedRole === 'teacher' ? 'Teacher' : 'Student'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Demo Credentials:
            </p>
            <button
              onClick={autofillCredentials}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Auto-fill
            </button>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {selectedRole === 'teacher' ? (
              <>
                <p>📧 Email: teacher@school.com</p>
                <p>🔑 Password: teacher123</p>
              </>
            ) : (
              <>
                <p>📧 Email: student@school.com</p>
                <p>🔑 Password: student123</p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2026 Assignment Grading System</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
