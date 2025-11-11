import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { UserForm } from './UserForm';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));  // Remove deleted user from state
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFormSubmit = async (userId, values) => {
    try {
      if (userId) {
        // Update user
        await updateUser(userId, values);
      } else {
        // Add new user
        await addUser(values);
      }
      setEditingUser(null); // Close form after submit
      const fetchedUsers = await getUsers();  // Refetch user list
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <UserForm user={editingUser} onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
};
