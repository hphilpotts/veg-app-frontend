import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import './App.css';

import Nav from './Main/Nav';
import Auth from './User/Auth-main';
import UserProfile from './User/User-profile';
import Home from './Main/Home';
import NoMatch from './Err/No-match';
import WeekDisplay from './Week/WeekDisplay';

export default function App() {

  const navigate = useNavigate()

  const nullUser = {
    loggedIn: false,
    username: null,
    id: null
  }

  const [currentUser, setCurrentUser] = useState(nullUser)

  useEffect(() => {
    try {
      updateStateFromToken(sessionStorage.token)
    } catch {
      sessionStorage.token ? console.error('Invalid token in Session Storage') : console.warn('No token found in session storage');
      sessionStorage.clear()
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const authHandler = (route, user) => {
    Axios.post(`${route}`, user)
      .then(res => {
        saveTokenToStorage(res.data.token)
        updateStateFromToken(sessionStorage.token)
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

  const updateStateFromToken = token => {
    const nextUser = getUserFromToken(token)
    setCurrentUser({
      loggedIn: true,
      username: nextUser.username,
      id: nextUser.id
    })
    checkForCurrentWeek(nextUser)
  }

  const getUserFromToken = savedToken => {
    try {
      const decoded = jwt_decode(savedToken)
      return decoded.user
    } catch (err) {
      console.warn(err.message)
      sessionStorage.clear()
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
      console.err('...session storage has not been cleared');
    }
  }

  return (
    <div id='main'>
      <Box>
        <Nav currentUser={currentUser} logoutHandler={logoutHandler} />
      </Box>
      <Box>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='user/*' element={<Auth authHandler={authHandler} />}></Route>
          <Route path='/profile' element={<UserProfile currentUser={currentUser} />}></Route>
          <Route path='week/*' element={<WeekDisplay/>}></Route>
          <Route path='*' element={<NoMatch />}></Route>
        </Routes>

      </Box>

    </div>
  )
}