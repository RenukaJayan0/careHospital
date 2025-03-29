import React, { useState } from 'react';
import { register } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      // Check if the response is valid before accessing data
      if (res && res.data) {
        alert(res.data.message);
      } else {
        alert('Unexpected response format.');
      }
    } catch (error) {
      // More detailed error handling
      if (error.response) {
        alert(error.response.data.error || 'An error occurred during registration.');
      } else {
        alert('Network error or backend not reachable.');
      }
    }
  };
  
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;