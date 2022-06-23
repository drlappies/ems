import fetch from '../../axios'
import userApi from '../../apis/user'
import loginApi from '../../apis/login'
import * as userAction from '../actions/user'
import { push } from 'connected-react-router'

export function postLogin(username, password) {
    return async (dispatch) => {
        dispatch(userAction.postLogin())
        try {
            const data = {
                username: username,
                password: password
            }

            const res = await fetch(loginApi.postLogin.api, loginApi.postLogin.method, { body: data })

            window.localStorage.setItem("token", res.data.token)

            const payload = {
                user: res.data.userObj
            }

            dispatch(userAction.postLoginSuccess(payload))

            dispatch(push('/user'))
        } catch (error) {
            dispatch(userAction.postLoginFailure(error))
        }
    }
}

export function logout() {
    return () => {
        window.localStorage.removeItem("token")
        window.location.reload()
    }
}

export function getUser() {
    return async (dispatch) => {
        dispatch(userAction.getUser())
        try {
            const res = await fetch(userApi.getUser.api, userApi.getUser.method)

            const payload = {
                user: res.data
            }

            dispatch(userAction.getUserSuccess(payload))
        } catch (error) {
            console.log(error)
            dispatch(userAction.getUserFailure())
            dispatch(push('/'))
        }
    }
}

export function getUserAttendance(mindate, maxdate) {
    return async (dispatch) => {
        dispatch(userAction.getUserAttendance())
        try {

            const res = await fetch(userApi.getUserAttendance.api, userApi.getUserAttendance.method, {
                params: {
                    mindate: mindate,
                    maxdate: maxdate
                }
            })

            const payload = {
                userAttd: res.data.result
            }

            dispatch(userAction.getUserAttendanceSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserAttendanceFailure(error))
        }
    }
}

export function getUserLeave(mindate, maxdate) {
    return async (dispatch) => {
        dispatch(userAction.getUserLeave())
        try {
            const res = await fetch(userApi.getUserLeave.api, userApi.getUserLeave.method, {
                params: {
                    mindate: mindate,
                    maxdate: maxdate
                }
            })

            const payload = {
                userLeave: res.data.result
            }

            dispatch(userAction.getUserLeaveSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserLeaveFailure(error))
        }
    }
}

export function getUserOvertime(mindate, maxdate) {
    return async (dispatch) => {
        dispatch(userAction.getUserOvertime())
        try {

            const res = await fetch(userApi.getUserOvertime.api, userApi.getUserOvertime.method, {
                params: {
                    mindate: mindate,
                    maxdate: maxdate
                }
            })

            const payload = {
                userOvertime: res.data.result
            }

            dispatch(userAction.getUserOvertimeSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserOvertimeFailure(error))
        }
    }
}

export function getUserPayroll(offset, limit) {
    return async (dispatch) => {
        dispatch(userAction.getUserPayroll())
        try {
            const res = await fetch(userApi.getUserPayroll.api, userApi.getUserPayroll.method, {
                params: {
                    offset: offset,
                    limit: limit,
                }
            })

            const payload = {
                userPayroll: res.data.result,
                payrollCount: res.data.count.count
            }

            dispatch(userAction.getUserPayrollSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserPayrollFailure(error))
        }
    }
}

export function getUserReimbursement(offset, limit) {
    return async (dispatch) => {
        dispatch(userAction.getUserReimbursement())
        try {
            const res = await fetch(userApi.getUserReimbursement.api, userApi.getUserReimbursement.method, {
                params: {
                    offset: offset,
                    limit: limit
                }
            })

            const payload = {
                userReimbment: res.data.result,
                reimbmentCount: res.data.count.count
            }

            dispatch(userAction.getUserReimbursementSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserReimbursementFailure(error))
        }
    }
}

export function getUserAllowance(offset, limit) {
    return async (dispatch) => {
        dispatch(userAction.getUserAllowance())
        try {
            const res = await fetch(userApi.getUserAllowance.api, userApi.getUserAllowance.method, {
                params: {
                    offset: offset,
                    limit: limit
                }
            })

            const payload = {
                userAllowance: res.data.result,
                allowanceCount: res.data.count.count
            }

            dispatch(userAction.getUserAllowanceSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserAllowanceFailure(error))
        }
    }
}

export function getUserBonus(offset, limit) {
    return async (dispatch) => {
        dispatch(userAction.getUserBonus())
        try {
            const res = await fetch(userApi.getUserBonus.api, userApi.getUserBonus.method, {
                params: {
                    offset: offset,
                    limit: limit,
                }
            })

            const payload = {
                userBonus: res.data.result,
                bonusCount: res.data.count.count
            }

            dispatch(userAction.getUserBonusSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserBonusFailure(error))
        }
    }
}

export function getUserDeduction(offset, limit) {
    return async (dispatch) => {
        dispatch(userAction.getUserDeduction())
        try {
            const res = await fetch(userApi.getUserDeduction.api, userApi.getUserDeduction.method, {
                params: {
                    offset: offset,
                    limit: limit
                }
            })

            const payload = {
                userDeduction: res.data.result,
                deductionCount: res.data.count.count
            }

            dispatch(userAction.getUserDeductionSuccess(payload))
        } catch (error) {
            dispatch(userAction.getUserDeductionFailure(error))
        }
    }
}