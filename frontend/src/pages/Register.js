import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // Add role field
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use navigate instead of history

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      if (res.data && res.data.message) {
        setMessage(res.data.message);
        // After successful registration, you can redirect to login page
        navigate('/login');
      }
    } catch (error) {
      setMessage('Registration failed, please try again.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {message && <p>{message}</p>} {/* Display any message */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }} // Ensure each input is on a new line
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
        </div>
        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          >
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
