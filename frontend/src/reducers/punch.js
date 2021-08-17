import { CHECK_IN, CHECK_OUT, FETCH_PUNCH_STATUS } from '../types/punch'

const initialState = {
    checkInTime: null,
    checkOutTime: null,
    status: null
}

const punchReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_IN:
            return {
                ...state,
                checkInTime: action.payload.checkInTime,
                status: action.payload.status
            }
        case CHECK_OUT:
            return {
                ...state,
                checkOutTime: action.payload.checkOutTime
            }
        case FETCH_PUNCH_STATUS:
            return {
                ...state,
                checkInTime: action.payload.checkInTime,
                checkOutTime: action.payload.checkOutTime,
                status: action.payload.status
            }
        default:
            return state
    }
}

export default punchReducer