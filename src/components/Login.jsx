import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }

    if (credentials.username === 'project' && credentials.password === '123') {
      console.log('Login successful');
      setError('');
      setCredentials({ username: '', password: '' });
      navigate('/todolist');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h4" style={{ marginBottom: '16px' }}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <InputLabel htmlFor="username">Phone, email, or username</InputLabel>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            error={error && !credentials.username}
            helperText={error && !credentials.username ? error : ' '}
            style={{ marginBottom: '12px' }}
            inputProps={{ style: { padding: '10px' } }}
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            error={error && !credentials.password}
            helperText={error && !credentials.password ? error : ' '}
            style={{ marginBottom: '12px' }}
            inputProps={{ style: { padding: '10px' } }}
          />
          <Typography variant="body2" color="error" style={{ marginTop: '8px', marginBottom: '16px' }}>
            {error}
          </Typography>
          <Button type="submit" variant="contained" fullWidth color="primary" style={{ marginTop: '8px' }}>
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
