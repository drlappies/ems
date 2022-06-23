import { methods } from '../axios/index'

const userApi = {
    getUser: {
        api: "/api/user",
        method: methods.GET
    },
    getUserAttendance: {
        api: "/api/user/attendance",
        method: methods.GET
    },
    getUserLeave: {
        api: "/api/user/leave",
        method: methods.GET
    },
    getUserOvertime: {
        api: "/api/user/overtime",
        method: methods.GET
    },
    getUserPayroll: {
        api: "/api/user/payroll",
        method: methods.GET
    },
    getUserReimbursement: {
        api: "/api/user/reimbursement",
        method: methods.GET
    },
    getUserAllowance: {
        api: "/api/user/allowance",
        method: methods.GET
    },
    getUserBonus: {
        api: "/api/user/bonus",
        method: methods.GET
    },
    getUserDeduction: {
        api: '/api/user/deduction',
        method: methods.GET
    },
    getUserCheckInStatus: {
        api: '/api/user/check_in/status',
        method: methods.GET
    }
}

export default userApi