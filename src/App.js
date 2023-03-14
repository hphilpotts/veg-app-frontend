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

  const [loggedInUser, setLoggedInUser] = useState()
  const [loggedInUserId, setLoggedInUserId] = useState()

  useEffect(() => {
    getLoggedInUser(sessionStorage.token)
  }, [])

  const navigate = useNavigate()

  const authHandler = (route, user) => {
    Axios.post(`${route}`, user)
      .then(res => {

        checkForTokenAndSave(res.data.token)

        if (res.data.token) {
          const user = getLoggedInUser(sessionStorage.token)
          setLoggedInUser(user.username)
          setLoggedInUserId(user.id)
          checkForCurrentWeek(user)
          navigate('/')
        }

      })
      .catch(err => {
        console.error(err)
      })
  }

  const checkForTokenAndSave = token => {
    if (token) {
      sessionStorage.setItem("token", token)
      console.log('token saved in session storage')
    } else {
      console.error('no token returned')
    }
  }

  const getLoggedInUser = savedToken => {
    if (!savedToken) {
      console.warn('no saved token found!');
      return null;
    } else {
      const decoded = jwt_decode(savedToken)
      return decoded.user
    }
  }

  const checkForCurrentWeek = user => {
    console.log(`checking if there is a current week for user: ${user.username}, id: ${user.id}`);
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setLoggedInUser(null)
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
        <Nav loggedInUser={loggedInUser} logoutHandler={logoutHandler} />
      </Box>
      <Box>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='user/*' element={<Auth authHandler={authHandler} />}></Route>
          <Route path='/profile' element={<UserProfile user={loggedInUser} />}></Route>
          <Route path='week/*' element={<WeekDisplay/>}></Route>
          <Route path='*' element={<NoMatch />}></Route>
        </Routes>

      </Box>

    </div>
  )
}