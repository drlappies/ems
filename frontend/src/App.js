import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/Navbar';
import Login from './components/Login';
import 'semantic-ui-css/semantic.min.css'

function App() {
  const auth = useSelector(state => state.auth.isAuthenticated)

  return (
    <Router>
      {!auth ?
        <Route exact path="/" component={Login} />
        :
        <Navbar>
          <Switch>
            <Route exact path="/home" component={Home} />
          </Switch>
        </Navbar>
      }
    </Router>
  );
}

export default App;
