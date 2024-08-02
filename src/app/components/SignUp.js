'use client'
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Sign-up successful');
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleSignUp}>
        Sign Up
      </Button>
    </Box>
  );
}
