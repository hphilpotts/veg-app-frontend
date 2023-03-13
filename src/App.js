import React from 'react';
import Axios from 'axios';
import './App.css';

import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import Auth from './User/Auth-main';
import Home from './Home';
import NoMatch from './Err/No-match';

export default function App() {

  const navigate = useNavigate()

  const registerHandler = async user => {
    Axios.post("/auth/signup", user)
      .then(response => {
        checkForTokenAndSave(response.data.token)
        if (response.data.token) {
          navigate('/')
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  const loginHandler = async user => {
    console.log('running login handler...')
    console.log(user);
    Axios.post("/auth/signin", user)
      .then(response => {
        console.log('post request sent, checking for token...');
        console.log(response.data)
        checkForTokenAndSave(response.data.token)
        if (response.data.token) {
          console.log('got token!');
          navigate('/')
        }
      })
      .catch(error => {
        console.error(error);
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
        <Route path='user/*' element={<Auth register={registerHandler} login={loginHandler} />}></Route>
        <Route path='*' element={<NoMatch />}></Route>
      </Routes>

    </div>
  )
}