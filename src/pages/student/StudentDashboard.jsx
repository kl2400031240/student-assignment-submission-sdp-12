import React from 'react';
import { useApp } from '../../context/AppContext';
import StatCard from '../../components/StatCard';

const StudentDashboard = () => {
  const { getStudentStats, assignments, submissions } = useApp();
  const stats = getStudentStats();

  // Get upcoming deadlines (assignments not submitted)
  const upcomingDeadlines = stats.upcomingDeadlines
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  // Get recent graded submissions
  const recentGrades = submissions
    .filter((sub) => sub.studentName === 'Current Student' && sub.status === 'graded')
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Student Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your academic overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Assignments"
          value={assignments.length}
          icon="📚"
          color="blue"
        />
        <StatCard
          title="Submitted"
          value={stats.submitted}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Pending Grading"
          value={stats.pending}
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Graded"
          value={stats.graded}
          icon="🎓"
          color="purple"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Deadlines
          </h2>
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines.map((assignment) => {
                const daysLeft = Math.ceil(
                  (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
                );
                const isUrgent = daysLeft <= 3;
                return (
                  <div
                    key={assignment.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      isUrgent
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Due: {assignment.dueDate}
                      </span>
                      <span
                        className={`font-semibold ${
                          isUrgent ? 'text-red-600' : 'text-blue-600'
                        }`}
                      >
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Due today!'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              All caught up! No pending assignments.
            </p>
          )}
        </div>

        {/* Recent Grades */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Grades
          </h2>
          {recentGrades.length > 0 ? (
            <div className="space-y-3">
              {recentGrades.map((submission) => {
                const assignment = assignments.find(
                  (a) => a.id === submission.assignmentId
                );
                const percentage = Math.round(
                  (submission.marks / assignment.totalMarks) * 100
                );
                return (
                  <div
                    key={submission.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {assignment?.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {submission.feedback}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {submission.marks}/{assignment?.totalMarks}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {percentage}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No graded assignments yet
            </p>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Submission Rate</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {assignments.length > 0
                ? Math.round((stats.submitted / assignments.length) * 100)
                : 0}
              %
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Score</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {recentGrades.length > 0
                ? Math.round(
                    recentGrades.reduce((sum, sub) => {
                      const assignment = assignments.find((a) => a.id === sub.assignmentId);
                      return sum + (sub.marks / assignment.totalMarks) * 100;
                    }, 0) / recentGrades.length
                  )
                : 0}
              %
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.graded}/{assignments.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
