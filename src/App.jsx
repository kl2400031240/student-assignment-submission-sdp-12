import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/Login';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import UploadAssignment from './pages/teacher/UploadAssignment';
import ViewSubmissions from './pages/teacher/ViewSubmissions';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AssignmentList from './pages/student/AssignmentList';
import ViewGrades from './pages/student/ViewGrades';

const AppContent = () => {
  const { currentRole, currentUser } = useApp();

  return (
    <Routes>
      {/* Public Route - Login */}
      <Route 
        path="/login" 
        element={
          currentUser ? (
            <Navigate 
              to={currentRole === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'} 
              replace 
            />
          ) : (
            <Login />
          )
        } 
      />

      {/* Protected Routes with Sidebar */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
              <Sidebar />
              <main className="flex-1 ml-64 p-8">
                <Routes>
                  {/* Default redirect based on role */}
                  <Route
                    path="/"
                    element={
                      <Navigate
                        to={
                          currentRole === 'teacher'
                            ? '/teacher/dashboard'
                            : '/student/dashboard'
                        }
                        replace
                      />
                    }
                  />

                  {/* Teacher Routes */}
                  <Route 
                    path="/teacher/dashboard" 
                    element={
                      <ProtectedRoute allowedRole="teacher">
                        <TeacherDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/teacher/upload" 
                    element={
                      <ProtectedRoute allowedRole="teacher">
                        <UploadAssignment />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/teacher/submissions" 
                    element={
                      <ProtectedRoute allowedRole="teacher">
                        <ViewSubmissions />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Student Routes */}
                  <Route 
                    path="/student/dashboard" 
                    element={
                      <ProtectedRoute allowedRole="student">
                        <StudentDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/student/assignments" 
                    element={
                      <ProtectedRoute allowedRole="student">
                        <AssignmentList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/student/grades" 
                    element={
                      <ProtectedRoute allowedRole="student">
                        <ViewGrades />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Catch all - redirect to appropriate dashboard */}
                  <Route
                    path="*"
                    element={
                      <Navigate
                        to={
                          currentRole === 'teacher'
                            ? '/teacher/dashboard'
                            : '/student/dashboard'
                        }
                        replace
                      />
                    }
                  />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
