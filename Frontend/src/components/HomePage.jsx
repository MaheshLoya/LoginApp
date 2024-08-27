import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ userId: '', userName: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.userId !== id));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${currentUser.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      });

      if (response.ok) {
        setUsers(users.map((user) => (user.userId === currentUser.userId ? currentUser : user)));
        setIsEditing(false);
        setCurrentUser({ userId: '', userName: '', password: '' });
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <header className="mb-5">
        <h1>Welcome to the Home Page</h1>
      </header>
      <div>
        <p>This is the main content of the home page!</p>
      </div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              name="userId"
              value={currentUser.userId}
              onChange={handleEditChange}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="userName"
              value={currentUser.userName}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={currentUser.password}
              onChange={handleEditChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>HashedPassword</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.userName}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomePage;
