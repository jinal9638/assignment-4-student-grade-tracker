import React, { Component } from 'react';

class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,// Toggles inline edit mode
      editGrade: props.student.grade // Local buffer for edited grade input
    };
  }

  componentDidMount() {
    console.log(`[StudentItem Mounted]: ${this.props.student.name}`);
  }

  componentWillUnmount() {
    console.log(`[StudentItem Unmounted]: ${this.props.student.name}`);
  }

  toggleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      editGrade: this.props.student.grade
    }));
  };

  handleGradeChange = (e) => {
    this.setState({ editGrade: e.target.value });
  };

  handleSaveGrade = () => {
    const { editGrade } = this.state;
    const { student, onUpdateGrade } = this.props;
    const numericGrade = Number(editGrade);

    if (editGrade !== '' && !isNaN(numericGrade) && numericGrade >= 0 && numericGrade <= 100) {
      onUpdateGrade(student.id, numericGrade);
      this.setState({ isEditing: false });
    } else {
      alert('Please enter a valid grade between 0 and 100.');
    }
  };

  render() {
    const { student, onDelete } = this.props;
    const { isEditing, editGrade } = this.state;
    const isPassed = student.status === 'Passed';

    return (
      <div className={`card student-card ${isPassed ? 'status-passed' : 'status-failed'}`}>
        <div className="student-info">
          <h3>{student.name}</h3>
          <span className={`badge ${isPassed ? 'badge-passed' : 'badge-failed'}`}>
            {student.status}
          </span>
        </div>

        <div className="grade-section">
          {isEditing ? (
            <div className="edit-grade-group">
              <input
                type="number"
                value={editGrade}
                onChange={this.handleGradeChange}
                min="0"
                max="100"
                className="edit-input"
              />
              <button onClick={this.handleSaveGrade} className="btn btn-save">
                Save
              </button>
              <button onClick={this.toggleEdit} className="btn btn-cancel">
                Cancel
              </button>
            </div>
          ) : (
            <div className="display-grade-group">
              <span className="grade-value">{student.grade}%</span>
              <button onClick={this.toggleEdit} className="btn btn-secondary">
                Edit Grade
              </button>
            </div>
          )}
        </div>

        <button onClick={() => onDelete(student.id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    );
  }
}

export default StudentItem;