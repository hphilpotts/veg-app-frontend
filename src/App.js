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

  const nullUser = { loggedIn: false, username: null, id: null }
  const [currentUser, setCurrentUser] = useState(nullUser)

  const nullWeek = { isFound: false, userOwner: null }
  const [currentWeek, setCurrentWeek] = useState(nullWeek)

  useEffect(() => {
    try {
      updateStateFromToken(sessionStorage.token)
    } catch {
      sessionStorage.token ? console.err('Invalid token in Session Storage') : console.log('No token found in session storage');
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
    checkForCurrentWeek(nextUser.id)
  }

  const getUserFromToken = savedToken => {
    try {
      const decoded = jwt_decode(savedToken)
      return decoded.user
    } catch (err) {
      console.log(err.message)
      return null
    }
  }

  const checkForCurrentWeek = userOwnerId => {
    if (!currentWeek.isFound) {
      userOwnerAxiosPut(userOwnerId)
        .then(() => {
          setCurrentWeek({ isFound: true, userOwner: userOwnerId })
        })
        .catch(err => {
          console.warn(err);
        })
    }
  }

  const userOwnerAxiosPut = async userOwnerId => {
    Axios({
      method: 'put',
      url: '/week/current',
      headers: { 'x-auth-token': sessionStorage.token },
      data: { "userOwner": userOwnerId }
    })
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    setCurrentUser(nullUser)
    setCurrentWeek(nullWeek)
    sessionStorage.clear()
  }

  return (
    <div id='main'>
      <div id='main-transparent'>

          <Box>
            <Nav currentUser={currentUser} logoutHandler={logoutHandler} />
          </Box>

          <Box>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='user/*' element={<Auth authHandler={authHandler} />}></Route>
              <Route path='/profile' element={<UserProfile currentUser={currentUser} />}></Route>
              <Route path='week/*' element={<WeekDisplay />}></Route>
              <Route path='*' element={<NoMatch />}></Route>
            </Routes>
          </Box>

      </div>
    </div>
  )
}