import fetch from "../../axios";
import attendanceApi from "../../apis/attendance";
import * as attendanceAction from '../actions/attendance';
import * as snackbarAction from '../actions/notification';
import { convertListDate } from "../../utils/date";

export function getUserCheckInStatus() {
    return async (dispatch) => {
        dispatch(attendanceAction.getUserCheckInStatus())
        try {
            const res = await fetch(attendanceApi.api.getUserCheckInStatus, attendanceApi.api.getUserCheckInStatus.method)

            const payload = {
                hasUserCheckedIn: res.data.check_in ? true : false,
                hasUserCheckedOut: res.data.check_out ? true : false,
                userCheckInTime: res.data.check_in,
                userCheckOutTime: res.data.check_out
            }

            dispatch(attendanceAction.getUserCheckInStatusSuccess(payload))
        } catch (error) {
            dispatch(attendanceAction.getUserCheckInStatusFailure(error))
        }
    }
}

export function postAttdCheckIn() {
    return async (dispatch) => {
        dispatch(attendanceAction.postAttendanceCheckIn())
        try {
            const res = await fetch(attendanceApi.postCheckIn.api, attendanceApi.postCheckIn.method)

            const payload = {
                userCheckInTime: res.data.check_in,
                hasUserCheckedIn: true,
            }

            dispatch(attendanceAction.postAttendanceCheckInSuccess(payload))

            const snackbar = {
                message: "Successfully checked in",
                options: {
                    variant: 'success',
                }
            }

            dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.postAttendanceCheckInFailure(error))
        }
    }
}

export function postAttdCheckOut() {
    return async (dispatch) => {
        dispatch(attendanceAction.postAttendanceCheckOut())
        try {
            const res = await fetch(attendanceApi.postCheckOut.api, attendanceApi.postCheckOut.method)

            const payload = {
                userCheckOutTime: res.data.check_out,
                hasUserCheckedOut: true,
            }

            dispatch(attendanceAction.postAttendanceCheckOutSuccess(payload))

            const snackbar = {
                message: "Successfully checked out",
                options: {
                    variant: 'success',
                }
            }

            dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.postAttendanceCheckOutFailure(error))
        }
    }
}

export function getAttendance(offset, limit, employeeId, status, search, minDate, maxDate) {
    return async (dispatch) => {
        dispatch(attendanceAction.getAttendance())
        try {
            if (employeeId === "any") employeeId = ""
            if (status === "any") status = ""

            const res = await fetch(attendanceApi.getAttendance.api, attendanceApi.getAttendance.method, {
                params: {
                    offset: offset,
                    limit: limit,
                    employee_id: employeeId,
                    status: status,
                    search: search,
                    mindate: minDate,
                    maxdate: maxDate
                }
            })

            const payload = {
                attendences: convertListDate(res.data.result, "date"),
                attendancesCount: parseInt(res.data.count.count)
            }

            dispatch(attendanceAction.getAttendanceSuccess(payload))
        } catch (error) {
            dispatch(attendanceAction.getAttendanceFailure(error))
        }
    }
}

export function postAttendance(employeeId, date, checkInTime, checkOutTime, status) {
    return async (dispatch) => {
        dispatch(attendanceAction.postAttendance())
        try {
            await fetch(attendanceApi.postAttendance.api, attendanceApi.postAttendance.method, {
                body: {
                    employee_id: employeeId,
                    date: date,
                    check_in: checkInTime,
                    check_out: checkOutTime,
                    status: status
                }
            })

            dispatch(attendanceAction.postAttendanceSuccess())
        } catch (error) {
            dispatch(attendanceAction.postAttendanceFailure())
            throw error
        }
    }
}

export function getAttendanceById(id) {
    return async (dispatch) => {
        dispatch(attendanceAction.getAttendanceById())
        try {
            const res = await fetch(attendanceApi.getAttendanceById.api.replace("{{id}}", id), attendanceApi.getAttendanceById.method)

            const payload = {
                attendance: res.data
            }

            dispatch(attendanceAction.getAttendanceByIdSuccess(payload))
        } catch (error) {
            dispatch(attendanceAction.getAttendanceByIdFailure())
        }
    }
}

export function deleteAttendanceById(id) {
    return async (dispatch, getState) => {
        dispatch(attendanceAction.deleteAttendanceById())
        try {
            await fetch(attendanceApi.deleteAttendanceById.api.replace("{{id}}", id), attendanceApi.deleteAttendanceById.method)

            const state = getState()

            const attendanceList = state.attendance.attendences.filter(el => !id.includes(el.id))

            const payload = {
                attendences: attendanceList
            }

            dispatch(attendanceAction.deleteAttendanceByIdSuccess(payload))

            const snackbar = {
                message: "Successfully deleted!",
                options: {
                    variant: 'success',
                }
            }

            dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.deleteAttendanceByIdFailure())
        }
    }
}

export function deleteManyByIds(ids) {
    return async (dispatch, getState) => {
        dispatch(attendanceAction.batchDeleteAttendance())
        try {
            await fetch(attendanceApi.batchDeleteAttendance.api, attendanceApi.batchDeleteAttendance.method, {
                body: {
                    ids: [...ids]
                }
            })

            const state = getState();

            const attendanceList = state.attendance.attendences.filter(el => !ids.includes(el.id))

            const payload = {
                attendences: attendanceList
            }

            dispatch(attendanceAction.batchDeleteAttendanceSuccess(payload))

            const snackbar = {
                message: "Successfully deleted!",
                options: {
                    variant: 'success',
                }
            }

            dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.batchDeleteAttendanceFailure())
        }
    }
}

export function putAttendanceById(id, checkInTime, checkOutTime, status) {
    return async (dispatch) => {
        dispatch(attendanceAction.putAttendanceById())
        try {
            await fetch(attendanceApi.putAttendanceById.api.replace("{{id}}", id), attendanceApi.putAttendanceById.method, {
                body: {
                    check_in: checkInTime,
                    check_out: checkOutTime,
                    status: status
                }
            })

            dispatch(attendanceAction.putAttendanceByIdSuccess())

            const snackbar = {
                message: "Successfully updated attendance record!",
                options: {
                    variant: 'success',
                }
            }

            dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.putAttendanceByIdFailure())
        }
    }
}

export function updateManyByIds(ids, checkInTime, checkOutTime, status) {
    return async (dispatch) => {
        dispatch(attendanceAction.batchUpdateAttendance())
        try {
            await fetch(attendanceApi.batchUpdateAttendance.api, attendanceApi.batchUpdateAttendance.method, {
                body: {
                    ids: ids,
                    check_in: checkInTime,
                    check_out: checkOutTime,
                    status: status
                }
            })

            dispatch(attendanceAction.batchUpdateAttendanceSuccess())

            const snackbar = {
                message: "Successfully updated attendance record!",
                options: {
                    variant: 'success',
                }
            }

            dispatch(snackbarAction.addSnackbar(snackbar))
        } catch (error) {
            dispatch(attendanceAction.batchUpdateAttendanceFailure())
        }
    }
}