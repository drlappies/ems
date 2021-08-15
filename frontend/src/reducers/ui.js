const initialState = {
    message: '',
    type: '',
    visible: false
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                message: action.payload,
                type: 'success',
                visible: true
            }
        case 'ERROR':
            return {
                message: action.payload,
                type: 'error',
                visible: true
            }
        case 'DISMISS':
            return {
                message: '',
                type: '',
                visible: false
            }
        default:
            return state
    }
}

export default uiReducer