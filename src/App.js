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

  const nullWeek = { isFound: false, userOwner: null, data: {} }
  const [currentWeek, setCurrentWeek] = useState(nullWeek)

  useEffect(() => {
    try {
      if (currentUser.loggedIn) {
        console.log('user already found as state');
      } else {
        updateStateFromToken(sessionStorage.token)
      }
    } catch {
      sessionStorage.token ? console.error('Invalid token in Session Storage') : console.log('No token found in session storage');
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

  const checkForCurrentWeek = async userOwnerId => {
    if (!currentWeek.isFound) {
      await userOwnerAxiosPut(userOwnerId, 'current')
        .then(res => {
          console.log(res.data.Week);
          if (res.data.Week) {
            setCurrentWeek({ isFound: true, userOwner: userOwnerId, data: res.data.Week })
          } else {
            createNewWeekByUserOwner(userOwnerId)
              .then(res => {
                setCurrentWeek({ isFound: true, userOwner: userOwnerId, data: res.data.Week })
              })
              .catch(err => {
                console.warn(err)
              })
          }
        })
        .catch(err => {
          console.warn(err)
        })
    }
  }

  const userOwnerAxiosPut = async (userOwnerId, path) => {
    const res = await Axios({
      method: 'put',
      url: `/week/${path}`,
      headers: { 'x-auth-token': sessionStorage.token },
      data: { "userOwner": userOwnerId }
    })
    return res
  }

  const createNewWeekByUserOwner = async userOwnerId => {
    const res = await Axios({
      method: 'post',
      url: `/week/newWeek`,
      headers: { 'x-auth-token': sessionStorage.token },
      data: { "userOwner": userOwnerId }
    })
    return res
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
              <Route path='week/*' element={<WeekDisplay currentWeek={currentWeek}/>}></Route>
              <Route path='*' element={<NoMatch />}></Route>
            </Routes>
          </Box>

      </div>
    </div>
  )
}