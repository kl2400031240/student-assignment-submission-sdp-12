import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('student'); // 'teacher' or 'student'
  const [currentUser, setCurrentUser] = useState(null); // Logged in user
  const [darkMode, setDarkMode] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Introduction to React Hooks',
      description: 'Create a simple counter app using useState and useEffect hooks.',
      dueDate: '2026-03-15',
      totalMarks: 100,
      createdAt: '2026-02-10',
    },
    {
      id: 2,
      title: 'CSS Flexbox Layout',
      description: 'Design a responsive navigation bar using Flexbox.',
      dueDate: '2026-03-20',
      totalMarks: 50,
      createdAt: '2026-02-15',
    },
    {
      id: 3,
      title: 'JavaScript ES6 Features',
      description: 'Demonstrate arrow functions, destructuring, and spread operators.',
      dueDate: '2026-03-25',
      totalMarks: 75,
      createdAt: '2026-02-20',
    },
  ]);

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      assignmentId: 1,
      studentName: 'John Doe',
      submittedAt: '2026-03-14',
      status: 'graded',
      fileName: 'hooks-assignment.zip',
      comment: 'Completed all requirements',
      marks: 85,
      feedback: 'Great work! Your implementation of hooks is correct.',
    },
    {
      id: 2,
      assignmentId: 1,
      studentName: 'Jane Smith',
      submittedAt: '2026-03-15',
      status: 'pending',
      fileName: 'react-hooks.zip',
      comment: 'Please review',
      marks: null,
      feedback: null,
    },
    {
      id: 3,
      assignmentId: 2,
      studentName: 'John Doe',
      submittedAt: '2026-03-19',
      status: 'graded',
      fileName: 'flexbox-nav.zip',
      comment: 'Responsive design included',
      marks: 48,
      feedback: 'Good implementation. Minor alignment issues on mobile.',
    },
  ]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Add new assignment
  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: assignments.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAssignments([...assignments, newAssignment]);
  };

  // Submit assignment (student)
  const submitAssignment = (assignmentId, fileName, comment) => {
    const newSubmission = {
      id: submissions.length + 1,
      assignmentId,
      studentName: currentUser?.name || 'Current Student',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      fileName,
      comment,
      marks: null,
      feedback: null,
    };
    setSubmissions([...submissions, newSubmission]);
  };

  // Grade submission (teacher)
  const gradeSubmission = (submissionId, marks, feedback) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId
          ? { ...sub, status: 'graded', marks, feedback }
          : sub
      )
    );
  };

  // Get stats for teacher dashboard
  const getTeacherStats = () => {
    const totalAssignments = assignments.length;
    const totalSubmissions = submissions.length;
    const pendingGrading = submissions.filter((sub) => sub.status === 'pending').length;
    const gradedSubmissions = submissions.filter((sub) => sub.status === 'graded').length;
    return { totalAssignments, totalSubmissions, pendingGrading, gradedSubmissions };
  };

  // Get stats for student dashboard
  const getStudentStats = () => {
    const currentStudentName = currentUser?.name || 'Current Student';
    const currentStudentSubmissions = submissions.filter(
      (sub) => sub.studentName === currentStudentName
    );
    const submitted = currentStudentSubmissions.length;
    const graded = currentStudentSubmissions.filter((sub) => sub.status === 'graded').length;
    const pending = currentStudentSubmissions.filter((sub) => sub.status === 'pending').length;
    
    // Upcoming deadlines (assignments not yet submitted)
    const submittedAssignmentIds = currentStudentSubmissions.map((sub) => sub.assignmentId);
    const upcomingDeadlines = assignments.filter(
      (assignment) => !submittedAssignmentIds.includes(assignment.id)
    );

    return { submitted, graded, pending, upcomingDeadlines };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('student');
  };

  const value = {
    currentRole,
    setCurrentRole,
    currentUser,
    setCurrentUser,
    darkMode,
    setDarkMode,
    assignments,
    submissions,
    addAssignment,
    submitAssignment,
    gradeSubmission,
    getTeacherStats,
    getStudentStats,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
