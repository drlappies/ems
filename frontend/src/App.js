import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { verifyThunk } from './actions/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/Navbar';
import Login from './components/Login';
import 'semantic-ui-css/semantic.min.css'

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    dispatch(verifyThunk(window.localStorage.getItem('jwt')))
  }, [dispatch])

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
