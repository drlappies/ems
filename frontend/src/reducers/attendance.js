import { FETCH_ATTENDANCE, NEXT_ATTENDANCE, PREVIOUS_ATTENDANCE, TO_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE } from '../types/attendance'

const initialState = {
    record: [],
    pageLength: [],
    currentPage: 0,
    currentRange: [0, 1, 2]
}

const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ATTENDANCE:
            return {
                ...state,
                record: action.payload.record,
                pageLength: Array.from(Array(Math.round(action.payload.count / 15)).keys()),
                currentPage: parseInt(action.payload.page),
            }
        case NEXT_ATTENDANCE:
            return {
                ...state,
                record: action.payload.record,
                pageLength: Array.from(Array(Math.round(action.payload.count / 15)).keys()),
                currentPage: parseInt(action.payload.page),
                currentRange: state.currentRange.map(el => el + 1)
            }
        case PREVIOUS_ATTENDANCE:
            return {
                ...state,
                record: action.payload.record,
                pageLength: Array.from(Array(Math.round(action.payload.count / 15)).keys()),
                currentPage: parseInt(action.payload.page),
                currentRange: state.currentRange.map(el => el - 1)
            }
        case TO_ATTENDANCE:
            return {
                ...state,
                record: action.payload.record,
                pageLength: Array.from(Array(Math.round(action.payload.count / 15)).keys()),
                currentPage: parseInt(action.payload.page),
                currentRange: [action.payload.to, action.payload.to + 1, action.payload.to + 2]
            }
        case DELETE_ATTENDANCE:
            return {
                ...state,
                record: state.record.filter(el => el.id !== action.payload.id),
                pageLength: state.record.filter(el => el.id !== action.payload.id).length / 15
            }
        case UPDATE_ATTENDANCE:
            return {
                ...state,
                record: state.record.map(el => el.id === action.payload.id ? { ...el, check_in: action.payload.check_in, check_out: action.payload.check_out } : el)
            }
        default:
            return state
    }
}

export default attendanceReducer