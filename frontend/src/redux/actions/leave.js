const leaveActionTypes = {
    POST_LEAVE: "POST_LEAVE",
    POST_LEAVE_SUCCESS: "POST_LEAVE_SUCCESS",
    POST_LEAVE_FAILURE: "POST_LEAVE_FAILURE",

    POST_APPLY_LEAVE: "POST_APPLY_LEAVE",
    POST_APPLY_LEAVE_SUCCESS: "POST_APPLY_LEAVE_SUCCESS",
    POST_APPLY_LEAVE_FAILURE: "POST_APPLY_LEAVE_FAILURE"
}

export default leaveActionTypes

export function postLeave(payload) {
    return {
        type: leaveActionTypes.POST_LEAVE,
        payload
    }
}

export function postLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_LEAVE_SUCCESS,
        payload
    }
}

export function postLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_LEAVE_FAILURE,
        payload
    }
}

export function postApplyLeave(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_LEAVE,
        payload
    }
}

export function postApplyLeaveSuccess(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_LEAVE_SUCCESS,
        payload
    }
}

export function postApplyLeaveFailure(payload) {
    return {
        type: leaveActionTypes.POST_APPLY_LEAVE_FAILURE,
        payload
    }
}