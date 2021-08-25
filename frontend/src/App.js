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
import AttendanceOvertime from './components/AttendanceOvertime';
import OvertimeHistory from './components/OvertimeHistory';
import Popup from './components/Popup';
import Employee from './components/Employee';
import Department from './components/Department'
import Position from './components/Position';
import Allowance from './components/Allowance';
import Reimbursement from './components/Reimbursement';
import 'semantic-ui-css/semantic.min.css'
import ReimbursementManagement from './components/ReimbursementManagement';

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
              <AdminRoute exact path="/employee/record" component={Employee} />
              <AdminRoute exact path="/employee/department" component={Department} />
              <AdminRoute exact path="/employee/position" component={Position} />
              <AdminRoute exact path="/allowance" component={Allowance} />
              <AdminRoute exact path="/reimbursement/apply" component={Reimbursement} />
              <AdminRoute exact path="/reimbursement/management" component={ReimbursementManagement} />
            </Switch>
          </Navbar>
        </React.Fragment>
      }
    </Router>
  );
}

export default App;
