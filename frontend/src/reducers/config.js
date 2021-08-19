import { TOGGLE_CONFIG } from "../types/config"

const initialState = {
    isConfigOpen: false,
    configType: "",
}

const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CONFIG:
            return {
                ...state,
                isConfigOpen: !state.isConfigOpen,
                configType: action.payload.configType,
            }
        default:
            return state
    }
}

export default configReducer