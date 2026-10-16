import React, { Component } from 'react';
import StudentItem from './StudentItem';

class StudentList extends Component {
  render() {
    const { students, onDelete, onUpdateGrade } = this.props;

    if (students.length === 0) {
      return (
        <div className="card empty-state">
          <p>No student records found matching your selection.</p>
        </div>
      );
    }

    return (
      <div className="student-list-container">
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onDelete={onDelete}
            onUpdateGrade={onUpdateGrade}
          />
        ))}
      </div>
    );
  }
}

export default StudentList;