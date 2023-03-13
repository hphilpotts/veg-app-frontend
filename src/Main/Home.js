import React from 'react'
import { Box, Paper } from '@mui/material';
import '../App.css';

export default function Home() {
  return (
    <>
      <Box className='auth-container'>
        <Paper elevation={3} className='auth-paper'>
          <h1>THIS BE THE HOME PAGE</h1>
        </Paper>
      </Box>
    </>
  )
}
