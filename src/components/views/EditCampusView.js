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

const EditCampusView = ({ campus, onSave, onCancel }) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    name: campus.name || '',
    address: campus.address || '',
    description: campus.description || '',
    imageURL: campus.imageURL || ''
  });
  
  const [errors, setErrors] = React.useState({
    name: '',
    address: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? 'Name is required' : '',
      address: !formData.address.trim() ? 'Address is required' : '',
      imageURL: formData.imageURL && !/^https?:\/\/.+\..+/.test(formData.imageURL) 
        ? 'Please enter a valid URL' : ''
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.address && !newErrors.imageURL;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        // Ensure we don't send empty strings for optional fields
        description: formData.description || null,
        imageURL: formData.imageURL || null
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Campus Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        required
        fullWidth
      />
      
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address}
        required
        fullWidth
      />
      
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
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

EditCampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditCampusView;