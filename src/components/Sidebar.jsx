import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { currentRole, currentUser, darkMode, setDarkMode, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const teacherLinks = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/teacher/upload', label: 'Upload Assignment', icon: '📤' },
    { path: '/teacher/submissions', label: 'View Submissions', icon: '📝' },
  ];

  const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/assignments', label: 'Assignments', icon: '📚' },
    { path: '/student/grades', label: 'My Grades', icon: '🎓' },
  ];

  const links = currentRole === 'teacher' ? teacherLinks : studentLinks;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Assignment System</h1>
        <p className="text-sm text-gray-400 mt-1">
          {currentRole === 'teacher' ? 'Teacher Portal' : 'Student Portal'}
        </p>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Controls */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <span className="text-sm">Dark Mode</span>
          <span className="text-lg">{darkMode ? '🌙' : '☀️'}</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
