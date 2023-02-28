import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Auth from './User/Auth-main';

export default function App() {
  return (
      <body>
        <Router>

          <nav>
            <Link to="/">home</Link>
            <Link to="/user">sign in</Link>
          </nav>

          <Routes>
            <Route path='user' element={<Auth/>}>
              <Route path='signin'></Route>
              <Route path='signup'></Route>
            </Route>
          </Routes>
        </Router>
      </body>
  )
}