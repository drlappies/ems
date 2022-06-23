import fetch from "../../axios";
import overtimeApi from '../../apis/overtime'
import * as overtimeAction from '../actions/overtime'
import * as notificationAction from '../actions/notification'
import { convertListDate } from "../../utils/date";

export function getUserOvertimeStatus() {
    return async (dispatch) => {
        dispatch(overtimeAction.getOvertimeCheckInStatus())
        try {
            const res = await fetch(overtimeApi.getUserOTCheckInStatus.api, overtimeApi.getUserOTCheckInStatus.method)

            const payload = {
                hasUserOtCheckedIn: res.data.from ? true : false,
                hasUserOtCheckedOut: res.data.to ? true : false,
                userOtCheckInTime: res.data.from,
                userOtCheckOutTime: res.data.to
            }

            dispatch(overtimeAction.getOvertimeCheckInStatusSuccess(payload))
        } catch (error) {
            dispatch(overtimeAction.getOvertimeCheckInStatusFailure(error))
        }
    }
}

export function postOvertimeCheckIn() {
    return async (dispatch) => {
        dispatch(overtimeAction.postOvertimeCheckIn())
        try {
            const res = await fetch(overtimeApi.postOvertimeCheckIn.api, overtimeApi.postOvertimeCheckIn.method)

            const payload = {
                hasUserOtCheckedIn: true,
                userOtCheckInTime: res.data.from,
            }

            dispatch(overtimeAction.postOvertimeCheckInSuccess(payload))
        } catch (error) {
            dispatch(overtimeAction.postOvertimeCheckInFailure())
        }
    }
}

export function postOvertimeCheckOut() {
    return async (dispatch) => {
        dispatch(overtimeAction.postOvertimeCheckOut())
        try {
            const res = await fetch(overtimeApi.postOvertimeCheckOut.api, overtimeApi.postOvertimeCheckOut.method)

            const payload = {
                hasUserOtCheckedOut: true,
                userOtCheckOutTime: res.data.to
            }

            dispatch(overtimeAction.postOvertimeCheckOutSuccess(payload))
        } catch (error) {
            dispatch(overtimeAction.postOvertimeCheckOutFailure(error))
        }
    }
}

export function getOvertime(offset, limit, search, employeeId, status) {
    return async (dispatch) => {
        dispatch(overtimeAction.getOvertimeList())
        try {
            const res = await fetch(overtimeApi.getOvertimeList.api, overtimeApi.getOvertimeList.method, {
                params: {
                    offset,
                    limit,
                    search,
                    status,
                    employee_id: employeeId,
                }
            })

            const payload = {
                overtimeList: convertListDate(res.data.result, "date"),
                overtimeListCount: parseInt(res.data.count.count)
            }

            dispatch(overtimeAction.getOvertimeListSuccess(payload))
        } catch (error) {
            dispatch(overtimeAction.getOvertimeListFailure())
        }
    }
}

export function postOvertime(employeeId, date, from, to, status) {
    return async (dispatch) => {
        dispatch(overtimeAction.postOvertime())
        try {
            await fetch(overtimeApi.postOvertime.api, overtimeApi.postOvertime.method, {
                body: {
                    employee_id: employeeId,
                    date: date,
                    from: from,
                    to: to,
                    status: status
                }
            })

            dispatch(overtimeAction.postOvertimeSuccess())

            dispatch(notificationAction.addSnackbar({
                message: 'Overtime has been created successfully',
                options: {
                    variant: 'success',
                }
            }))
        } catch (error) {
            dispatch(overtimeAction.postOvertimeFailure())
        }
    }
}

export function putOvertimeById(id, date, from, to, status) {
    return async (dispatch) => {
        dispatch(overtimeAction.putOvertimeById())
        try {
            await fetch(overtimeApi.putOvertimeById.api.replace("{{id}}", id), overtimeApi.putOvertimeById.method, {
                body: {
                    date: date,
                    from: from,
                    to: to,
                    status: status
                }
            })
            dispatch(overtimeAction.putOvertimeByIdSuccess())
        } catch (error) {
            dispatch(overtimeAction.putOvertimeByIdFailure())
        }
    }
}