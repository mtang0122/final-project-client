/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditStudentView from './EditStudentView';

const StudentView = ({ student, deleteStudent, editStudent, fetchStudent }) => {
  const [isEditing, setIsEditing] = useState(false);

  const defaultImage = 'https://picsum.photos/200';
  
  const handleSave = async (updatedData) => {
    try {
      await editStudent(student.id, updatedData);
	  const updatedStudent = {
        ...student,
        ...updatedData
      };
      setIsEditing(false);
	  await fetchStudent(student.id);
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  if (isEditing) {
    return (
      <div>
        <EditStudentView 
          student={student}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  // Render a single Student view 
  return (
    <div>
	  <img 
          src={student.imageURL || defaultImage} 
          alt={`${student.name} student`}
          style={{
            maxWidth: '100%',
            maxHeight: '300px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      <h1>{student.firstname + " " + student.lastname}</h1>
	  <Button 
          variant="contained" 
          color="primary"
          onClick={() => setIsEditing(true)}
        >
          Edit Student
      </Button>
	  <p>First Name: {student.firstname}</p>
	  <p>Last Name: {student.lastname}</p>
	  <p>Email: {student.email}</p>
	  <p>GPA: {student.gpa}</p>
	  <p>Attends:</p>
      {student.campus ? (
        <Link to={`/campus/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
        </Link>
      ) : (
        <h3>Not enrolled in any campus</h3>
      )}
    </div>
  );

};

StudentView.propTypes = {
  student: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
};

export default StudentView;