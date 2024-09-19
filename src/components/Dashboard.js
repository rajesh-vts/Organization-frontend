import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({ email: '', role: '' });
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const usersResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, config);
        console.log('Users:', usersResponse.data);
        setUsers(usersResponse.data);

        if (user.role === 'admin') {
          const organizationsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/organizations`, config);
          console.log('Organizations:', organizationsResponse.data);
          setOrganizations(organizationsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user.role) {
      fetchData();
    }
  }, [user.role]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {user.email}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        {user.role === 'admin' && (
          <div className="menu">
            <button onClick={() => handleViewChange('organizations')}>Organizations</button>
            <button onClick={() => handleViewChange('users')}>Users</button>
          </div>
        )}

        {user.role === 'admin' && view === 'organizations' && (
          <>
            <h3>Organizations View</h3>
            <DataTable title="Organizations" data={organizations} />
          </>
        )}
        
        {(view === 'users' || user.role === 'user') && (
          <>
            <h3>Users View</h3>
            <DataTable title="Users" data={users} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
