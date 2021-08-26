import { FETCH_ALLOWANCE, FETCH_SPECIFIC_ALLOWANCE, UPDATE_ALLOWANCE, RESET_ALLOWANCE, ENTITLE_TO_ALLOWANCE, DISENTITLE_FROM_ALLOWANCE } from '../types/allowance'

const initialState = {
    record: [],
    entitledEmployee: [],
    notEntitledEmployee: [],
    allowanceId: "",
    allowanceName: "",
    allowanceDescription: "",
    allowanceAmount: "",
    allowanceStatus: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: 0,
    createAllowanceName: "",
    createAllowanceDescription: "",
    createAllowanceAmount: "",
    amountFrom: "",
    amountTo: "",
    status: "",
    search: "",
    interval: "monthly",
    rma: false,
    rate: "0"
}

const allowanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALLOWANCE:
            return {
                ...state,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength
            }
        case FETCH_SPECIFIC_ALLOWANCE:
            return {
                ...state,
                entitledEmployee: action.payload.entitledEmployee,
                notEntitledEmployee: action.payload.notEntitledEmployee,
                allowanceId: action.payload.allowanceId,
                allowanceDescription: action.payload.allowanceDescription,
                allowanceAmount: action.payload.allowanceAmount,
                allowanceStatus: action.payload.allowanceStatus,
                allowanceName: action.payload.allowanceName
            }
        case UPDATE_ALLOWANCE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case RESET_ALLOWANCE:
            return {
                ...state,
                entitledEmployee: [],
                notEntitledEmployee: [],
                allowanceId: "",
                allowanceName: "",
                allowanceDescription: "",
                allowanceAmount: "",
                allowanceStatus: ""
            }
        case ENTITLE_TO_ALLOWANCE:
            return {
                ...state,
                entitledEmployee: [...state.entitledEmployee, {
                    id: action.payload.id,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname
                }],
                notEntitledEmployee: state.notEntitledEmployee.filter(el => el.id !== action.payload.id)
            }
        case DISENTITLE_FROM_ALLOWANCE:
            return {
                ...state,
                entitledEmployee: state.entitledEmployee.filter(el => el.id !== action.payload.id),
                notEntitledEmployee: [...state.notEntitledEmployee, {
                    id: action.payload.id,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname
                }]
            }
        default:
            return state
    }
}

export default allowanceReducer