# Online Assignment Submission and Grading System

A complete frontend application built with **Vite + React**, featuring role-based access for Teachers and Students, built with modern web technologies.

## 🚀 Technologies Used

- **Vite** - Fast build tool and development server
- **React 18** - UI library with functional components and hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - Global state management
- **Dark Mode** - Theme switching support

## ✨ Features

### Teacher Features

1. **Teacher Dashboard**
   - Overview of total assignments, submissions, pending grading
   - Statistics cards with visual indicators
   - Recent assignments and submissions list

2. **Upload Assignment**
   - Create new assignments with title, description, due date, and total marks
   - View all uploaded assignments
   - Form validation

3. **View Submissions**
   - Table view of all student submissions
   - Status badges (Pending/Graded)
   - Grade submission with marks and feedback
   - Modal interface for grading

### Student Features

1. **Student Dashboard**
   - Upcoming deadlines with urgency indicators
   - Submission statistics
   - Recent grades overview
   - Performance metrics

2. **Assignment List**
   - View all available assignments
   - Submit assignments with mock file upload
   - Optional comments
   - Due date tracking with color-coded urgency
   - View submission status

3. **View Grades**
   - All graded assignments
   - Marks and percentage display
   - Teacher feedback
   - Overall performance statistics
   - Grade letter calculation

## 📁 Project Structure

```
/src
  /components
    Sidebar.jsx          # Navigation sidebar with role switcher
    StatCard.jsx         # Reusable statistics card component
    StatusBadge.jsx      # Status indicator component
    Modal.jsx            # Modal dialog component
  /pages
    /teacher
      TeacherDashboard.jsx    # Teacher overview page
      UploadAssignment.jsx    # Create new assignments
      ViewSubmissions.jsx     # Review and grade submissions
    /student
      StudentDashboard.jsx    # Student overview page
      AssignmentList.jsx      # View and submit assignments
      ViewGrades.jsx          # View grades and feedback
  /context
    AppContext.jsx       # Global state management
  App.jsx               # Main app with routing
  main.jsx              # Application entry point
  index.css             # Global styles and Tailwind imports
```

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode** - Toggle between light and dark themes
- **Modern UI** - Clean, professional interface with Tailwind CSS
- **Status Badges** - Visual indicators for submission status
  - 🟡 Yellow - Pending
  - 🟢 Green - Graded
  - 🔵 Blue - Submitted
- **Interactive Components** - Cards, tables, modals, forms
- **Color-coded Urgency** - Deadline indicators with visual warnings

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**

   ```bash
   cd /Users/apple/project-r
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will hot-reload on changes

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Usage

### Role Switching

- Use the dropdown in the sidebar footer to switch between **Teacher** and **Student** roles
- The interface and available routes will update automatically

### Teacher Workflow

1. Switch to Teacher role
2. Upload assignments from the "Upload Assignment" page
3. Students submit assignments
4. View submissions in "View Submissions" page
5. Click "Grade" button to enter marks and feedback
6. Monitor statistics from the dashboard

### Student Workflow

1. Switch to Student role
2. View available assignments from "Assignments" page
3. Click "Submit Assignment" button
4. Enter mock file name and optional comment
5. Submit the assignment
6. Check grades in "My Grades" page
7. View teacher feedback and performance metrics

## 🎨 Dark Mode

Toggle dark mode using the button in the sidebar footer (☀️ / 🌙 icon). The theme preference persists during the session.

## 📊 Mock Data

The application includes pre-populated mock data:

- 3 sample assignments
- 3 sample submissions
- Mix of graded and pending submissions

This data is stored in the Context API and can be easily replaced with real API calls.

## 🔧 Customization

### Adding New Features

1. Create new components in `/src/components`
2. Add new pages in `/src/pages/teacher` or `/src/pages/student`
3. Update routing in `App.jsx`
4. Add new state management functions in `AppContext.jsx`

### Styling

- Tailwind utility classes are used throughout
- Custom component classes defined in `index.css`
- Color scheme can be modified in `tailwind.config.js`

## 🚀 Future Enhancements

- User authentication system
- Real backend API integration
- File upload functionality
- Email notifications
- Assignment categories/subjects
- Advanced analytics and charts
- Export grades to CSV/PDF
- Assignment templates
- Due date reminders
- Comments/messaging system

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Built with modern React best practices:

- Functional components with hooks
- Context API for state management
- Component composition
- Responsive design patterns
- Clean and maintainable code structure

---

**Happy Coding! 🎓**
