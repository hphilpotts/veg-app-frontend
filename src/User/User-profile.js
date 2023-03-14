import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { Box, Paper, Button } from '@mui/material';
import './User.css'

export default function UserProfile(props) {

  const navigate = useNavigate()

  const currentUser = props.currentUser

  useEffect(() => {
    if (!currentUser.loggedIn) {
      console.log('No user profile page found, redirecting to sign in')
      navigate('/user/signin')
    }
  })

  return (
    <>
      <Box className='auth-container'>
        <Paper elevation={3} className='auth-paper'>
              <h1>THIS IS THE PROFILE FOR {currentUser.username}</h1>
        </Paper>
      </Box>
    </>
  )
}
