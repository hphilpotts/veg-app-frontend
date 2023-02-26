import React from 'react';
import { Box, Paper } from '@mui/material';

import SignUp from './User-signup';

import './User.css'

export default function Auth() {
  return (
    <>
      <Box className='auth-container'>
        <Paper elevation={3} className='auth-paper'>
          <SignUp/>
        </Paper>
      </Box>
    </>
  )
}