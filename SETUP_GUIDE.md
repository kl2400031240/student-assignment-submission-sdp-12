# 🚀 Quick Start Guide

## Your Application is Ready!

The **Online Assignment Submission and Grading System** has been successfully created and is running.

### 🌐 Access the Application

Open your browser and navigate to: **http://localhost:5173**

---

## 📋 Project Overview

### Built With:

- ✅ **Vite** - Lightning-fast build tool
- ✅ **React 18** - Modern UI library
- ✅ **React Router DOM** - Client-side routing
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Context API** - State management
- ✅ **Dark Mode** - Theme switching

---

## 🎭 How to Use

### 1. Switch Between Roles

- Look at the sidebar (left side of the screen)
- At the bottom, you'll find a **"Switch Role"** dropdown
- Choose between **Student** or **Teacher**

### 2. Teacher Mode Features

#### Dashboard (`/teacher/dashboard`)

- View statistics: Total assignments, submissions, pending grading
- See recent assignments and submissions

#### Upload Assignment (`/teacher/upload`)

- Create new assignments
- Fill in: Title, Description, Due Date, Total Marks
- View all uploaded assignments below the form

#### View Submissions (`/teacher/submissions`)

- See all student submissions in a table
- Click **"Grade"** button to open grading modal
- Enter marks and feedback
- Submit to update student's grade

### 3. Student Mode Features

#### Dashboard (`/student/dashboard`)

- View upcoming deadlines
- See your submission statistics
- Check recent grades
- View performance overview

#### Assignments (`/student/assignments`)

- Browse all available assignments
- Click **"Submit Assignment"** button
- Enter a mock file name (e.g., "homework.zip")
- Add optional comment
- Submit to mark as submitted

#### My Grades (`/student/grades`)

- View all your submissions
- See grades and percentages
- Read teacher feedback
- Check overall performance stats

---

## 🎨 Features Included

### UI Components

- ✅ Responsive sidebar navigation
- ✅ Statistics cards with icons
- ✅ Status badges (Pending/Graded)
- ✅ Modal dialogs for grading
- ✅ Tables for submissions
- ✅ Forms for data entry
- ✅ Dark mode toggle (☀️/🌙)

### Functionality

- ✅ Role-based routing
- ✅ Dynamic navigation based on role
- ✅ Mock data pre-loaded
- ✅ Add new assignments
- ✅ Submit assignments
- ✅ Grade submissions
- ✅ View statistics
- ✅ Responsive design

---

## 🎯 Sample Data Included

### Pre-loaded Assignments:

1. Introduction to React Hooks
2. CSS Flexbox Layout
3. JavaScript ES6 Features

### Pre-loaded Submissions:

- John Doe's submissions (2 items)
- Jane Smith's submission (1 item)
- Mix of graded and pending status

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Customization Tips

### Change Colors

Edit `tailwind.config.js` to modify the color scheme

### Add New Pages

1. Create new component in `/src/pages/teacher` or `/src/pages/student`
2. Add route in `/src/App.jsx`
3. Add navigation link in `/src/components/Sidebar.jsx`

### Modify Mock Data

Edit `/src/context/AppContext.jsx` to change initial data

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive!

---

## 🌙 Dark Mode

Toggle dark mode using the button at the bottom of the sidebar.
The theme uses Tailwind's `dark:` variants throughout.

---

## ✅ Testing Checklist

Try these actions to test the system:

### As Teacher:

- [ ] Create a new assignment
- [ ] View submissions table
- [ ] Grade a pending submission
- [ ] Edit an existing grade
- [ ] Check dashboard statistics

### As Student:

- [ ] View available assignments
- [ ] Submit an assignment
- [ ] Check submission status
- [ ] View grades page
- [ ] Read teacher feedback

---

## 🚀 Next Steps

To integrate with a real backend:

1. Replace mock data with API calls
2. Add authentication (JWT/OAuth)
3. Implement real file uploads
4. Add database integration
5. Deploy to hosting platform

---

## 📞 Need Help?

Check the main `README.md` for detailed documentation.

---

**Enjoy your Assignment Grading System! 🎓**
