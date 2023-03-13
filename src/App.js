import React, { useState } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';

import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import Auth from './User/Auth-main';
import Home from './Home';
import NoMatch from './Err/No-match';

export default function App() {

  const [loggedInUser, setLoggedInUser] = useState()

  const navigate = useNavigate()

  const authHandler = (route, user) => {
    Axios.post(`${route}`, user)
    .then(res => {
      checkForTokenAndSave(res.data.token)
      if (res.data.token) {
        getLoggedInUser(sessionStorage.token)
        console.log(loggedInUser);
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
      console.error('no saved token found!');
    } else {
      const decoded = jwt_decode(savedToken)
      setLoggedInUser(decoded.user.username)
    }
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setLoggedInUser(null)
    console.log('Clearing session storage...')
    sessionStorage.clear()
  }

  return (
    <div id='main'>

      <nav>
        <Link to="/">home</Link>
        {!loggedInUser ? (
          <>
            <Link to="/user/signin">sign in</Link>
            <Link to="/user/signup">sign up</Link>
          </>
        ) : (
          <Link onClick={logoutHandler} to='/user/signin'>logout</Link>
        )}

      </nav>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='user/*' element={<Auth authHandler={authHandler}/>}></Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>

    </div>
  )
}