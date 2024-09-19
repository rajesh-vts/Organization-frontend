import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });

      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, role }));
      toast.success('Logged in successfully!');
      // console.log('Navigating to: ', `/dashboard/${role}`);
      navigate(`/dashboard/${role}`);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'An error occurred.');
        toast.error(err.response.data.error || 'An error occurred.'); 
      } else {
        setError('An error occurred.');
        toast.error('An error occurred.'); 
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Signup Here!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
