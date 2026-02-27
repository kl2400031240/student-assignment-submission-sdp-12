import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

const AssignmentList = () => {
  const { assignments, submissions, submitAssignment, currentUser } = useApp();
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [fileName, setFileName] = useState('');
  const [comment, setComment] = useState('');

  const getSubmissionStatus = (assignmentId) => {
    return submissions.find(
      (sub) =>
        sub.assignmentId === assignmentId &&
        sub.studentName === (currentUser?.name || 'Current Student')
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      alert('Please provide a file name');
      return;
    }
    submitAssignment(selectedAssignment.id, fileName, comment);
    setSelectedAssignment(null);
    setFileName('');
    setComment('');
    alert('Assignment submitted successfully!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Assignments
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and submit your assignments
        </p>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 gap-6">
        {assignments.map((assignment) => {
          const submission = getSubmissionStatus(assignment.id);
          const isSubmitted = !!submission;
          const daysLeft = Math.ceil(
            (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
          );
          const isOverdue = daysLeft < 0;

          return (
            <div key={assignment.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {assignment.title}
                  </h2>
                  {isSubmitted && (
                    <StatusBadge status={submission.status} />
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Marks
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {assignment.totalMarks}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {assignment.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">📅 Due Date:</span>
                  <span
                    className={`font-semibold ${
                      isOverdue
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {assignment.dueDate}
                  </span>
                  {!isSubmitted && (
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                        isOverdue
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          : daysLeft <= 3
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {isOverdue
                        ? 'Overdue'
                        : daysLeft === 0
                        ? 'Due today'
                        : `${daysLeft} days left`}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400">🗓️ Posted:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {assignment.createdAt}
                  </span>
                </div>
              </div>

              {/* Submission Form or Info */}
              {isSubmitted ? (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Your Submission
                    </h3>
                    {submission.status === 'graded' && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                          {submission.marks}/{assignment.totalMarks}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <span className="font-medium">File:</span> {submission.fileName}
                    </p>
                    <p>
                      <span className="font-medium">Submitted:</span> {submission.submittedAt}
                    </p>
                    {submission.comment && (
                      <p>
                        <span className="font-medium">Your Comment:</span> {submission.comment}
                      </p>
                    )}
                    {submission.feedback && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                        <p className="font-medium text-blue-900 dark:text-blue-300">
                          Teacher's Feedback:
                        </p>
                        <p className="mt-1 text-blue-800 dark:text-blue-400">
                          {submission.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : selectedAssignment?.id === assignment.id ? (
                <form onSubmit={handleSubmit} className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Submit Assignment
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">File Name (Mock Upload)</label>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="e.g., assignment-solution.zip"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Comment (Optional)</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Any comments for your teacher..."
                        rows="3"
                        className="input-field"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="btn-primary flex-1">
                        ✅ Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAssignment(null)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="btn-primary w-full"
                  disabled={isOverdue}
                >
                  📤 Submit Assignment
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignmentList;
