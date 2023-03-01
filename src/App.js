import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Auth from './User/Auth-main';
import Home from './Home';

export default function App() {

  // state variables for authentication:
  const [isAuth, setIsAuth] = useState(false) // isAuth state inits to false
  const [user, setUser] = useState({}) // user state inits to empty obj
  const [message, setMessage] = useState(null) // message state inits to null

  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
    console.log(user)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

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
          <Route path='user/*' element={<Auth register={registerHandler}/> }></Route>
        </Routes>
      </Router>
    </div>
  )
}