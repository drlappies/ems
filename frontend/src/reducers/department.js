import { FETCH_DEPARTMENT } from "../types/department"

const initialState = {
    record: []
}

const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENT:
            return {
                ...state,
                record: action.payload.record
            }
        default:
            return state
    }
}

export default departmentReducer