import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const UploadAssignment = () => {
  const { addAssignment, assignments } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalMarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.dueDate || !formData.totalMarks) {
      alert('Please fill in all fields');
      return;
    }
    addAssignment({
      ...formData,
      totalMarks: parseInt(formData.totalMarks),
    });
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      totalMarks: '',
    });
    alert('Assignment uploaded successfully!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Assignment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new assignment for students
        </p>
      </div>

      {/* Upload Form */}
      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Assignment Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Introduction to React"
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the assignment requirements..."
              rows="4"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Total Marks</label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                placeholder="100"
                min="1"
                className="input-field"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full md:w-auto">
            📤 Upload Assignment
          </button>
        </form>
      </div>

      {/* List of Assignments */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          All Assignments ({assignments.length})
        </h2>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {assignment.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>📅 Due: {assignment.dueDate}</span>
                    <span>📝 {assignment.totalMarks} marks</span>
                    <span>🗓️ Created: {assignment.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;
