import { FETCH_POSITION, FETCH_SPECIFIC_POSITION, RESET_POSITION, UPDATE_POSITION, DELETE_POSITION } from "../types/position"

const initialState = {
    record: [],
    positionId: "",
    positionName: "",
    createPositionName: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: ""
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
                pageLength: action.payload.pageLength
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
                record: state.record.filter(el => el.id !== action.payload.positionId)
            }
        default:
            return state
    }
}

export default positionReducer