import { methods } from '../axios/index'

const reimbursementApi = {
    postApply: {
        api: "/api/reimbursement/apply",
        method: methods.POST
    }
}

export default reimbursementApi