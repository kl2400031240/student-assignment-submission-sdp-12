# 🎨 Visual Component Guide

## UI Components Reference

This guide shows what each component looks like and how to use them.

---

## 🧩 Core Components

### 1. StatCard Component

**Location:** `src/components/StatCard.jsx`

**Usage:**

```jsx
<StatCard title="Total Assignments" value={25} icon="📚" color="blue" />
```

**Color Options:**

- `blue` - Blue background with blue text
- `green` - Green background with green text
- `yellow` - Yellow background with yellow text
- `purple` - Purple background with purple text

**Appears on:**

- Teacher Dashboard
- Student Dashboard

---

### 2. StatusBadge Component

**Location:** `src/components/StatusBadge.jsx`

**Usage:**

```jsx
<StatusBadge status="pending" />
<StatusBadge status="graded" />
<StatusBadge status="submitted" />
```

**Status Types:**

- `pending` - 🟡 Yellow badge
- `graded` - 🟢 Green badge
- `submitted` - 🔵 Blue badge

**Appears on:**

- View Submissions table
- Student Dashboard
- Assignment List
- View Grades

---

### 3. Modal Component

**Location:** `src/components/Modal.jsx`

**Usage:**

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Grade Submission">
  {/* Modal content here */}
</Modal>
```

**Features:**

- Full-screen overlay
- Click outside to close
- X button to close
- Scrollable content
- Responsive design

**Used for:**

- Grading submissions (Teacher)

---

### 4. Sidebar Component

**Location:** `src/components/Sidebar.jsx`

**Features:**

- Fixed left sidebar (width: 256px)
- Role-based navigation links
- Role switcher dropdown
- Dark mode toggle
- Active link highlighting

**Navigation Links:**

**Teacher:**

- 📊 Dashboard
- 📤 Upload Assignment
- 📝 View Submissions

**Student:**

- 📊 Dashboard
- 📚 Assignments
- 🎓 My Grades

---

## 🎨 Custom CSS Classes

### Buttons

```css
.btn-primary
```

- Blue background
- White text
- Hover effect
- Rounded corners

```css
.btn-secondary
```

- Gray background
- Dark text
- Hover effect
- Rounded corners

### Cards

```css
.card
```

- White background (dark mode: dark gray)
- Rounded corners
- Shadow
- Border
- Padding

### Form Elements

```css
.input-field
```

- Full width
- Padding
- Border
- Rounded corners
- Focus ring (blue)
- Dark mode support

```css
.label
```

- Block display
- Medium font weight
- Gray color
- Bottom margin

---

## 📊 Page Layouts

### Teacher Dashboard

**Layout:**

```
┌─────────────────────────────────────┐
│  Title & Description                │
├─────────────────────────────────────┤
│  4 Stat Cards (Grid)                │
├─────────────────────────────────────┤
│  Recent Assignments  │  Recent Sub  │
│  (Card)              │  (Card)      │
└─────────────────────────────────────┘
```

### Upload Assignment

**Layout:**

```
┌─────────────────────────────────────┐
│  Title & Description                │
├─────────────────────────────────────┤
│  Form Card:                         │
│  - Title Input                      │
│  - Description Textarea             │
│  - Due Date & Total Marks           │
│  - Submit Button                    │
├─────────────────────────────────────┤
│  All Assignments List Card          │
└─────────────────────────────────────┘
```

### View Submissions

**Layout:**

```
┌─────────────────────────────────────┐
│  Title & Description                │
├─────────────────────────────────────┤
│  Submissions Table:                 │
│  | Name | Assignment | Date |       │
│  | Status | Marks | Action |        │
└─────────────────────────────────────┘
```

### Student Dashboard

**Layout:**

```
┌─────────────────────────────────────┐
│  Title & Description                │
├─────────────────────────────────────┤
│  4 Stat Cards (Grid)                │
├─────────────────────────────────────┤
│  Upcoming          │  Recent Grades │
│  Deadlines (Card)  │  (Card)        │
├─────────────────────────────────────┤
│  Performance Overview (Card)        │
└─────────────────────────────────────┘
```

### Assignment List

**Layout:**

```
┌─────────────────────────────────────┐
│  Title & Description                │
├─────────────────────────────────────┤
│  Assignment Card 1:                 │
│  - Title, Description, Due Date     │
│  - Submit Form or Status            │
├─────────────────────────────────────┤
│  Assignment Card 2...               │
└─────────────────────────────────────┘
```

### View Grades

**Layout:**

```
┌─────────────────────────────────────┐
│  Title & Description                │
├─────────────────────────────────────┤
│  Overall Performance Card           │
│  (Average, Total Marks)             │
├─────────────────────────────────────┤
│  Grade Card 1:                      │
│  - Assignment, Marks, Feedback      │
├─────────────────────────────────────┤
│  Grade Card 2...                    │
└─────────────────────────────────────┘
```

---

## 🌈 Color System

### Light Mode

- Background: `gray-100`
- Cards: `white`
- Text: `gray-900`
- Border: `gray-200`

### Dark Mode

- Background: `gray-900`
- Cards: `gray-800`
- Text: `white`
- Border: `gray-700`

### Accent Colors

- Primary: `blue-600`
- Success: `green-600`
- Warning: `yellow-600`
- Danger: `red-600`
- Info: `purple-600`

---

## 📱 Responsive Behavior

### Mobile (< 768px)

- Sidebar: May need adjustment (currently fixed)
- Cards: Stack vertically
- Tables: Horizontal scroll
- Forms: Full width inputs

### Tablet (768px - 1024px)

- 2-column grid for stat cards
- Cards side-by-side
- Comfortable spacing

### Desktop (> 1024px)

- 4-column grid for stat cards
- Full table display
- Optimal spacing
- Sidebar + content layout

---

## 🎯 Interactive Elements

### Hover Effects

- Buttons: Darker shade on hover
- Sidebar links: Background change
- Table rows: Light highlight
- Cards: Subtle elevation (optional)

### Focus States

- Inputs: Blue ring on focus
- Buttons: Blue ring on focus
- Links: Blue ring on focus

### Active States

- Sidebar: Blue background for active route
- Buttons: Darker shade when pressed

---

## 🔍 Accessibility Features

- Semantic HTML elements
- ARIA labels (can be enhanced)
- Keyboard navigation support
- Focus indicators
- Color contrast (WCAG compliant)
- Readable font sizes

---

## 💡 Usage Examples

### Creating a New Page

```jsx
import React from "react";
import { useApp } from "../../context/AppContext";

const NewPage = () => {
  const {
    /* context values */
  } = useApp();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Page Title
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Page description</p>
      </div>

      <div className="card">{/* Content */}</div>
    </div>
  );
};

export default NewPage;
```

### Adding a Form

```jsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label className="label">Field Label</label>
    <input type="text" className="input-field" placeholder="Enter value..." />
  </div>

  <button type="submit" className="btn-primary">
    Submit
  </button>
</form>
```

### Creating a Card List

```jsx
<div className="grid grid-cols-1 gap-6">
  {items.map((item) => (
    <div key={item.id} className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {item.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {item.description}
      </p>
    </div>
  ))}
</div>
```

---

## 🎨 Design Patterns

### Consistent Spacing

- Page padding: `p-8`
- Card padding: `p-6`
- Section margin: `mb-8`
- Element spacing: `space-y-4` or `gap-6`

### Typography Hierarchy

- Page title: `text-3xl font-bold`
- Section title: `text-2xl font-bold`
- Card title: `text-xl font-bold`
- Subtitle: `text-lg font-semibold`
- Body text: `text-base`
- Small text: `text-sm`
- Extra small: `text-xs`

### Rounded Corners

- Cards: `rounded-lg`
- Buttons: `rounded-lg`
- Inputs: `rounded-lg`
- Badges: `rounded-full`

---

This visual guide helps maintain consistency across the application!
