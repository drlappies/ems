import { CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT } from "../types/overtime";

const initialState = {
    overtimeCheckIn: null,
    overtimeCheckOut: null
}

const overtimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OVERTIME_STATUS:
            return {
                overtimeCheckIn: action.payload.overtimeCheckIn,
                overtimeCheckOut: action.payload.overtimeCheckOut
            }
        case CREATE_OVERTIME_TIMEIN:
            return {
                ...state,
                overtimeCheckIn: action.payload.overtimeCheckIn
            }
        case CREATE_OVERTIME_TIMEOUT:
            return {
                ...state,
                overtimeCheckOut: action.payload.overtimeCheckOut
            }
        default:
            return state
    }
}

export default overtimeReducer