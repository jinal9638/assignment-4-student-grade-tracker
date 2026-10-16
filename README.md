# Student Grade Tracker – React Class Components & Lifecycle

A fully responsive, feature-rich web application designed to track and manage student grades. Built strictly using **React Class Components**, `this.state`, and core **React Lifecycle Methods** (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`).

---

##  Project Overview

The **Student Grade Tracker** simplifies academic record management by allowing users to add, edit, filter, sort, and track student performance in real time. Passing status is automatically calculated based on scores, and all student data is saved locally to maintain persistence across page refreshes.

### Key Features
* **Class Component Architecture**: Structured completely with class-based syntax and `this.state` management.
* **Lifecycle Method Integration**:
  * `componentDidMount()`: Loads sample data or retrieves saved records from `localStorage`.
  * `componentDidUpdate()`: Syncs updated state seamlessly to `localStorage`.
  * `componentWillUnmount()`: Logs item component unmounting for lifecycle tracking.
* **Controlled Forms & Validation**: Real-time validation for student names and numeric grades (0–100).
* **Dynamic Search, Filter & Sorting**: Search by student name, filter by status (*Passed/Failed*), and sort alphabetically or by numerical grade.
* **Inline Grade Editing**: Dynamically edit student grades directly from individual card components.
* **Responsive Design**: Designed with CSS Grid and Flexbox for Desktop, Tablet, and Mobile devices.

---

## Tech Stack

* **Frontend Framework**: React.js (Class Components)
* **Styling**: Pure CSS3 (CSS Variables, Flexbox, CSS Grid, Responsive Media Queries)
* **Build Tool**: Vite / Create React App
* **Storage**: Browser `localStorage`

---

## 📁 Project Folder Structure

```text
Student_Grade_Tracker_Jinal_Khernar/
├── screenshots/
│   ├── desktop-view.png
│   ├── tablet-view.png
│   └── mobile-view.png
├── public/
├── src/
│   ├── components/
│   │   ├── AddStudentForm.jsx
│   │   ├── StudentList.jsx
│   │   └── StudentItem.jsx
│   ├── App.jsx
│   ├── App.css
│   |── index.js
|   |── index.css
├── package.json
├── package-lock.json
└── README.md

## Deployment Link

This project deployment link is : 
[https://assignment-4-student-grade-tracker.vercel.app/]