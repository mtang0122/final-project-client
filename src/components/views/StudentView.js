/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  const defaultImage = 'https://picsum.photos/200';


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
	  <p>First Name: {student.firstname}</p>
	  <p>Last Name: {student.lastname}</p>
	  <p>Email: {student.email}</p>
	  <p>GPA: {student.gpa}</p>
	  <p>Attends:</p>
      <h3>{student.campus.name}</h3>
    </div>
  );

};

export default StudentView;