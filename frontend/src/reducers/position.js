import { FETCH_POSITION, FETCH_SPECIFIC_POSITION, RESET_POSITION, UPDATE_POSITION, DELETE_POSITION, TOGGLE_POSITION_CREATING, ADD_TO_POSITION_SELECTED, REMOVE_FROM_POSITION_SELECTED, ADD_ALL_TO_POSITION_SELECTED, REMOVE_ALL_FROM_POSITION_SELECTED, TOGGLE_POSITION_BATCH_DELETING, TOGGLE_POSITION_UPDATING, TOGGLE_POSITION_DELETING, TOGGLE_POSITION_FILTERING, RESET_POSITION_QUERY, FETCH_POSITION_BY_QUERY, UPDATE_POSITION_RECORD, BATCH_DELETE_POSITION, CREATE_POSITION } from "../types/position"

const initialState = {
    record: [],
    positionId: "",
    positionName: "",
    createPositionName: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    currentLimit: 10,
    pageLength: "",
    isCreating: false,
    selectedRecord: [],
    isBatchDeleting: false,
    isDeleting: false,
    queryText: "",
    isFiltering: false,
    isUpdating: false
}

const positionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSITION:
            return {
                ...state,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case FETCH_SPECIFIC_POSITION:
            return {
                ...state,
                positionId: action.payload.positionId,
                positionName: action.payload.positionName
            }
        case RESET_POSITION:
            return {
                ...state,
                positionId: "",
                positionName: ""
            }
        case UPDATE_POSITION:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case DELETE_POSITION:
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
        case TOGGLE_POSITION_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                createPositionName: ""
            }
        case ADD_TO_POSITION_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_POSITION_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_TO_POSITION_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case REMOVE_ALL_FROM_POSITION_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_POSITION_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case TOGGLE_POSITION_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                positionName: action.payload.positionName,
                positionId: action.payload.positionId
            }
        case TOGGLE_POSITION_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                positionName: action.payload.positionName,
                positionId: action.payload.positionId
            }
        case TOGGLE_POSITION_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case RESET_POSITION_QUERY:
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
        case FETCH_POSITION_BY_QUERY:
            return {
                ...state,
                isFiltering: false,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_POSITION_RECORD:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case BATCH_DELETE_POSITION:
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
        case CREATE_POSITION:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        default:
            return state
    }
}

export default positionReducer