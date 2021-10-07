import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';
import punchReducer from "./punch";
import configReducer from "./config";
import deductionReducer from "./deduction";

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    punch: punchReducer,
    config: configReducer,
    deduction: deductionReducer,
})

export default reducer