import React from 'react'

import { Box, Paper } from '@mui/material';

import './User.css'

export default function UserProfile(props) {

  const user = props.user

  return (
    <>
    <Box className='auth-container'>
      <Paper elevation={3} className='auth-paper'>
        <h1>THIS IS THE PROFILE FOR {user.toUpperCase()}</h1>
      </Paper>
    </Box>
  </>
  )
}
