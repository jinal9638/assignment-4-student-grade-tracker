import React, { Component } from 'react';

class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: '',
      error: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    const { name, grade } = this.state;

    // Validation
    if (!name.trim()) {
      this.setState({ error: 'Student name is required.' });
      return;
    }

    const numericGrade = Number(grade);
    if (grade === '' || isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      this.setState({ error: 'Please enter a valid grade between 0 and 100.' });
      return;
    }

    // Submit to parent component
    this.props.onAddStudent({
      name: name.trim(),
      grade: numericGrade
    });

    // Reset Form
    this.setState({ name: '', grade: '', error: '' });
  };

  render() {
    const { name, grade, error } = this.state;

    return (
      <div className="card form-card">
        <h2>Add New Student</h2>
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="e.g. Rahul Sharma"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade (0 - 100)</label>
            <input
              type="number"
              id="grade"
              name="grade"
              value={grade}
              placeholder="e.g. 85"
              min="0"
              max="100"
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Student
          </button>
        </form>
      </div>
    );
  }
}

export default AddStudentForm;