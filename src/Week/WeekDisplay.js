import React from 'react'

import { Routes, Route, Outlet } from 'react-router-dom'
import { Box, Paper } from '@mui/material'

import WeekIndex from './WeekIndex'
import CurrentWeek from './CurrentWeek'



export default function WeekDisplay() {
  return (
    <>
      <Box className='auth-container'>
        <Paper elevation={3} className='auth-paper'>
          <Routes>
            <Route ></Route>
            <Route path='currentWeek' element={<CurrentWeek />}></Route>
            <Route path='index' element={<WeekIndex/>}></Route>
          </Routes>
          <Outlet />
        </Paper>
      </Box>
    </>
  )
}
