import fetch from '../../axios'
import * as reimbAction from '../actions/reimbursement'
import reimbursementApi from '../../apis/reimbursement'

export function postApplyReimb(date, reason, amount) {
    return async (dispatch) => {
        dispatch(reimbAction.postApplyReimbursement())
        try {
            const data = { date, reason, amount }
            await fetch(reimbursementApi.postApply.api, reimbursementApi.postApply.method, { body: data })
            dispatch(reimbAction.postApplyReimbursementSuccess())
        } catch (error) {
            dispatch(reimbAction.postApplyReimbursementFailure())
        }
    }
}   