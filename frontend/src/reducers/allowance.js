import { TOGGLE_ALLOWANCE_BATCH_UPDATING, TOGGLE_ALLOWANCE_BATCH_DELETING, FETCH_ALLOWANCE, UPDATE_ALLOWANCE, ENTITLE_TO_ALLOWANCE, DISENTITLE_FROM_ALLOWANCE, FETCH_ALLOWANCE_BY_ENTRIES, TOGGLE_ALLOWANCE_FILTERING, RESET_ALLOWANCE_QUERY, FETCH_ALLOWANCE_BY_QUERY, TOGGLE_ALLOWANCE_CREATING, CREATE_ALLOWANCE, TOGGLE_ALLOWANCE_UPDATING, CONFIRM_UPDATE_ALLOWANCE, TOGGLE_ALLOWANCE_DELETING, DELETE_ALLOWANCE, ADD_TO_SELECTED_ALLOWANCE, REMOVE_FROM_SELECTED_ALLOWANCE, ADD_ALL_TO_SELECTED_ALLOWANCE, REMOVE_ALL_FROM_SELECTED_ALLOWANCE, BATCH_UPDATE_ALLOWANCE, BATCH_DELETE_ALLOWANCE, TOGGLE_ALLOWANCE_MANAGING } from '../types/allowance'

const initialState = {
    record: [],
    entitledEmployee: [],
    notEntitledEmployee: [],
    allowanceId: "",
    allowanceName: "",
    allowanceDescription: "",
    allowanceAmount: "",
    allowanceStatus: "",
    allowanceMinimumAttendanceRequired: false,
    allowanceRequiredAttendanceRate: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    currentLimit: 10,
    pageLength: 0,
    createAllowanceName: "",
    createAllowanceDescription: "",
    createAllowanceAmount: "",
    rma: false,
    rate: "1",
    queryText: "",
    queryAmountFrom: "",
    queryAmountTo: "",
    queryStatus: "",
    queryIsAttendRequired: "",
    queryRequiredAttendRateFrom: "",
    queryRequiredAttendRateTo: "",
    isFiltering: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    selectedRecord: [],
    isBatchDeleting: false,
    isBatchUpdating: false,
    updateAllowanceAmount: "",
    updateAllowanceStatus: "",
    updateAllowanceMinimumAttendanceRequired: "",
    updateAllowanceRequiredAttendanceRate: "",
    isManaging: false
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
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_ALLOWANCE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
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
        case FETCH_ALLOWANCE_BY_ENTRIES:
            return {
                ...state,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case FETCH_ALLOWANCE_BY_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_ALLOWANCE_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case RESET_ALLOWANCE_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                queryText: action.payload.queryText,
                queryAmountFrom: action.payload.queryAmountFrom,
                queryAmountTo: action.payload.queryAmountTo,
                queryStatus: action.payload.queryStatus,
                queryIsAttendRequired: action.payload.queryIsAttendRequired,
                queryRequiredAttendRateFrom: action.payload.queryRequiredAttendRateFrom,
                queryRequiredAttendRateTo: action.payload.queryRequiredAttendRateTo,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_ALLOWANCE_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case CREATE_ALLOWANCE:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                createAllowanceName: action.payload.createAllowanceName,
                createAllowanceDescription: action.payload.createAllowanceDescription,
                createAllowanceAmount: action.payload.createAllowanceAmount,
                rma: action.payload.rma,
                rate: action.payload.rate,
            }
        case TOGGLE_ALLOWANCE_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                entitledEmployee: action.payload.entitledEmployee,
                notEntitledEmployee: action.payload.notEntitledEmployee,
                allowanceId: action.payload.allowanceId,
                allowanceDescription: action.payload.allowanceDescription,
                allowanceAmount: action.payload.allowanceAmount,
                allowanceStatus: action.payload.allowanceStatus,
                allowanceName: action.payload.allowanceName,
                allowanceMinimumAttendanceRequired: action.payload.allowanceMinimumAttendanceRequired,
                allowanceRequiredAttendanceRate: action.payload.allowanceRequiredAttendanceRate,
            }
        case CONFIRM_UPDATE_ALLOWANCE:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: state.record.map(el => el.id === action.payload.allowanceId ?
                    {
                        ...el,
                        name: action.payload.allowanceName,
                        description: action.payload.allowanceDescription,
                        amount: action.payload.allowanceAmount,
                        status: action.payload.allowanceStatus
                    } : el)
            }
        case TOGGLE_ALLOWANCE_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                allowanceId: action.payload.allowanceId,
                allowanceName: action.payload.allowanceName,
                allowanceDescription: action.payload.allowanceDescription,
                allowanceAmount: action.payload.allowanceAmount,
                allowanceStatus: action.payload.allowanceStatus,
                entitledEmployee: action.payload.entitledEmployee,
                notEntitledEmployee: action.payload.notEntitledEmployee,
                allowanceMinimumAttendanceRequired: action.payload.allowanceMinimumAttendanceRequired,
                allowanceRequiredAttendanceRate: action.payload.allowanceRequiredAttendanceRate
            }
        case DELETE_ALLOWANCE:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case ADD_TO_SELECTED_ALLOWANCE:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_SELECTED_ALLOWANCE:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_TO_SELECTED_ALLOWANCE:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case REMOVE_ALL_FROM_SELECTED_ALLOWANCE:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_ALLOWANCE_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }
        case TOGGLE_ALLOWANCE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case BATCH_UPDATE_ALLOWANCE:
            return {
                ...state,
                record: state.record.map((el, i) => {
                    if (el.id === action.payload.update[i].id) {
                        return {
                            ...el,
                            status: action.payload.update[i].status,
                            amount: action.payload.update[i].amount,
                        }
                    } else {
                        return el
                    }
                }),
                updateAllowanceAmount: action.payload.updateAllowanceAmount,
                updateAllowanceStatus: action.payload.updateAllowanceStatus,
                updateAllowanceMinimumAttendanceRequired: action.payload.updateAllowanceMinimumAttendanceRequired,
                updateAllowanceRequiredAttendanceRate: action.payload.updateAllowanceRequiredAttendanceRate
            }

        case BATCH_DELETE_ALLOWANCE:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_ALLOWANCE_MANAGING:
            return {
                ...state,
                isManaging: action.payload.isManaging,
                allowanceId: action.payload.allowanceId,
                allowanceName: action.payload.allowanceName,
                allowanceDescription: action.payload.allowanceDescription,
                allowanceAmount: action.payload.allowanceAmount,
                allowanceStatus: action.payload.allowanceStatus,
                entitledEmployee: action.payload.entitledEmployee,
                notEntitledEmployee: action.payload.notEntitledEmployee
            }
        default:
            return state
    }
}

export default allowanceReducer