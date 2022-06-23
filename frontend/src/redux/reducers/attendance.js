import attendanceActionTypes from "../actions/attendance"
import { networkStatus } from '../../constants/network'

const initialState = {
    getAttdStatus: networkStatus.IDLE,
    getAttdByIdStatus: networkStatus.IDLE,
    deleteAttdStatus: networkStatus.IDLE,
    getUserCheckInStatus: networkStatus.IDLE,
    postAttdCheckInStatus: networkStatus.IDLE,
    postAttdCheckOutStatus: networkStatus.IDLE,
    putAttdStatus: networkStatus.IDLE,
    hasUserCheckedIn: false,
    hasUserCheckedOut: false,
    userCheckInTime: "",
    userCheckOutTime: "",
    attendences: [],
    attendancesCount: 0,
    attendance: {},
}

const attendanceReducer = (state = initialState, action) => {
    const { payload, type } = action

    switch (type) {

        case attendanceActionTypes.GET_USER_CHECK_IN_STATUS:
            return {
                ...state,
                getUserCheckInStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.GET_USER_CHECK_IN_STATUS_SUCCESS:
            return {
                ...state,
                getUserCheckInStatus: networkStatus.FETCH_SUCCEEDED,
                hasUserCheckedIn: payload.hasUserCheckedIn,
                hasUserCheckedOut: payload.hasUserCheckedOut,
                userCheckInTime: payload.userCheckInTime,
                userCheckOutTime: payload.userCheckOutTime,
            }

        case attendanceActionTypes.GET_USER_CHECK_IN_STATUS_FAILURE:
            return {
                ...state,
                getUserCheckInStatus: networkStatus.FETCH_FAILED
            }

        case attendanceActionTypes.POST_ATTENDANCE_CHECK_IN:
            return {
                ...state,
                postAttdCheckInStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.POST_ATTENDANCE_CHECK_IN_SUCCESS:
            return {
                ...state,
                postAttdCheckInStatus: networkStatus.FETCH_SUCCEEDED,
                userCheckInTime: payload.userCheckInTime,
                hasUserCheckedIn: payload.hasUserCheckedIn
            }

        case attendanceActionTypes.POST_ATTENDANCE_CHECK_IN_FAILURE:
            return {
                ...state,
                postAttdCheckInStatus: networkStatus.FETCH_FAILED
            }

        case attendanceActionTypes.POST_ATTENDANCE_CHECK_OUT:
            return {
                ...state,
                postAttdCheckOutStatus: networkStatus.FETCH_IN_PROGRESS,
            }

        case attendanceActionTypes.POST_ATTENDANCE_CHECK_OUT_SUCCESS:
            return {
                ...state,
                postAttdCheckOutStatus: networkStatus.FETCH_SUCCEEDED,
                userCheckOutTime: payload.userCheckOutTime,
                hasUserCheckedOut: payload.hasUserCheckedOut
            }

        case attendanceActionTypes.POST_ATTENDANCE_CHECK_OUT_FAILURE:
            return {
                ...state,
                postAttdCheckOutStatus: networkStatus.FETCH_FAILED,
            }

        case attendanceActionTypes.GET_ATTENDANCE:
            return {
                ...state,
                getAttdStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.GET_ATTENDANCE_SUCCESS:
            return {
                ...state,
                getAttdStatus: networkStatus.FETCH_SUCCEEDED,
                attendences: payload.attendences,
                attendancesCount: payload.attendancesCount
            }

        case attendanceActionTypes.GET_ATTENDANCE_FAILURE:
            return {
                ...state,
                getAttdStatus: networkStatus.FETCH_FAILED
            }

        case attendanceActionTypes.GET_ATTENDANCE_BY_ID:
            return {
                ...state,
                getAttdByIdStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.GET_ATTENDANCE_BY_ID_SUCCESS:
            return {
                ...state,
                getAttdByIdStatus: networkStatus.FETCH_SUCCEEDED,
                attendance: payload.attendance
            }

        case attendanceActionTypes.GET_ATTENDANCE_BY_ID_FAILURE:
            return {
                ...state,
                getAttdByIdStatus: networkStatus.FETCH_FAILED
            }

        case attendanceActionTypes.DELETE_ATTENDANCE_BY_ID:
            return {
                ...state,
                deleteAttdStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.DELETE_ATTENDANCE_BY_ID_SUCCESS:
            return {
                ...state,
                deleteAttdStatus: networkStatus.FETCH_SUCCEEDED,
                attendences: payload.attendences
            }

        case attendanceActionTypes.DELETE_ATTENDANCE_BY_ID_FAILURE:
            return {
                ...state,
                deleteAttdStatus: networkStatus.FETCH_FAILED
            }

        case attendanceActionTypes.BATCH_DELETE_ATTENDANCE:
            return {
                ...state,
                deleteAttdStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.BATCH_DELETE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                deleteAttdStatus: networkStatus.FETCH_SUCCEEDED,
                attendences: payload.attendences
            }

        case attendanceActionTypes.BATCH_DELETE_ATTENDANCE_FAILURE:
            return {
                ...state,
                deleteAttdStatus: networkStatus.FETCH_FAILED
            }

        case attendanceActionTypes.PUT_ATTENDANCE_BY_ID:
            return {
                ...state,
                putAttdStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case attendanceActionTypes.PUT_ATTNEDANCE_BY_ID_SUCCESS:
            return {
                ...state,
                putAttdStatus: networkStatus.FETCH_SUCCEEDED,
            }

        case attendanceActionTypes.PUT_ATTENDANCE_BY_ID_FAILURE:
            return {
                ...state,
                putAttdStatus: networkStatus.FETCH_FAILED
            }

        default:
            return state
    }
}

export default attendanceReducer