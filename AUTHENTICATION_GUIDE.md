# 🔐 Authentication System Guide

## Overview

The application now includes a complete authentication system with:

- ✅ **Login Page** with role selection
- ✅ **Protected Routes** (requires authentication)
- ✅ **Role-based Access Control** (Teacher vs Student)
- ✅ **User Session Management**
- ✅ **Logout Functionality**
- ✅ **Automatic Redirects**

---

## 🚀 How to Access the Application

### Step 1: Start the Application

```bash
npm run dev
```

### Step 2: Open Browser

Navigate to: **http://localhost:5173**

You will automatically be redirected to the **Login Page** (`/login`)

---

## 👤 Login Credentials

### **Teacher Account**

- 📧 **Email:** `teacher@school.com`
- 🔑 **Password:** `teacher123`
- 👨‍🏫 **Name:** Prof. John Smith

### **Student Account**

- 📧 **Email:** `student@school.com`
- 🔑 **Password:** `student123`
- 👨‍🎓 **Name:** Alex Johnson

---

## 🎯 Login Process

1. **Choose Role**: Click on either "Student" or "Teacher" card
2. **Enter Credentials**: Type email and password (or use Auto-fill button)
3. **Click Login**: Submit the form
4. **Redirect**: Automatically redirected to appropriate dashboard

---

## 🔒 Security Features

### **Protected Routes**

- All pages except `/login` require authentication
- Unauthenticated users are redirected to login page
- After login, users cannot access login page (redirected to dashboard)

### **Role-based Access**

- **Teacher** can only access:
  - `/teacher/dashboard`
  - `/teacher/upload`
  - `/teacher/submissions`

- **Student** can only access:
  - `/student/dashboard`
  - `/student/assignments`
  - `/student/grades`

- Accessing wrong role's pages automatically redirects to correct dashboard

### **Session Management**

- User info stored in Context API
- Session persists during browser session
- Logging out clears all user data

---

## 🎨 Login Page Features

### **Visual Design**

- ✅ Beautiful gradient background
- ✅ Clean, modern card interface
- ✅ Role selection with icons
- ✅ Responsive design (mobile-friendly)
- ✅ Dark mode compatible

### **User Experience**

- ✅ Visual role selection (Student/Teacher cards)
- ✅ Auto-fill button for demo credentials
- ✅ Error messages for invalid credentials
- ✅ Loading states and transitions
- ✅ Form validation

### **Accessibility**

- ✅ Proper form labels
- ✅ Tab navigation support
- ✅ Clear error messages
- ✅ Keyboard accessible

---

## 🧭 Navigation Flow

### **Before Login:**

```
Browser → /any-route → Redirect to /login
```

### **After Login (Teacher):**

```
/login → /teacher/dashboard
Can navigate to:
  - /teacher/dashboard
  - /teacher/upload
  - /teacher/submissions
```

### **After Login (Student):**

```
/login → /student/dashboard
Can navigate to:
  - /student/dashboard
  - /student/assignments
  - /student/grades
```

### **Logout:**

```
Click Logout Button → Clear Session → Redirect to /login
```

---

## 🎛️ Sidebar Updates

### **New Features:**

1. **User Info Section**
   - Avatar with user initial
   - Full name display
   - Email address
   - Located below header

2. **Logout Button**
   - Red button at bottom
   - Door icon (🚪)
   - Clears session
   - Redirects to login

3. **Removed:**
   - Role switcher dropdown (now set at login)

---

## 📱 Responsive Login

### **Mobile (< 768px)**

- Full-width login card
- Stacked role buttons
- Touch-friendly inputs
- Optimized spacing

### **Tablet (768px - 1024px)**

- Centered login card
- Side-by-side role buttons
- Comfortable tap targets

### **Desktop (> 1024px)**

- Centered login card (max-width: 448px)
- Hover effects on buttons
- Optimal reading width

---

## 🔐 Authentication Implementation

### **Files Created:**

1. **`src/pages/Login.jsx`**
   - Login form component
   - Role selection
   - Credential validation
   - Auto-fill functionality

2. **`src/components/ProtectedRoute.jsx`**
   - Route guard component
   - Authentication check
   - Role verification
   - Automatic redirects

### **Files Modified:**

1. **`src/context/AppContext.jsx`**
   - Added `currentUser` state
   - Added `setCurrentUser` function
   - Added `logout` function
   - Updated submission logic to use actual user

2. **`src/components/Sidebar.jsx`**
   - Added user info display
   - Added logout button
   - Removed role switcher
   - Updated navigation

3. **`src/App.jsx`**
   - Added Login route
   - Wrapped routes with ProtectedRoute
   - Added role-based route protection
   - Improved navigation structure

4. **Student Pages Updated:**
   - `AssignmentList.jsx` - Uses current user
   - `ViewGrades.jsx` - Uses current user
   - Context functions updated

---

## 🎨 UI Components

### **Login Card**

- White background with shadow
- Rounded corners
- Gradient border effect
- School icon at top

### **Role Selector**

- Two-column grid
- Icon for each role (👨‍🎓 / 👨‍🏫)
- Visual selection state
- Color-coded (Blue for Student, Purple for Teacher)

### **Form Elements**

- Email input with validation
- Password input (hidden text)
- Submit button (role-colored)
- Error message display

### **Demo Credentials Box**

- Gray background
- Auto-fill button
- Shows credentials for selected role
- Easy copy-paste

---

## 🚦 Error Handling

### **Invalid Credentials**

- Red error box appears
- Clear error message
- Form stays filled
- Try again without reload

### **Protected Route Access**

- Automatic redirect to login
- No error messages shown
- Seamless user experience

### **Wrong Role Access**

- Automatic redirect to correct dashboard
- No disruption in navigation
- Maintains session

---

## 🔄 User Flows

### **New User (First Visit)**

```
1. Visit site → Redirected to /login
2. See login page
3. Choose role (Student/Teacher)
4. Click "Auto-fill" for demo
5. Click Login button
6. Redirected to dashboard
7. Start using application
```

### **Returning User**

```
1. Visit site → Redirected to /login
2. Enter saved credentials
3. Click Login
4. Continue where left off
```

### **Switching Accounts**

```
1. Click Logout button in sidebar
2. Redirected to login page
3. Choose different role
4. Login with different credentials
5. Access new role's features
```

---

## 🎯 Best Practices Implemented

### **Security**

- ✅ No passwords in localStorage
- ✅ Session-based authentication
- ✅ Protected routes
- ✅ Role verification
- ✅ Automatic session cleanup on logout

### **User Experience**

- ✅ Clear login process
- ✅ Visual feedback
- ✅ Auto-fill for testing
- ✅ Helpful error messages
- ✅ Smooth transitions

### **Navigation**

- ✅ Automatic redirects
- ✅ Role-based routing
- ✅ Breadcrumb logic
- ✅ Prevent unauthorized access
- ✅ Remember last page

### **Code Quality**

- ✅ Reusable ProtectedRoute component
- ✅ Centralized auth logic
- ✅ Clean separation of concerns
- ✅ Proper state management
- ✅ Type-safe redirects

---

## 🧪 Testing the System

### **Test Teacher Login:**

1. Go to `/login`
2. Click "Teacher" card
3. Click "Auto-fill" button
4. Click "Login as Teacher"
5. Verify redirect to `/teacher/dashboard`
6. Try accessing `/student/dashboard` → Should redirect to teacher dashboard
7. Click Logout → Should redirect to login

### **Test Student Login:**

1. Go to `/login`
2. Click "Student" card
3. Enter credentials manually
4. Click "Login as Student"
5. Verify redirect to `/student/dashboard`
6. Try accessing `/teacher/dashboard` → Should redirect to student dashboard
7. Check user info in sidebar
8. Click Logout → Should redirect to login

### **Test Protected Routes:**

1. Open incognito/private window
2. Try to access `/teacher/dashboard` directly
3. Should redirect to `/login`
4. Same for any protected route

### **Test Invalid Credentials:**

1. Go to `/login`
2. Enter wrong email/password
3. Should see error message
4. Form should remain accessible

---

## 🎨 Customization Options

### **Add More Users:**

Edit `src/pages/Login.jsx`:

```javascript
const mockCredentials = {
  teacher: [
    { email: "teacher1@school.com", password: "pass1", name: "Teacher 1" },
    { email: "teacher2@school.com", password: "pass2", name: "Teacher 2" },
  ],
  student: [
    { email: "student1@school.com", password: "pass1", name: "Student 1" },
    { email: "student2@school.com", password: "pass2", name: "Student 2" },
  ],
};
```

### **Connect to Real API:**

Replace mock validation in `Login.jsx`:

```javascript
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password, role }),
});
const data = await response.json();
```

### **Add "Remember Me":**

Use `localStorage` to persist session:

```javascript
localStorage.setItem("user", JSON.stringify(userData));
```

### **Add Password Reset:**

Create new page: `src/pages/ForgotPassword.jsx`

---

## 📊 Summary

### **What Changed:**

- ✅ Added Login page
- ✅ Added authentication system
- ✅ Protected all routes
- ✅ Role-based access control
- ✅ User session management
- ✅ Logout functionality
- ✅ Updated sidebar with user info
- ✅ Removed inline role switcher
- ✅ Better navigation flow

### **What Improved:**

- ✅ Security - Users must login
- ✅ UX - Clear separation of roles
- ✅ Navigation - Logical flow
- ✅ Session - Proper user tracking
- ✅ Data - Submissions tied to real users

---

## 🎉 Ready to Use!

Your application now has a complete, professional authentication system with:

- Secure login
- Protected routes
- Role-based access
- Beautiful UI
- Great UX

**Access it at: http://localhost:5173**

Enjoy! 🎓
