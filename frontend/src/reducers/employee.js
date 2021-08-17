import { FETCH_EMPLOYEE } from '../types/employee'

const initialState = {
    record: [],
}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEE:
            return {
                ...state,
                record: action.payload.record
            }
        default:
            return state
    }
}

export default employeeReducer