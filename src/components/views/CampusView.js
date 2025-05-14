/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EditCampusView from './EditCampusView';
import Button from '@material-ui/core/Button';

// Take in props data to construct the component
const CampusView = ({ campus, deleteStudent, editCampus, fetchCampus }) => {
  const [isEditing, setIsEditing] = useState(false);
    
  const defaultImage = 'https://picsum.photos/200';
  
  const hasStudents = campus.students && campus.students.length > 0;
  
  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to remove this student from the campus?')) {
      deleteStudent(studentId)
        .catch(err => {
          console.error('Failed to remove student:', err);
        });
    }
  };
  
  const handleSave = async (updatedData) => {
    try {
      await editCampus(campus.id, updatedData);
	  const updatedCampus = {
        ...campus,
        ...updatedData
      };
      setIsEditing(false);
	  await fetchCampus(campus.id);
    } catch (err) {
      console.error('Failed to update campus:', err);
    }
  };

  if (isEditing) {
    return (
      <div>
        <EditCampusView 
          campus={campus}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  
  // Render a single Campus view with list of its students
  return (
    <div>
		<img 
          src={campus.imageURL || defaultImage} 
          alt={`${campus.name} campus`}
          style={{
            maxWidth: '100%',
            maxHeight: '300px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      <h1>{campus.name}</h1>
	  <Button 
          variant="contained" 
          color="primary"
          onClick={() => setIsEditing(true)}
        >
        Edit Campus
     </Button>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
	  
	  <h2>Students:</h2>
	  {hasStudents ? (
        campus.students.map(student => {
          const name = `${student.firstname} ${student.lastname}`;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h3>{name}</h3>
              </Link>
			  <button 
                onClick={() => handleDeleteStudent(student.id)}
                style={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                }}
              >
                Remove from Campus
              </button> 
            </div>
          );
        })
      ) : (
        <p>No students currently enrolled at this campus.</p>
      )}
      
	  <br/>
        <Link to={`/newstudent`}>
          <button>Enroll New Student</button>
        </Link>
    </div>
  );
};

CampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default CampusView;