import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../components/Home'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import SubscribeList from '../components/SubscribeList'
import NotFound from '../components/NotFound'
import PrivateRoute from '../components/PrivateRoute'
import ApkDownload from '../components/ApkDownload'

import Paths from '../res/values/Paths'

export default function AreaRouter () {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={Paths.root}
          component={Home} />
        <Route
          path={Paths.signUp}
          component={SignUp} />
        <Route
          path={Paths.login}
          component={Login} />
        <Route
          path={'/client.apk'}
          component={ApkDownload} />
        <PrivateRoute
          path={Paths.dashboard}
          component={Dashboard} />
        <Route
          path={Paths.subscribeList}
          component={SubscribeList} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
