import { FETCH_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE } from '../types/attendance'

const initialState = {
    record: [],
    pageLength: 0,
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0
}

const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ATTENDANCE:
            return {
                ...state,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd
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