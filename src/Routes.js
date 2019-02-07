import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppliedRoute from './components/AppliedRoute'
import Canvas from './components/canvas/canvas'
import Horizontal from './components/canvas/horizontal'
import Home from './components/home/home'
import Editor from './components/editor/editor'
import NotFound from './components/not-found/not-found'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import Create from './components/create/create'

export default ({ props }) => (
  <Switch>
    <AppliedRoute exact path="/" component={Home} />
    <AppliedRoute exact path="/login" component={Login} props={props} />
    <AppliedRoute exact path="/signup" component={Signup} props={props} />
    <AppliedRoute exact path="/canvas" component={Canvas} props={props} />
    <AppliedRoute exact path="/items/create" component={Create} props={props} />
    <AppliedRoute
      exact
      path="/horizontal"
      component={Horizontal}
      props={props}
    />
    <AppliedRoute
      exact
      path="/editor/:blockType"
      component={Editor}
      props={props}
    />
    <Route component={NotFound} />
  </Switch>
)
