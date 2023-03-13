import React from 'react'

import { Routes, Route, Outlet } from 'react-router-dom'
import { Box, Paper  } from '@mui/material'

import CurrentWeek from './CurrentWeek'



export default function WeekDisplay() {
	return (
		<>
			<Box className='auth-container'>
				<Paper elevation={3} className='auth-paper'>
					<Routes>
						<Route ></Route>
						<Route path='currentWeek' element={<CurrentWeek></CurrentWeek>}></Route>
					</Routes>
					<Outlet />
				</Paper>
			</Box>
		</>
	)
}
