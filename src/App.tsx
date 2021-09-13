import React from 'react';
import './App.css';
import { Login } from './pages/Login';
import {BrowserRouter as Router ,Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home';

function App() {
  return (
      <Router>
        <Switch>
          <Route path='/' component={Login} exact/>
          <Route path='/home' render={() => <Home/>}/>
        </Switch>
      </Router>
  );
}

export default App;
