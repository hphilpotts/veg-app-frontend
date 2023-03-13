import React from 'react'

import { Link } from 'react-router-dom'

export default function Nav(props) {

    const loggedInUser = props.loggedInUser

    const logoutHandler = e => {
      props.logoutHandler(e)
    }

  return (
    <div>
        <Link to="/">home</Link>
        {!loggedInUser ? (
          <>
            <Link to="/user/signin">sign in</Link>
            <Link to="/user/signup">sign up</Link>
          </>
        ) : (
          <>
            <Link onClick={logoutHandler} to='/user/signin'>logout</Link>
            <Link to="/profile">hello, {loggedInUser}</Link>
          </>
        )}
    </div>
  )
}
