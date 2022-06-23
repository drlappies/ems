import { networkStatus } from "../../constants/network"
import leaveActionTypes from "../actions/leave"

const initialState = {
    postLeaveStatus: networkStatus.IDLE
}

const leaveReducer = (state = initialState, action) => {
    const { payload, type } = action

    switch (type) {
        case leaveActionTypes.POST_LEAVE:
            return {
                ...state,
                postLeaveStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case leaveActionTypes.POST_LEAVE_SUCCESS:
            return {
                ...state,
                postLeaveStatus: networkStatus.FETCH_SUCCEEDED
            }

        case leaveActionTypes.POST_LEAVE_FAILURE:
            return {
                ...state,
                postLeaveStatus: networkStatus.FETCH_FAILED
            }

        default:
            return { ...state }
    }
}

export default leaveReducer