const attendanceActionTypes = {
    GET_ATTENDANCE: "GET_ATTENDANCE",
    GET_ATTENDANCE_SUCCESS: "GET_ATTENDANCE_SUCCESS",
    GET_ATTENDANCE_FAILURE: "GET_ATTENDANCE_FAILURE",

    GET_USER_CHECK_IN_STATUS: "GET_USER_CHECK_IN_STATUS",
    GET_USER_CHECK_IN_STATUS_SUCCESS: "GET_USER_CHECK_IN_STATUS_SUCCESS",
    GET_USER_CHECK_IN_STATUS_FAILURE: "GET_USER_CHECK_IN_STATUS_FAILURE",

    GET_USER_OVERTIME_CHECK_IN_STATUS: "GET_USER_OVERTIME_CHECK_IN_STATUS",
    GET_USER_OVERTIME_CHECK_IN_STATUS_SUCCESS: "GET_USER_OVERTIME_CHECK_IN_STATUS_SUCCESS",
    GET_USER_OVERTIME_CHECK_IN_STATUS_FAILURE: "GET_USER_OVERTIME_CHECK_IN_STATUS_FAILURE",

    POST_ATTENDANCE_CHECK_IN: "POST_ATTENDANCE_CHECK_IN",
    POST_ATTENDANCE_CHECK_IN_SUCCESS: "POST_ATTENDANCE_CHECK_IN_SUCCESS",
    POST_ATTENDANCE_CHECK_IN_FAILURE: "POST_ATTENDANCE_CHECK_IN_FAILURE",

    POST_ATTENDANCE_CHECK_OUT: "POST_ATTENDANCE_CHECK_OUT",
    POST_ATTENDANCE_CHECK_OUT_SUCCESS: "POST_ATTENDANCE_CHECK_OUT_SUCCESS",
    POST_ATTENDANCE_CHECK_OUT_FAILURE: "POST_ATTENDANCE_CHECK_OUT_FAILURE",

    POST_ATTENDANCE: "POST_ATTENDANCE",
    POST_ATTENDANCE_SUCCESS: "POST_ATTENDANCE_SUCCESS",
    POST_ATTENDANCE_FAILURE: "POST_ATTENDANCE_FAILURE",

    GET_ATTENDANCE_BY_ID: "GET_ATTENDANCE_BY_ID",
    GET_ATTENDANCE_BY_ID_SUCCESS: "GET_ATTENDANCE_BY_ID_SUCCESS",
    GET_ATTENDANCE_BY_ID_FAILURE: "GET_ATTENDANCE_BY_ID_FAILURE",

    DELETE_ATTENDANCE_BY_ID: "DELETE_ATTENDANCE_BY_ID",
    DELETE_ATTENDANCE_BY_ID_SUCCESS: "DELETE_ATTENDANCE_BY_ID_SUCCESS",
    DELETE_ATTENDANCE_BY_ID_FAILURE: "DELETE_ATTENDANCE_BY_ID_FAILURE",

    BATCH_DELETE_ATTENDANCE: "BATCH_DELETE_ATTENDANCE",
    BATCH_DELETE_ATTENDANCE_SUCCESS: "BATCH_DELETE_ATTENDANCE_SUCCESS",
    BATCH_DELETE_ATTENDANCE_FAILURE: "BATCH_DELETE_ATTENDANCE_FAILURE",

    PUT_ATTENDANCE_BY_ID: "PUT_ATTENDANCE_BY_ID",
    PUT_ATTNEDANCE_BY_ID_SUCCESS: "PUT_ATTNEDANCE_BY_ID_SUCCESS",
    PUT_ATTENDANCE_BY_ID_FAILURE: "PUT_ATTENDANCE_BY_ID_FAILURE",

    BATCH_UPDATE_ATTENDANCE: "BATCH_UPDATE_ATTENDANCE",
    BATCH_UPDATE_ATTENDANCE_SUCCESS: "BATCH_UPDATE_ATTENDANCE_SUCCESS",
    BATCH_UPDATE_ATTENDANCE_FAILURE: "BATCH_UPDATE_ATTENDANCE_FAILURE",
}

export default attendanceActionTypes

export function getAttendance(payload) {
    return {
        type: attendanceActionTypes.GET_ATTENDANCE,
        payload
    }
}

export function getAttendanceSuccess(payload) {
    return {
        type: attendanceActionTypes.GET_ATTENDANCE_SUCCESS,
        payload,
    }
}

export function getAttendanceFailure(payload) {
    return {
        type: attendanceActionTypes.GET_ATTENDANCE_FAILURE,
        payload
    }
}

export function getUserCheckInStatus(payload) {
    return {
        type: attendanceActionTypes.GET_USER_CHECK_IN_STATUS,
        payload
    }
}

export function getUserCheckInStatusSuccess(payload) {
    return {
        type: attendanceActionTypes.GET_USER_CHECK_IN_STATUS_SUCCESS,
        payload
    }
}

export function getUserCheckInStatusFailure(payload) {
    return {
        type: attendanceActionTypes.GET_USER_CHECK_IN_STATUS_FAILURE,
        payload
    }
}

export function getUserOvertimeCheckInStatus(payload) {
    return {
        type: attendanceActionTypes.GET_USER_OVERTIME_CHECK_IN_STATUS,
        payload
    }
}

export function getUserOvertimeCheckInStatusSuccess(payload) {
    return {
        type: attendanceActionTypes.GET_USER_OVERTIME_CHECK_IN_STATUS_SUCCESS,
        payload
    }
}

export function getUserOvertimeCheckInStatusFailure(payload) {
    return {
        type: attendanceActionTypes.GET_USER_OVERTIME_CHECK_IN_STATUS_FAILURE,
        payload
    }
}

export function postAttendanceCheckIn(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_CHECK_IN,
        payload
    }
}

export function postAttendanceCheckInSuccess(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_CHECK_IN_SUCCESS,
        payload
    }
}

export function postAttendanceCheckInFailure(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_CHECK_IN_FAILURE,
        payload
    }
}

export function postAttendanceCheckOut(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_CHECK_OUT,
        payload,
    }
}

export function postAttendanceCheckOutSuccess(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_CHECK_OUT_SUCCESS,
        payload,
    }
}

export function postAttendanceCheckOutFailure(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_CHECK_OUT_FAILURE,
        payload
    }
}

export function postAttendance(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE,
        payload
    }
}

export function postAttendanceSuccess(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_SUCCESS,
        payload
    }
}

export function postAttendanceFailure(payload) {
    return {
        type: attendanceActionTypes.POST_ATTENDANCE_FAILURE,
        payload
    }
}

export function getAttendanceById(payload) {
    return {
        type: attendanceActionTypes.GET_ATTENDANCE_BY_ID,
        payload
    }
}

export function getAttendanceByIdSuccess(payload) {
    return {
        type: attendanceActionTypes.GET_ATTENDANCE_BY_ID_SUCCESS,
        payload
    }
}

export function getAttendanceByIdFailure(payload) {
    return {
        type: attendanceActionTypes.GET_ATTENDANCE_BY_ID_FAILURE,
        payload
    }
}

export function deleteAttendanceById(payload) {
    return {
        type: attendanceActionTypes.DELETE_ATTENDANCE_BY_ID,
        payload
    }
}

export function deleteAttendanceByIdSuccess(payload) {
    return {
        type: attendanceActionTypes.DELETE_ATTENDANCE_BY_ID_SUCCESS,
        payload
    }
}

export function deleteAttendanceByIdFailure(payload) {
    return {
        type: attendanceActionTypes.DELETE_ATTENDANCE_BY_ID_FAILURE,
        payload
    }
}

export function batchDeleteAttendance(payload) {
    return {
        type: attendanceActionTypes.BATCH_DELETE_ATTENDANCE,
        payload
    }
}

export function batchDeleteAttendanceSuccess(payload) {
    return {
        type: attendanceActionTypes.BATCH_DELETE_ATTENDANCE_SUCCESS,
        payload
    }
}

export function batchDeleteAttendanceFailure(payload) {
    return {
        type: attendanceActionTypes.BATCH_DELETE_ATTENDANCE_FAILURE,
        payload
    }
}

export function putAttendanceById(payload) {
    return {
        type: attendanceActionTypes.PUT_ATTENDANCE_BY_ID,
        payload
    }
}

export function putAttendanceByIdSuccess(payload) {
    return {
        type: attendanceActionTypes.PUT_ATTNEDANCE_BY_ID_SUCCESS,
        payload
    }
}

export function putAttendanceByIdFailure(payload) {
    return {
        type: attendanceActionTypes.PUT_ATTENDANCE_BY_ID_FAILURE,
        payload
    }
}

export function batchUpdateAttendance(payload) {
    return {
        type: attendanceActionTypes.BATCH_UPDATE_ATTENDANCE,
        payload
    }
}

export function batchUpdateAttendanceSuccess(payload) {
    return {
        type: attendanceActionTypes.BATCH_UPDATE_ATTENDANCE_SUCCESS,
        payload
    }
}

export function batchUpdateAttendanceFailure(payload) {
    return {
        type: attendanceActionTypes.BATCH_UPDATE_ATTENDANCE_FAILURE,
        payload
    }
}