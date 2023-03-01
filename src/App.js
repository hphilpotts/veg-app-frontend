import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Auth from './User/Auth-main';
import Home from './Home';

export default function App() {
  return (
    <div id='main'>
      <Router>

        <nav>
          <Link to="/">home</Link>
          <Link to="/user/signin">sign in</Link>
          <Link to="/user/signup">sign up</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='user/*' element={<Auth />}></Route>
        </Routes>
      </Router>
    </div>
  )
}