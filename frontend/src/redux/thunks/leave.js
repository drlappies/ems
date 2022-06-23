import fetch from "../../axios";
import leaveApi from '../../apis/leave'
import * as leaveAction from '../actions/leave'

export function postLeave() {
    return async (dispatch) => {
        dispatch(leaveAction.postLeave())
        try {



            dispatch(leaveAction.postLeaveSuccess())
        } catch (error) {
            dispatch(leaveAction.postLeaveFailure())
        }
    }
}

export function postApplyLeave(from, to, reason, type, duration) {
    return async (dispatch) => {
        dispatch(leaveAction.postApplyLeave())
        try {
            const data = {
                from: from,
                to: to,
                reason: reason,
                duration: duration,
                type: type
            }

            await fetch(leaveApi.postApplyLeave.api, leaveApi.postApplyLeave.method, { body: data })
            dispatch(leaveAction.postApplyLeaveSuccess())
        } catch (error) {
            dispatch(leaveAction.postApplyLeaveFailure())
        }
    }
}