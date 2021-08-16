const initialState = {
    isAuthenticated: false,
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    role: '',
    ot_entitled: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                id: action.payload.id,
                username: action.payload.username,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                role: action.payload.role,
                ot_entitled: action.payload.role,
                isAuthenticated: true
            }
        case 'LOGOUT':
            return {
                username: '',
                firstname: '',
                lastname: '',
                role: '',
                ot_entitled: '',
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default authReducer