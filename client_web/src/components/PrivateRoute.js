import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { getCookie } from '../helpers/cookies'

import Paths from '../res/values/Paths'
import Cookies from '../res/values/Cookies'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        getCookie(Cookies.userToken) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: Paths.login,
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}

export default PrivateRoute
