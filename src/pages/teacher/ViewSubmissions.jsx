import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

const ViewSubmissions = () => {
  const { submissions, assignments, gradeSubmission } = useApp();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gradeData, setGradeData] = useState({
    marks: '',
    feedback: '',
  });

  const handleGradeClick = (submission) => {
    setSelectedSubmission(submission);
    setGradeData({
      marks: submission.marks || '',
      feedback: submission.feedback || '',
    });
    setIsModalOpen(true);
  };

  const handleGradeSubmit = (e) => {
    e.preventDefault();
    if (!gradeData.marks || !gradeData.feedback) {
      alert('Please enter both marks and feedback');
      return;
    }
    gradeSubmission(
      selectedSubmission.id,
      parseInt(gradeData.marks),
      gradeData.feedback
    );
    setIsModalOpen(false);
    setSelectedSubmission(null);
    setGradeData({ marks: '', feedback: '' });
  };

  const getAssignmentTitle = (assignmentId) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    return assignment?.title || 'Unknown Assignment';
  };

  const getAssignmentMaxMarks = (assignmentId) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    return assignment?.totalMarks || 100;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          View Submissions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and grade student submissions
        </p>
      </div>

      {/* Submissions Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                Student Name
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                Assignment
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                Submitted On
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                Marks
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-4 px-4 text-gray-900 dark:text-white">
                  {submission.studentName}
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                  {getAssignmentTitle(submission.assignmentId)}
                </td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                  {submission.submittedAt}
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={submission.status} />
                </td>
                <td className="py-4 px-4 text-gray-900 dark:text-white font-semibold">
                  {submission.marks !== null
                    ? `${submission.marks}/${getAssignmentMaxMarks(submission.assignmentId)}`
                    : '-'}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleGradeClick(submission)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      submission.status === 'graded'
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {submission.status === 'graded' ? 'View/Edit' : 'Grade'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grading Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Grade Submission"
      >
        {selectedSubmission && (
          <div>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Submission Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium">Student:</span> {selectedSubmission.studentName}
                </p>
                <p>
                  <span className="font-medium">Assignment:</span>{' '}
                  {getAssignmentTitle(selectedSubmission.assignmentId)}
                </p>
                <p>
                  <span className="font-medium">File:</span> {selectedSubmission.fileName}
                </p>
                <p>
                  <span className="font-medium">Comment:</span> {selectedSubmission.comment}
                </p>
                <p>
                  <span className="font-medium">Submitted:</span> {selectedSubmission.submittedAt}
                </p>
              </div>
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-6">
              <div>
                <label className="label">
                  Marks (Out of {getAssignmentMaxMarks(selectedSubmission.assignmentId)})
                </label>
                <input
                  type="number"
                  value={gradeData.marks}
                  onChange={(e) =>
                    setGradeData((prev) => ({ ...prev, marks: e.target.value }))
                  }
                  min="0"
                  max={getAssignmentMaxMarks(selectedSubmission.assignmentId)}
                  placeholder="Enter marks"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Feedback</label>
                <textarea
                  value={gradeData.feedback}
                  onChange={(e) =>
                    setGradeData((prev) => ({ ...prev, feedback: e.target.value }))
                  }
                  placeholder="Provide constructive feedback..."
                  rows="5"
                  className="input-field"
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">
                  Submit Grade
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewSubmissions;
