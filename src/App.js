import React from 'react';
import Axios from 'axios';
import './App.css';

import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import Auth from './User/Auth-main';
import Home from './Home';
import NoMatch from './Err/No-match';

export default function App() {

  const navigate = useNavigate()

  const authHandler = (route, user) => {
    Axios.post(`${route}`, user)
    .then(res => {
      checkForTokenAndSave(res.data.token)
      if (res.data.token) {
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

  return (
    <div id='main'>

      <nav>
        <Link to="/">home</Link>
        <Link to="/user/signin">sign in</Link>
        <Link to="/user/signup">sign up</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='user/*' element={<Auth authHandler={authHandler}/>}></Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>

    </div>
  )
}