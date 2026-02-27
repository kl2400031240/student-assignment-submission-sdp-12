import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
