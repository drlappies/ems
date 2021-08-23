import { FETCH_POSITION } from "../types/position"

const initialState = {
    record: []
}

const positionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSITION:
            return {
                ...state,
                record: action.payload.record
            }
        default:
            return state
    }
}

export default positionReducer