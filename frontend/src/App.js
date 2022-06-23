import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getUser } from './redux/thunks/user'
import { getEmployee } from './redux/thunks/employee';
import Navbar from './components/Navbar/Navbar';
import AdminRoute from './components/routes/Admin';
import PrivateRoute from './components/routes/Private';
import Head from './components/Head'
import Notfound from './components/Notfound';
import UserPage from './pages/User/Index'
import PunchPage from './pages/Punch/Index'
import PunchOvertimePage from './pages/PunchOvertime/Index';
import LeaveAppPage from './pages/LeaveApp/Index';
import ReimbursementAppPage from './pages/ReimbursementApp/Index'
import LoginPage from './pages/Login/Index'
import AttendancePage from './pages/Attendance/Index';
import OvertimePage from './pages/Overtime/Index';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getEmployee(0, 0))
  }, [dispatch])

  if (!user.user.id) {
    return <LoginPage />
  }

  return (
    <Router>
      <Head />
      <Navbar />
      <div style={{ marginTop: 100, marginLeft: 265, marginRight: 25 }}>
        <Switch>
          <PrivateRoute exact path="/" component={UserPage} />
          <PrivateRoute exact path="/punch" component={PunchPage} />
          <PrivateRoute exact path="/punch/overtime" component={PunchOvertimePage} />
          <PrivateRoute exact path="/leave/application" component={LeaveAppPage} />
          <PrivateRoute exact path="/reimbursement/application" component={ReimbursementAppPage} />
          <AdminRoute exact path="/attendance" component={AttendancePage} />
          <AdminRoute exact path="/overtime" component={OvertimePage} />
          {/* <AdminRoute exact path="/dashboard" component={Dashboard} /> */}
          {/* <AdminRoute exact path="/overtime" component={OvertimeHistory} /> */}

          {/* <AdminRoute exact path="/leave/management" component={LeaveManagement} />
            <AdminRoute exact path="/employee/record" component={Employee} />
            <AdminRoute exact path="/employee/department" component={Department} />
            <AdminRoute exact path="/employee/position" component={Position} />
            <AdminRoute exact path="/allowance" component={Allowance} />
            <AdminRoute exact path="/reimbursement/management" component={ReimbursementManagement} />
            <AdminRoute exact path="/bonus/management" component={Bonus} />
            <AdminRoute exact path="/payroll" component={Payroll} />
            <AdminRoute exact path="/deduction/management" component={Deduction} /> */}
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
