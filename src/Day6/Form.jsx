import axios from 'axios';

const baseURL = 'http://74.208.13.142:6051'; // API base URL
const token = 'your-token-here';  // Replace this with actual token, or get it dynamically from the user's login session

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Get all users
export const getUsers = async () => {
  try {
    const response = await api.get('/customer/list');
    return response.data;  // returns the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await api.post('/customer/add', userData);
    return response.data;  // returns the added user
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/customer/update/${userId}`, updatedData);
    return response.data;  // returns the updated user
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/customer/delete/${userId}`);
    return response.data;  // returns the status of deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
