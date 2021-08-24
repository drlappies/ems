import { FETCH_DEPARTMENT, UPDATE_DEPARTMENT, FETCH_SPECIFIC_DEPARTMENT, CONFIRM_DEPARTMENT_UPDATE, DELETE_DEPARTMENT, RESET_DEPARTMENT } from "../types/department"

const initialState = {
    record: [],
    departmentId: "",
    departmentName: "",
    departmentDescription: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: ""
}

const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENT:
            return {
                ...state,
                record: action.payload.record,
                pageLength: action.payload.pageLength,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                currentPage: action.payload.currentPage
            }
        case UPDATE_DEPARTMENT:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case FETCH_SPECIFIC_DEPARTMENT:
            return {
                ...state,
                departmentId: action.payload.id,
                departmentName: action.payload.name,
                departmentDescription: action.payload.desc
            }
        case CONFIRM_DEPARTMENT_UPDATE:
            return {
                ...state,
                record: state.record.map(el => el.id === action.payload.id ? { ...el, name: action.payload.name, description: action.payload.desc } : el)
            }
        case DELETE_DEPARTMENT:
            return {
                ...state,
                record: state.record.filter(el => el.id !== action.payload.id)
            }
        case RESET_DEPARTMENT:
            return {
                ...state,
                departmentId: "",
                departmentName: "",
                departmentDescription: ""
            }
        default:
            return state
    }
}

export default departmentReducer