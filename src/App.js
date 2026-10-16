import React, { Component } from 'react';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [], // Array holding all student records
      filter: 'all', // Filter criterion: 'all' | 'passed' | 'failed'
      sortBy: 'none', // Sorting mode: 'none' | 'name' | 'grade-desc' | 'grade-asc'
      searchTerm: ''  // Live search input string
    };
  }

  // Lifecycle Method 1: Load initial data or localStorage on mount
  componentDidMount() {
    console.log('[App Lifecycle]: componentDidMount - Initializing app data');
    const savedData = localStorage.getItem('gradeTracker_students');

    if (savedData) {
      try {
        this.setState({ students: JSON.parse(savedData) });
      } catch (err) {
        console.error('Failed to parse localStorage data:', err);
        this.loadSampleData();
      }
    } else {
      this.loadSampleData();
    }
  }

  // Lifecycle Method 2: Persist state changes to LocalStorage
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students !== this.state.students) {
      console.log('[App Lifecycle]: componentDidUpdate - Student state modified');
      localStorage.setItem('gradeTracker_students', JSON.stringify(this.state.students));
    }
  }

  // Lifecycle Method 3: Cleanup on unmount
  componentWillUnmount() {
    console.log('[App Lifecycle]: componentWillUnmount - Cleaning up App listeners');
  }

  loadSampleData = () => {
    const initialStudents = [
      { id: '1', name: 'Aarav Sharma', grade: 88, status: 'Passed' },
      { id: '2', name: 'Priya Patel', grade: 32, status: 'Failed' },
      { id: '3', name: 'Rohan Mehta', grade: 74, status: 'Passed' },
      { id: '4', name: 'Ananya Verma', grade: 45, status: 'Failed' }
    ];
    this.setState({ students: initialStudents });
  };

  handleAddStudent = (newStudent) => {
    const studentWithStatus = {
      ...newStudent,
      id: Date.now().toString(),
      status: newStudent.grade >= 40 ? 'Passed' : 'Failed'
    };

    this.setState((prevState) => ({
      students: [studentWithStatus, ...prevState.students]
    }));
  };

  handleDeleteStudent = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.filter((s) => s.id !== id)
    }));
  };

  handleUpdateGrade = (id, newGrade) => {
    if (newGrade < 0 || newGrade > 100 || isNaN(newGrade)) return;

    this.setState((prevState) => ({
      students: prevState.students.map((student) => {
        if (student.id === id) {
          const updatedGrade = Number(newGrade);
          return {
            ...student,
            grade: updatedGrade,
            status: updatedGrade >= 40 ? 'Passed' : 'Failed'
          };
        }
        return student;
      })
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleSortChange = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getProcessedStudents = () => {
    const { students, filter, sortBy, searchTerm } = this.state;

    // Filter by Search & Status
    let result = students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (filter === 'passed') return matchesSearch && student.status === 'Passed';
      if (filter === 'failed') return matchesSearch && student.status === 'Failed';
      return matchesSearch;
    });

    // Sort Students
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'grade-desc') {
      result.sort((a, b) => b.grade - a.grade);
    } else if (sortBy === 'grade-asc') {
      result.sort((a, b) => a.grade - b.grade);
    }

    return result;
  };

  render() {
    const { filter, sortBy, searchTerm, students } = this.state;
    const processedStudents = this.getProcessedStudents();

    const totalStudents = students.length;
    const passedCount = students.filter((s) => s.status === 'Passed').length;
    const failedCount = totalStudents - passedCount;
    const avgGrade = totalStudents
      ? (students.reduce((acc, curr) => acc + curr.grade, 0) / totalStudents).toFixed(1)
      : 0;

    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Class Component Architecture & Lifecycle Demonstration</p>
        </header>

        {/* Dashboard Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-number">{totalStudents}</p>
          </div>
          <div className="stat-card stat-passed">
            <h3>Passed</h3>
            <p className="stat-number">{passedCount}</p>
          </div>
          <div className="stat-card stat-failed">
            <h3>Failed</h3>
            <p className="stat-number">{failedCount}</p>
          </div>
          <div className="stat-card">
            <h3>Average Grade</h3>
            <p className="stat-number">{avgGrade}%</p>
          </div>
        </section>

        {/* Form and Controls */}
        <div className="main-layout">
          <aside className="sidebar">
            <AddStudentForm onAddStudent={this.handleAddStudent} />
          </aside>

          <main className="content-area">
            <div className="controls-bar">
              <input
                type="text"
                placeholder="Search student name..."
                value={searchTerm}
                onChange={this.handleSearchChange}
                className="control-input"
              />

              <div className="filter-sort-group">
                <select value={filter} onChange={this.handleFilterChange} className="control-select">
                  <option value="all">Filter: All Status</option>
                  <option value="passed">Filter: Passed Only</option>
                  <option value="failed">Filter: Failed Only</option>
                </select>

                <select value={sortBy} onChange={this.handleSortChange} className="control-select">
                  <option value="none">Sort By: Default</option>
                  <option value="name">Sort By: Name</option>
                  <option value="grade-desc">Grade: High to Low</option>
                  <option value="grade-asc">Grade: Low to High</option>
                </select>
              </div>
            </div>

            <StudentList
              students={processedStudents}
              onDelete={this.handleDeleteStudent}
              onUpdateGrade={this.handleUpdateGrade}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;