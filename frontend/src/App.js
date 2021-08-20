import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import AttendanceHistory from './components/AttendanceHistory';
import AdminRoute from './components/routes/Admin';
import PrivateRoute from './components/routes/Private';
import Head from './components/Head'
import 'semantic-ui-css/semantic.min.css'
import AttendanceOvertime from './components/AttendanceOvertime';
import OvertimeHistory from './components/OvertimeHistory';
import Popup from './components/Popup';

function App() {
  const auth = useSelector(state => state.auth)

  return (
    <Router>
      {!auth.isAuthenticated ?
        <Route exact path="/" component={Login} />
        :
        <React.Fragment>
          <Head />
          <Popup />
          <Navbar>
            <Switch>
              <AdminRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/attendance/time" component={Attendance} />
              <AdminRoute exact path="/attendance/history" component={AttendanceHistory} />
              <PrivateRoute exact path="/attendance/overtime" component={AttendanceOvertime} />
              <AdminRoute exact path="/attendance/history/overtime" component={OvertimeHistory} />
            </Switch>
          </Navbar>
        </React.Fragment>
      }
    </Router>
  );
}

export default App;
