import { FETCH_ALLOWANCE, UPDATE_ALLOWANCE, ENTITLE_TO_ALLOWANCE, DISENTITLE_FROM_ALLOWANCE, FETCH_ALLOWANCE_BY_ENTRIES, TOGGLE_ALLOWANCE_FILTERING, RESET_ALLOWANCE_QUERY, FETCH_ALLOWANCE_BY_QUERY, TOGGLE_ALLOWANCE_CREATING, CREATE_ALLOWANCE, TOGGLE_ALLOWANCE_UPDATING, CONFIRM_UPDATE_ALLOWANCE, TOGGLE_ALLOWANCE_DELETING, DELETE_ALLOWANCE, ADD_TO_SELECTED_ALLOWANCE, REMOVE_FROM_SELECTED_ALLOWANCE, ADD_ALL_TO_SELECTED_ALLOWANCE, REMOVE_ALL_FROM_SELECTED_ALLOWANCE, TOGGLE_ALLOWANCE_BATCH_DELETING, TOGGLE_ALLOWANCE_BATCH_UPDATING, BATCH_UPDATE_ALLOWANCE, BATCH_DELETE_ALLOWANCE, TOGGLE_ALLOWANCE_MANAGING } from "../types/allowance";
import { popErrorMessage, popSuccessMessage } from "./ui";
import axios from 'axios';

export const fetchAllowance = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/allowance')
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateAllowance = (e, result) => {
    return (dispatch) => {
        let { name, value } = result || e.target

        if (e.target.type === 'checkbox') {
            value = e.target.checked
        }

        if (name === 'rate' || name === 'allowanceRequiredAttendanceRate' || name === 'updateAllowanceRequiredAttendanceRate') {
            if (e.target.value > 100) value = 100;
            if (e.target.value < 1) value = 1;
        }

        dispatch({
            type: UPDATE_ALLOWANCE,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const confirmAllowanceUpdate = (allowanceId, allowanceName, allowanceDescription, allowanceAmount, allowanceStatus, allowanceMinimumAttendanceRequired, allowanceRequiredAttendanceRate) => {
    return async (dispatch) => {
        try {
            const body = {
                name: allowanceName,
                description: allowanceDescription,
                amount: allowanceAmount,
                status: allowanceStatus,
                minimum_attendance_required: allowanceMinimumAttendanceRequired,
                required_attendance_rate: allowanceRequiredAttendanceRate
            }
            const res = await axios.put(`/api/allowance/${allowanceId}`, body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch({
                type: CONFIRM_UPDATE_ALLOWANCE,
                payload: {
                    isUpdating: false,
                    allowanceId: res.data.allowance.id,
                    allowanceName: res.data.allowance.name,
                    allowanceAmount: res.data.allowance.amount,
                    allowanceStatus: res.data.allowance.status,
                    allowanceDescription: res.data.allowance.description
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const deleteAllowance = (id, currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/allowance/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/allowance', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })

            dispatch({
                type: DELETE_ALLOWANCE,
                payload: {
                    isDeleting: false,
                    record: res2.data.allowance,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const addToEntitleList = (employeeId, allowanceId, firstname, lastname) => {
    return async (dispatch) => {
        try {
            const body = { employeeId: employeeId }
            await axios.post(`/api/allowance/entitlement/${allowanceId}`, body)
            dispatch({
                type: ENTITLE_TO_ALLOWANCE,
                payload: {
                    id: employeeId,
                    firstname: firstname,
                    lastname: lastname
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const removeFromEntitleList = (employeeId, allowanceId, firstname, lastname) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/allowance/entitlement/${allowanceId}/employee/${employeeId}`)
            dispatch({
                type: DISENTITLE_FROM_ALLOWANCE,
                payload: {
                    id: employeeId,
                    firstname: firstname,
                    lastname: lastname
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleManaging = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/api/allowance/${id}`)
            dispatch({
                type: TOGGLE_ALLOWANCE_MANAGING,
                payload: {
                    isManaging: id ? true : false,
                    allowanceId: id ? res.data.allowance.id : "",
                    allowanceName: id ? res.data.allowance.name : "",
                    allowanceDescription: id ? res.data.allowance.description : "",
                    allowanceAmount: id ? res.data.allowance.amount : "",
                    allowanceStatus: id ? res.data.allowance.status : "",
                    entitledEmployee: id ? res.data.allowance_employee : [],
                    notEntitledEmployee: id ? res.data.employee : []
                }
            })
        } catch (err) {
            console.log(err)
        }

    }
}

export const gotoNextAllowancePage = (page, pageCount, limit, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageCount) return;
            const res = await axios.get('/api/allowance', {
                params: {
                    page: page + limit,
                    limit: limit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const gotoPreviousAllowancePage = (page, limit, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/api/allowance', {
                params: {
                    page: page - limit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE,
                payload: {
                    record: res.data.allowance,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const createAllowance = (name, desc, amount, rma, rate, currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            const body = {
                name: name,
                description: desc,
                amount: amount,
                rma: rma,
                rate: rate
            }
            const res = await axios.post('/api/allowance', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/allowance', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })

            dispatch({
                type: CREATE_ALLOWANCE,
                payload: {
                    isCreating: false,
                    record: res2.data.allowance,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    createAllowanceName: "",
                    createAllowanceDescription: "",
                    createAllowanceAmount: "",
                    rma: false,
                    rate: "1"
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchAllowanceByQuery = (currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/allowance', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })
            dispatch({
                type: FETCH_ALLOWANCE_BY_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.allowance,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const handleEntriesChange = (limit, currentPage, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/allowance', {
                params: {
                    page: currentPage,
                    limit: limit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })

            dispatch({
                type: FETCH_ALLOWANCE_BY_ENTRIES,
                payload: {
                    record: res.data.allowance,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_ALLOWANCE_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const resetAllowanceQuery = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/allowance')
            dispatch({
                type: RESET_ALLOWANCE_QUERY,
                payload: {
                    isFiltering: false,
                    queryText: "",
                    queryAmountFrom: "",
                    queryAmountTo: "",
                    queryStatus: "",
                    queryIsAttendRequired: "",
                    queryRequiredAttendRateFrom: "",
                    queryRequiredAttendRateTo: "",
                    record: res.data.allowance,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_ALLOWANCE_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/api/allowance/${id}`)
            dispatch({
                type: TOGGLE_ALLOWANCE_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    allowanceId: id ? res.data.allowance.id : "",
                    allowanceName: id ? res.data.allowance.name : "",
                    allowanceDescription: id ? res.data.allowance.description : "",
                    allowanceAmount: id ? res.data.allowance.amount : "",
                    allowanceStatus: id ? res.data.allowance.status : "",
                    entitledEmployee: id ? res.data.allowance_employee : [],
                    notEntitledEmployee: id ? res.data.employee : [],
                    allowanceMinimumAttendanceRequired: id ? res.data.allowance.minimum_attendance_required : false,
                    allowanceRequiredAttendanceRate: id ? res.data.allowance.required_attendance_rate : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/api/allowance/${id}`)
            dispatch({
                type: TOGGLE_ALLOWANCE_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    allowanceId: id ? res.data.allowance.id : "",
                    allowanceName: id ? res.data.allowance.name : "",
                    allowanceDescription: id ? res.data.allowance.description : "",
                    allowanceAmount: id ? res.data.allowance.amount : "",
                    allowanceStatus: id ? res.data.allowance.status : "",
                    entitledEmployee: id ? res.data.allowance_employee : [],
                    notEntitledEmployee: id ? res.data.employee : [],
                    allowanceMinimumAttendanceRequired: id ? res.data.allowance.minimum_attendance_required : false,
                    allowanceRequiredAttendanceRate: id ? res.data.allowance.required_attendance_rate : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleSelect = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_SELECTED_ALLOWANCE : REMOVE_FROM_SELECTED_ALLOWANCE,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_SELECTED_ALLOWANCE : REMOVE_ALL_FROM_SELECTED_ALLOWANCE,
            payload: {
                id: e.target.checked ? rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_ALLOWANCE_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_ALLOWANCE_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const batchUpdateAllowance = (selectedRecord, updateAllowanceAmount, updateAllowanceStatus, updateAllowanceMinimumAttendanceRequired, updateAllowanceRequiredAttendanceRate) => {
    return async (dispatch) => {
        try {
            const body = {
                id: selectedRecord,
                amount: updateAllowanceAmount,
                status: updateAllowanceStatus,
                minimum_attendance_required: updateAllowanceMinimumAttendanceRequired,
                required_attendance_rate: updateAllowanceRequiredAttendanceRate
            }

            const res = await axios.put('/api/allowance', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch({
                type: BATCH_UPDATE_ALLOWANCE,
                payload: {
                    update: res.data.allowance,
                    updateAllowanceAmount: "",
                    updateAllowanceStatus: "",
                    updateAllowanceMinimumAttendanceRequired: "",
                    updateAllowanceRequiredAttendanceRate: ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const batchDeleteAllowance = (selectedRecord, currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryStatus, queryIsAttendRequired, queryRequiredAttendRateFrom, queryRequiredAttendRateTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/allowance/${selectedRecord.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/allowance', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus,
                    isAttendRequired: queryIsAttendRequired,
                    requiredAttendRateFrom: queryRequiredAttendRateFrom,
                    requiredAttendRateTo: queryRequiredAttendRateTo
                }
            })

            dispatch({
                type: BATCH_DELETE_ALLOWANCE,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.allowance,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}