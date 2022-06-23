const reimbursementActionTypes = {
    POST_APPLY_REIMBURSEMENT: "POST_APPLY_REIMBURSEMENT",
    POST_APPLY_REIMBURSEMENT_SUCCESS: "POST_APPLY_REIMBURSEMENT_SUCCESS",
    POST_APPLY_REIMBURSEMENT_FAILURE: "POST_APPLY_REIMBURSEMENT_FAILURE"
}

export default reimbursementActionTypes

export function postApplyReimbursement(payload) {
    return {
        type: reimbursementActionTypes.POST_APPLY_REIMBURSEMENT,
        payload
    }
}

export function postApplyReimbursementSuccess(payload) {
    return {
        type: reimbursementActionTypes.POST_APPLY_REIMBURSEMENT_SUCCESS,
        payload
    }
}

export function postApplyReimbursementFailure(payload) {
    return {
        type: reimbursementActionTypes.POST_APPLY_REIMBURSEMENT_FAILURE,
        payload
    }
}