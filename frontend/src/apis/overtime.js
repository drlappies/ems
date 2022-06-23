import { methods } from '../axios/index'

const overtimeApi = {
    getUserOTCheckInStatus: {
        api: "/api/overtime/user_check_in_status",
        method: methods.GET
    },
    postOvertimeCheckIn: {
        api: "/api/overtime/check_in",
        method: methods.POST
    },
    postOvertimeCheckOut: {
        api: "/api/overtime/check_out",
        method: methods.POST
    },
    getOvertimeList: {
        api: "/api/overtime",
        method: methods.GET
    },
    postOvertime: {
        api: "/api/overtime",
        method: methods.POST
    },
    putOvertimeById: {
        api: "/api/overtime/{{id}}",
        method: methods.PUT
    }
}

export default overtimeApi