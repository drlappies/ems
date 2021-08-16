const initialState = {
    checkInTime: null,
    checkOutTime: null,
    status: null
}

const punchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECKIN':
            return {
                ...state,
                checkInTime: action.payload
            }
        case 'CHECKOUT':
            return {
                ...state,
                checkOutTime: action.payload
            }
        case 'STATUS':
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