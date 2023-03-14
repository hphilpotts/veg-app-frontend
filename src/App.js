import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Nav from './Main/Nav';
import Auth from './User/Auth-main';
import UserProfile from './User/User-profile';
import Home from './Main/Home';
import NoMatch from './Err/No-match';
import WeekDisplay from './Week/WeekDisplay';

import Box from '@mui/material/Box';

export default function App() {

  const nullUser = {
    loggedIn: false,
    username: null,
    id: null
  }

  const [currentUser, setCurrentUser] = useState(nullUser)

  useEffect(() => {
    console.log('check for user would go here');
  }, [])

  const navigate = useNavigate()

  const authHandler = (route, user) => {
    Axios.post(`${route}`, user)
      .then(res => {

        saveTokenToStorage(res.data.token)

        const nextUser = getUserFromToken(sessionStorage.token)
        setCurrentUser({
          loggedIn: true,
          username: nextUser.username,
          id: nextUser.id
        })

        checkForCurrentWeek(nextUser)

        navigate('/')

      })
      .catch(err => {
        console.error(err)
      })
  }

  const saveTokenToStorage = token => {
    try {
      sessionStorage.setItem("token", token)
      console.log('token saved successfully')
    } catch (err) {
      console.error(err)
    }
  }

  const getUserFromToken = savedToken => {
    try {
      const decoded = jwt_decode(savedToken)
      return decoded.user
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const checkForCurrentWeek = user => {
    console.log(`checking if there is a current week for user: ${user.username}, id: ${user.id}`);
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setCurrentUser(nullUser)
    console.log('Clearing session storage...')
    sessionStorage.clear()
    if (!sessionStorage.token) {
      console.log('...session storage is clear!');
    } else {
      console.err('...SESSION STORAGE IS NOT CLEAR');
    }
  }

  return (
    <div id='main'>
      <Box>
        <Nav loggedInUser={currentUser.username} logoutHandler={logoutHandler} />
      </Box>
      <Box>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='user/*' element={<Auth authHandler={authHandler} />}></Route>
          <Route path='/profile' element={<UserProfile user={currentUser.username} />}></Route>
          <Route path='week/*' element={<WeekDisplay/>}></Route>
          <Route path='*' element={<NoMatch />}></Route>
        </Routes>

      </Box>

    </div>
  )
}