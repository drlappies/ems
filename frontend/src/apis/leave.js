import { methods } from '../axios/index'

const leaveApi = {
    postLeave: {
        api: "/api/leave",
        method: methods.POST
    },
    postApplyLeave: {
        api: "/api/leave/apply",
        method: methods.POST
    }
}

export default leaveApi