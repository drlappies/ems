import { LOGIN, LOGOUT } from '../types/auth'

const initialState = {
    isAuthenticated: false,
    id: "",
    department: "",
    position: "",
    address: "",
    phone_number: "",
    emergency_contact_person: "",
    emergency_contact_number: "",
    onboard_date: "",
    role: "",
    start_hour: "",
    end_hour: "",
    ot_pay_entitled: "",
    ot_hourly_salary: "",
    annual_leave_count: "",
    username: "",
    firstname: "",
    lastname: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                isAuthenticated: action.payload.isAuthenticated,
                id: action.payload.id,
                department: action.payload.department,
                position: action.payload.position,
                address: action.payload.address,
                phone_number: action.payload.phone_number,
                emergency_contact_person: action.payload.emergency_contact_person,
                emergency_contact_number: action.payload.emergency_contact_number,
                onboard_date: action.payload.onboard_date,
                role: action.payload.role,
                start_hour: action.payload.start_hour,
                end_hour: action.payload.end_hour,
                ot_pay_entitled: action.payload.ot_pay_entitled,
                ot_hourly_salary: action.payload.ot_hourly_salary,
                annual_leave_count: action.payload.annual_leave_count,
                username: action.payload.username,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname
            }
        case LOGOUT:
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