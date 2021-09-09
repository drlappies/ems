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
import ReimbursementManagement from './components/ReimbursementManagement';
import Bonus from './components/Bonus';
import Payroll from './components/Payroll';
import Deduction from './components/Deduction';
import Leave from './components/Leave';
import LeaveManagement from './components/LeaveManagement';
import 'semantic-ui-css/semantic.min.css'

function App() {
  const auth = useSelector(state => state.auth)

  return (
    <Router>
      {!auth.isAuthenticated ?
        <React.Fragment>
          <Popup />
          <Route exact path="/" component={Login} />
        </React.Fragment>
        :
        <React.Fragment>
          <Head />
          <Popup />
          <Navbar>
            <Switch>
              <AdminRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/attendance/punch" component={Attendance} />
              <AdminRoute exact path="/attendance" component={AttendanceHistory} />
              <PrivateRoute exact path="/attendance/overtime/check_in" component={AttendanceOvertime} />
              <AdminRoute exact path="/overtime" component={OvertimeHistory} />
              <PrivateRoute exact path="/leave/application" component={Leave} />
              <AdminRoute exact path="/leave/management" component={LeaveManagement} />
              <AdminRoute exact path="/employee/record" component={Employee} />
              <AdminRoute exact path="/employee/department" component={Department} />
              <AdminRoute exact path="/employee/position" component={Position} />
              <AdminRoute exact path="/allowance" component={Allowance} />
              <AdminRoute exact path="/reimbursement/apply" component={Reimbursement} />
              <AdminRoute exact path="/reimbursement/management" component={ReimbursementManagement} />
              <AdminRoute exact path="/bonus/management" component={Bonus} />
              <AdminRoute exact path="/payroll/management" component={Payroll} />
              <AdminRoute exact path="/deduction/management" component={Deduction} />
            </Switch>
          </Navbar>
        </React.Fragment>
      }
    </Router>
  );
}

export default App;
