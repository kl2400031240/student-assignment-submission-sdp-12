import React from 'react';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/StatCard';

const TeacherDashboard = () => {
  const { getTeacherStats, assignments, submissions } = useApp();
  const stats = getTeacherStats();

  // Get recent submissions
  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Teacher Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of assignments and submissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Assignments"
          value={stats.totalAssignments}
          icon="📚"
          color="blue"
        />
        <StatCard
          title="Total Submissions"
          value={stats.totalSubmissions}
          icon="📝"
          color="purple"
        />
        <StatCard
          title="Pending Grading"
          value={stats.pendingGrading}
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Graded"
          value={stats.gradedSubmissions}
          icon="✅"
          color="green"
        />
      </div>

      {/* Recent Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Assignments
          </h2>
          <div className="space-y-3">
            {assignments.slice(0, 5).map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {assignment.title}
                </h3>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Due: {assignment.dueDate}</span>
                  <span>{assignment.totalMarks} marks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Submissions
          </h2>
          <div className="space-y-3">
            {recentSubmissions.map((submission) => {
              const assignment = assignments.find(
                (a) => a.id === submission.assignmentId
              );
              return (
                <div
                  key={submission.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {submission.studentName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {assignment?.title}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        submission.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Submitted: {submission.submittedAt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
