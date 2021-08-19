import { TOGGLE_CONFIG } from "../types/config";

export const toggleConfig = (configType, configFunc) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_CONFIG,
            payload: {
                configType: configType || "",
                configFunc: configFunc || ""
            }
        })
    }
}