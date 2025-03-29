import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // if you're using react-router for navigation
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [message, setMessage] = useState('');
  const history = useHistory(); // Used for navigation if needed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to register the user
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      if (res.data && res.data.message) {
        setMessage(res.data.message);
        // You can also redirect to login page after successful registration
        // history.push('/login');
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
        <input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          value={formData.firstName} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          value={formData.lastName} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
