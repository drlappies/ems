const overtimeActionTypes = {
    GET_OVERTIME_CHECK_IN_STATUS: "GET_OVERTIME_CHECK_IN_STATUS",
    GET_OVERTIME_CHECK_IN_STATUS_SUCCESS: "GET_OVERTIME_CHECK_IN_STATUS_SUCCESS",
    GET_OVERTIME_CHECK_IN_STATUS_FAILURE: "GET_OVERTIME_CHECK_IN_STATUS_FAILURE",

    POST_OVERTIME_CHECK_IN: "POST_OVERTIME_CHECK_IN",
    POST_OVERTIME_CHECK_IN_SUCCESS: "POST_OVERTIME_CHECK_IN_SUCCESS",
    POST_OVERTIME_CHECK_IN_FAILURE: "POST_OVERTIME_CHECK_IN_FAILURE",

    POST_OVERTIME_CHECK_OUT: "POST_OVERTIME_CHECK_OUT",
    POST_OVERTIME_CHECK_OUT_SUCCESS: "POST_OVERTIME_CHECK_OUT_SUCCESS",
    POST_OVERTIME_CHECK_OUT_FAILURE: "POST_OVERTIME_CHECK_OUT_FAILURE",

    GET_OVERTIME_LIST: "GET_OVERTIME_LIST",
    GET_OVERTIME_LIST_SUCCESS: "GET_OVERTIME_LIST_SUCCESS",
    GET_OVERTIME_LIST_FAILURE: "GET_OVERTIME_LIST_FAILURE",

    POST_OVERTIME: "POST_OVERTIME",
    POST_OVERTIME_SUCCESS: "POST_OVERTIME_SUCCESS",
    POST_OVERTIME_FAILURE: "POST_OVERTIME_FAILURE",

    PUT_OVERTIME_BY_ID: "PUT_OVERTIME_BY_ID",
    PUT_OVERTIME_BY_ID_SUCCESS: "PUT_OVERTIME_BY_ID_SUCCESS",
    PUT_OVERTIME_BY_ID_FAILURE: "PUT_OVERTIME_BY_ID_FAILURE",
}

export default overtimeActionTypes

export function getOvertimeCheckInStatus(payload) {
    return {
        type: overtimeActionTypes.GET_OVERTIME_CHECK_IN_STATUS,
        payload,
    }
}

export function getOvertimeCheckInStatusSuccess(payload) {
    return {
        type: overtimeActionTypes.GET_OVERTIME_CHECK_IN_STATUS_SUCCESS,
        payload
    }
}

export function getOvertimeCheckInStatusFailure(payload) {
    return {
        type: overtimeActionTypes.GET_OVERTIME_CHECK_IN_STATUS_FAILURE,
        payload
    }
}

export function postOvertimeCheckIn(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_CHECK_IN,
        payload
    }
}

export function postOvertimeCheckInSuccess(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_CHECK_IN_SUCCESS,
        payload
    }
}

export function postOvertimeCheckInFailure(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_CHECK_IN_FAILURE,
        payload
    }
}

export function postOvertimeCheckOut(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_CHECK_OUT,
        payload
    }
}

export function postOvertimeCheckOutSuccess(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_CHECK_OUT_SUCCESS,
        payload
    }
}

export function postOvertimeCheckOutFailure(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_CHECK_OUT_FAILURE,
        payload
    }
}

export function getOvertimeList(payload) {
    return {
        type: overtimeActionTypes.GET_OVERTIME_LIST,
        payload
    }
}

export function getOvertimeListSuccess(payload) {
    return {
        type: overtimeActionTypes.GET_OVERTIME_LIST_SUCCESS,
        payload
    }
}

export function getOvertimeListFailure(payload) {
    return {
        type: overtimeActionTypes.GET_OVERTIME_LIST_FAILURE,
        payload
    }
}

export function postOvertime(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME,
        payload
    }
}

export function postOvertimeSuccess(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_SUCCESS,
        payload
    }
}

export function postOvertimeFailure(payload) {
    return {
        type: overtimeActionTypes.POST_OVERTIME_FAILURE,
        payload
    }
}

export function putOvertimeById(payload) {
    return {
        type: overtimeActionTypes.PUT_OVERTIME_BY_ID,
        payload
    }
}

export function putOvertimeByIdSuccess(payload) {
    return {
        type: overtimeActionTypes.PUT_OVERTIME_BY_ID_SUCCESS,
        payload
    }
}

export function putOvertimeByIdFailure(payload) {
    return {
        type: overtimeActionTypes.PUT_OVERTIME_BY_ID_FAILURE,
        payload
    }
}
