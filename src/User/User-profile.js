import React from 'react'

import { Box, Paper } from '@mui/material';

import './User.css'

export default function UserProfile(props) {

  const user = props.user

  return (
    <>
    <Box className='auth-container'>
      <Paper elevation={3} className='auth-paper'>
        {user ? (
          <h1>THIS IS THE PROFILE FOR {user.toUpperCase()}</h1>
        ) : (
          <h1>NO USER LOGGED IN, YOU SHOULDN'T BE HERE</h1>
        )}
      </Paper>
    </Box>
  </>
  )
}
