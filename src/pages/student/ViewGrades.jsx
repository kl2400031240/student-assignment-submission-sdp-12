import React from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

const ViewGrades = () => {
  const { submissions, assignments, currentUser } = useApp();

  // Get current student's submissions
  const mySubmissions = submissions.filter(
    (sub) => sub.studentName === (currentUser?.name || 'Current Student')
  );

  const getAssignment = (assignmentId) => {
    return assignments.find((a) => a.id === assignmentId);
  };

  const calculatePercentage = (marks, totalMarks) => {
    return Math.round((marks / totalMarks) * 100);
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Calculate overall statistics
  const gradedSubmissions = mySubmissions.filter((sub) => sub.status === 'graded');
  const totalMarksEarned = gradedSubmissions.reduce((sum, sub) => sum + (sub.marks || 0), 0);
  const totalMarksPossible = gradedSubmissions.reduce((sum, sub) => {
    const assignment = getAssignment(sub.assignmentId);
    return sum + (assignment?.totalMarks || 0);
  }, 0);
  const overallPercentage = totalMarksPossible > 0
    ? Math.round((totalMarksEarned / totalMarksPossible) * 100)
    : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Grades
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your grades and feedback
        </p>
      </div>

      {/* Overall Statistics */}
      {gradedSubmissions.length > 0 && (
        <div className="card mb-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Overall Performance
              </h2>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>Graded Assignments: {gradedSubmissions.length}</p>
                <p>Total Marks: {totalMarksEarned} / {totalMarksPossible}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                {overallPercentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Average Score
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grades List */}
      <div className="space-y-4">
        {mySubmissions.length > 0 ? (
          mySubmissions.map((submission) => {
            const assignment = getAssignment(submission.assignmentId);
            if (!assignment) return null;

            const percentage = submission.marks
              ? calculatePercentage(submission.marks, assignment.totalMarks)
              : 0;

            return (
              <div key={submission.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {assignment.title}
                    </h3>
                    <StatusBadge status={submission.status} />
                  </div>
                  {submission.status === 'graded' && (
                    <div className="text-right ml-4">
                      <div className={`text-4xl font-bold ${getGradeColor(percentage)}`}>
                        {submission.marks}/{assignment.totalMarks}
                      </div>
                      <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                        {percentage}%
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {submission.submittedAt}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Due Date:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {assignment.dueDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">File:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {submission.fileName}
                    </span>
                  </div>
                  {submission.status === 'graded' && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Grade:</span>
                      <span className={`ml-2 font-bold ${getGradeColor(percentage)}`}>
                        {percentage >= 90
                          ? 'A+'
                          : percentage >= 85
                          ? 'A'
                          : percentage >= 80
                          ? 'A-'
                          : percentage >= 75
                          ? 'B+'
                          : percentage >= 70
                          ? 'B'
                          : percentage >= 65
                          ? 'B-'
                          : percentage >= 60
                          ? 'C+'
                          : percentage >= 55
                          ? 'C'
                          : percentage >= 50
                          ? 'C-'
                          : 'F'}
                      </span>
                    </div>
                  )}
                </div>

                {submission.comment && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Your Comment:</span> {submission.comment}
                    </p>
                  </div>
                )}

                {submission.status === 'graded' && submission.feedback ? (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      📝 Teacher's Feedback
                    </h4>
                    <p className="text-blue-800 dark:text-blue-400">{submission.feedback}</p>
                  </div>
                ) : submission.status === 'pending' ? (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-yellow-800 dark:text-yellow-400 font-medium">
                      ⏳ Awaiting grading from teacher
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Submissions Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Submit your assignments to see grades here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewGrades;
