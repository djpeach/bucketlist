import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Navbar, Home, Suggestions} from './components'
import routes from './config/routes'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path={routes.index} component={Home}/>
        <Route exact path={routes.example.suggestions} component={Suggestions}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
