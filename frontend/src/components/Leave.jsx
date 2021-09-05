import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeeAl, updateLeave, applyLeave } from '../actions/leave';
import { Form, Header } from 'semantic-ui-react'
import '../css/main.css'

function Leave() {
    const dispatch = useDispatch()
    const leave = useSelector(state => state.leave)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchEmployeeAl(auth.id))
    }, [auth.id, dispatch])

    const handleSubmit = () => {
        dispatch(applyLeave(auth.id, leave.applyReason, leave.applyFrom, leave.applyTo, leave.applyType, leave.applySpan))
    }

    return (
        <div className="leave-container">
            <div className="leave-form">
                <Header>Leave Application Portal</Header>
                <Form>
                    <Form.Field>
                        <label htmlFor="applyFrom">Leave From</label>
                        <input id="applyFrom" name="applyFrom" type="date" value={leave.applyFrom} onChange={(e) => dispatch(updateLeave(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyTo">To</label>
                        <input id="applyTo" name="applyTo" type="date" value={leave.applyTo} onChange={(e) => dispatch(updateLeave(e))} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyReason">Reason</label>
                        <textarea id="applyReason" name="applyReason" value={leave.applyReason} onChange={(e) => dispatch(updateLeave(e))}></textarea>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applyType">Leave Type <small>(Current Days of Annual Leave Left: {leave.employeeAL})</small></label>
                        <select id="applyType" name="applyType" value={leave.applyType} onChange={(e) => dispatch(updateLeave(e))} >
                            <option value="sick_leave">Sick Leave</option>
                            <option value="no_pay_leave">No Pay Leave</option>
                            <option value="annual_leave">Annual Leave</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="applySpan">Span</label>
                        <select id="applySpan" name="applySpan" value={leave.applySpan} onChange={(e) => dispatch(updateLeave(e))} >
                            <option value="half_day">Half Day</option>
                            <option value="full_day">Full Day</option>
                        </select>
                    </Form.Field>
                    <Form.Button color="green" onClick={() => handleSubmit()}>
                        Apply
                    </Form.Button>
                </Form>
            </div>
        </div>
    )
}

export default Leave