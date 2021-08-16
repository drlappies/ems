const initialState = {
    employee: [],
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH':
            return {
                employee: action.payload
            }
        default:
            return state
    }
}

export default dataReducer