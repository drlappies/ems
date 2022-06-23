import { networkStatus } from "../../constants/network";
import overtimeActionTypes from "../actions/overtime"

const initialState = {
    getOtCheckInStatus: networkStatus.IDLE,
    hasUserOtCheckedIn: false,
    hasUserOtCheckedOut: false,
    userOtCheckInTime: "",
    userOtCheckOutTime: "",
    postOtCheckInStatus: networkStatus.IDLE,
    postOtCheckOutStatus: networkStatus.IDLE,
    overtimeList: [],
    overtimeListCount: 0,
    getOvertimeListStatus: networkStatus.IDLE,
    postOvertimeStatus: networkStatus.IDLE
}

const overtimeReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case overtimeActionTypes.GET_OVERTIME_CHECK_IN_STATUS:
            return {
                ...state,
                getOtCheckInStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case overtimeActionTypes.GET_OVERTIME_CHECK_IN_STATUS_SUCCESS:
            return {
                ...state,
                getOtCheckInStatus: networkStatus.FETCH_SUCCEEDED,
                hasUserOtCheckedIn: payload.hasUserOtCheckedIn,
                hasUserOtCheckedOut: payload.hasUserOtCheckedOut,
                userOtCheckInTime: payload.userOtCheckInTime,
                userOtCheckOutTime: payload.userOtCheckOutTime,
            }

        case overtimeActionTypes.GET_OVERTIME_CHECK_IN_STATUS_FAILURE:
            return {
                ...state,
                getOtCheckInStatus: networkStatus.FETCH_FAILED
            }

        case overtimeActionTypes.POST_OVERTIME_CHECK_IN:
            return {
                ...state,
                postOtCheckInStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case overtimeActionTypes.POST_OVERTIME_CHECK_IN_SUCCESS:
            return {
                ...state,
                postOtCheckInStatus: networkStatus.FETCH_SUCCEEDED,
                hasUserOtCheckedIn: payload.hasUserOtCheckedIn,
                userOtCheckInTime: payload.userOtCheckInTime
            }

        case overtimeActionTypes.POST_OVERTIME_CHECK_IN_FAILURE:
            return {
                ...state,
                postOtCheckInStatus: networkStatus.FETCH_FAILED
            }

        case overtimeActionTypes.POST_OVERTIME_CHECK_OUT:
            return {
                ...state,
                postOtCheckOutStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case overtimeActionTypes.POST_OVERTIME_CHECK_OUT_SUCCESS:
            return {
                ...state,
                postOtCheckOutStatus: networkStatus.FETCH_SUCCEEDED,
                hasUserOtCheckedOut: payload.hasUserOtCheckedOut,
                userOtCheckOutTime: payload.userOtCheckOutTime
            }

        case overtimeActionTypes.POST_OVERTIME_CHECK_OUT_FAILURE:
            return {
                ...state,
                postOtCheckOutStatus: networkStatus.FETCH_FAILED
            }

        case overtimeActionTypes.GET_OVERTIME_LIST:
            return {
                ...state,
                getOvertimeListStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case overtimeActionTypes.GET_OVERTIME_LIST_SUCCESS:
            return {
                ...state,
                getOvertimeListStatus: networkStatus.FETCH_SUCCEEDED,
                overtimeList: payload.overtimeList,
                overtimeListCount: payload.overtimeListCount
            }

        case overtimeActionTypes.GET_OVERTIME_LIST_FAILURE:
            return {
                ...state,
                getOvertimeListStatus: networkStatus.FETCH_FAILED
            }

        case overtimeActionTypes.POST_OVERTIME:
            return {
                ...state,
                postOvertimeStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case overtimeActionTypes.POST_OVERTIME_SUCCESS:
            return {
                ...state,
                postOvertimeStatus: networkStatus.FETCH_SUCCEEDED
            }

        case overtimeActionTypes.POST_OVERTIME_FAILURE:
            return {
                ...state,
                postOvertimeStatus: networkStatus.FETCH_FAILED
            }

        default:
            return { ...state }
    }
}

export default overtimeReducer