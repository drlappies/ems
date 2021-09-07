import { ADD_TO_DEPARTMENT_SELECTED, FETCH_DEPARTMENT, UPDATE_DEPARTMENT, CONFIRM_DEPARTMENT_UPDATE, RESET_DEPARTMENT, TOGGLE_CREATE_DEPARTMENT, TOGGLE_DEPARTMENT_FILTERING, RESET_DEPARTMENT_QUERY, FETCH_DEPARTMENT_BY_QUERY, TOGGLE_DEPARTMENT_UPDATING, TOGGLE_DEPARTMENT_DELETING, DELETE_DEPARTMENT, ADD_ALL_TO_DEPARTMENT_SELECTED, REMOVE_FROM_DEPARTMENT_SELECTED, REMOVE_ALL_FROM_DEPARTMENT_SELECTED, TOGGLE_DEPARTMENT_BATCH_DELETING, BATCH_DELETE_DEPARTMENT } from "../types/department"

const initialState = {
    record: [],
    departmentId: "",
    departmentName: "",
    departmentDesc: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    currentLimit: 10,
    pageLength: "",
    isCreating: false,
    createDepartmentName: "",
    createDepartmentDesc: "",
    queryDepartmentName: "",
    isFiltering: false,
    isUpdating: false,
    isDeleting: false,
    selectedRecord: [],
    isBatchDeleting: false
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
                currentPage: action.payload.currentPage,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_DEPARTMENT:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case CONFIRM_DEPARTMENT_UPDATE:
            return {
                ...state,
                record: state.record.map(el => el.id === action.payload.id ? { ...el, name: action.payload.name, description: action.payload.desc } : el),
                isUpdating: action.payload.isUpdating
            }
        case RESET_DEPARTMENT:
            return {
                ...state,
                departmentId: "",
                departmentName: "",
                departmentDescription: ""
            }
        case TOGGLE_CREATE_DEPARTMENT:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                createDepartmentName: "",
                createDepartmentDesc: ""
            }
        case TOGGLE_DEPARTMENT_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
            }
        case RESET_DEPARTMENT_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                queryDepartmentName: action.payload.queryDepartmentName,
                currentPage: action.payload.currentPage,
                currentLimit: action.payload.currentLimit,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd
            }
        case FETCH_DEPARTMENT_BY_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentLimit: action.payload.currentLimit,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd
            }
        case TOGGLE_DEPARTMENT_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                departmentId: action.payload.departmentId,
                departmentName: action.payload.departmentName,
                departmentDesc: action.payload.departmentDesc
            }
        case TOGGLE_DEPARTMENT_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                departmentId: action.payload.departmentId,
                departmentName: action.payload.departmentName,
                departmentDesc: action.payload.departmentDesc
            }
        case ADD_TO_DEPARTMENT_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_DEPARTMENT_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_TO_DEPARTMENT_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case REMOVE_ALL_FROM_DEPARTMENT_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_DEPARTMENT_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case BATCH_DELETE_DEPARTMENT:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                pageLength: action.payload.pageLength,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                currentPage: action.payload.currentPage,
                currentLimit: action.payload.currentLimit
            }
        default:
            return state
    }
}

export default departmentReducer