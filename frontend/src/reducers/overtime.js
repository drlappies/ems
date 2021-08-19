import { CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT, FETCH_OVERTIME_RECORD, UPDATE_OVERTIME_RECORD } from "../types/overtime";

const initialState = {
    overtimeCheckIn: null,
    overtimeCheckOut: null,
    overtimeRecord: [],
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: 0,
}

const overtimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OVERTIME_STATUS:
            return {
                ...state,
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
        case FETCH_OVERTIME_RECORD:
            return {
                ...state,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength
            }
        case UPDATE_OVERTIME_RECORD:
            return {
                ...state,
                overtimeRecord: state.overtimeRecord.map(el => el.id === action.payload.id ? { ...el, from: action.payload.from, to: action.payload.to, status: action.payload.status } : el)
            }
        default:
            return state
    }
}

export default overtimeReducer