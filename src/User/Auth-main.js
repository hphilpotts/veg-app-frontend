import React from 'react';
import { Box, Paper } from '@mui/material';

import SignUp from './User-signup';
import SignIn from './User-signin';

import { Route, Routes, Outlet } from 'react-router-dom';

import './User.css'

export default function Auth(props) {

  const authHandler = props.authHandler

  return (
    <>
      <Box className='auth-container'>
        <Paper elevation={3} className='auth-paper'>
          <Routes>
            <Route path='signin' element={<SignIn authHandler={authHandler} />}></Route>
            <Route path='signup' element={<SignUp authHandler={authHandler} />}></Route>
          </Routes>
          <Outlet />
        </Paper>
      </Box>
    </>
  )
}