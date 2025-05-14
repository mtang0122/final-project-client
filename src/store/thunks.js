/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
const axios = require('axios');

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

// Add Campus
// THUNK CREATOR:
export const addCampusThunk = (campus) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "campus" object's data to database
    let res = await axios.post(`/api/campuses`, campus);  
    // Call Action Creator to return Action object (type + payload with new campuses data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch(err) {
    console.error(err);
  }
};

// Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = campusId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete campus (based on "campusID") from database
    await axios.delete(`/api/campuses/${campusId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
  } catch(err) {
    console.error(err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get a student data (based on "id")from database
    let res = await axios.get(`/api/campuses/${id}`);  
    dispatch(ac.fetchCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

// Remove student from campus
// THUNK CREATOR:
export const removeStudentFromCampusThunk = (studentId) => async (dispatch) => {
  try {
    // Update student in backend (set campusId to null)
    const updatedStudent = await axios.put(`/api/students/${studentId}`, { campusId: null });
    
    // Dispatch action to update the student in Redux store
    dispatch({
      type: 'REMOVE_STUDENT_FROM_CAMPUS',
      payload: { studentId, campusId: null }
    });
    
    return updatedStudent.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Edit campus
// THUNK CREATOR:
export const editCampusThunk = (campusId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/campuses/${campusId}`, updatedData);
    dispatch(ac.editCampus(response.data));  // Use action creator instead of raw type
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } catch(err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, student);  
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch(err) {
    console.error(err);
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = studentId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`/api/students/${studentId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch(err) {
    console.error(err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = (studentId, updatedData) => async (dispatch) => {
  try {
    // First dispatch optimistic update
    dispatch({
      type: 'OPTIMISTIC_UPDATE_STUDENT',
      payload: { id: studentId, updates: updatedData }
    });
    
    // Then make API call
    const response = await axios.put(`/api/students/${studentId}`, updatedData);
    
    // Dispatch final update with server response
    dispatch(ac.editStudent(response.data));
    return response.data; // Important for handling in component
  } catch (err) {
    console.error(err);
    throw err; // Important for error handling in component
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = id => async dispatch => {  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);  
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data 
    dispatch(ac.fetchStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};
