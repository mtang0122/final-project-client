import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '500px',
    margin: 'auto',
    padding: theme.spacing(3),
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
    fontSize: '0.8rem',
  }
}));

const EditStudentView = ({ student, onSave, onCancel }) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    firstname: student.firstname || '',
    lastname: student.lastname || '',
    email: student.email || '',
    imageURL: student.imageURL || '',
    gpa: student.gpa || '',
    campusId: student.campusId || null
  });
  
  const [errors, setErrors] = React.useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  const validateForm = () => {
    const newErrors = {
      firstname: !formData.firstname.trim() ? 'First name is required' : '',
      lastname: !formData.lastname.trim() ? 'Last name is required' : '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Valid email is required' : '',
      imageURL: formData.imageURL && !/^https?:\/\/.+\..+/.test(formData.imageURL) 
        ? 'Please enter a valid URL' : '',
      gpa: formData.gpa && (formData.gpa < 0 || formData.gpa > 4) 
        ? 'GPA must be between 0.0 and 4.0' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        gpa: formData.gpa ? parseFloat(formData.gpa) : null,
        imageURL: formData.imageURL || null
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        error={!!errors.firstname}
        helperText={errors.firstname}
        required
        fullWidth
      />
      
      <TextField
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        error={!!errors.lastname}
        helperText={errors.lastname}
        required
        fullWidth
      />
      
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
        fullWidth
      />
      
      <TextField
        label="Image URL"
        name="imageURL"
        value={formData.imageURL}
        onChange={handleChange}
        error={!!errors.imageURL}
        helperText={errors.imageURL || "(Optional)"}
        fullWidth
      />
      
      <TextField
        label="GPA"
        name="gpa"
        type="number"
        inputProps={{ min: "0", max: "4", step: "0.1" }}
        value={formData.gpa}
        onChange={handleChange}
        error={!!errors.gpa}
        helperText={errors.gpa || "(Optional)"}
        fullWidth
      />
      
      <div className={classes.buttonGroup}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

EditStudentView.propTypes = {
  student: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditStudentView;