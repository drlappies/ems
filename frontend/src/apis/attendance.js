import { methods } from '../axios/index'

const attendanceApi = {
    getUserCheckInStatus: {
        api: "/api/attendance/user_check_in_status",
        method: methods.GET
    },
    postCheckIn: {
        api: "/api/attendance/check_in",
        method: methods.POST
    },
    postCheckOut: {
        api: "/api/attendance/check_out",
        method: methods.POST
    },
    getAttendance: {
        api: "/api/attendance",
        method: methods.GET
    },
    postAttendance: {
        api: "/api/attendance",
        method: methods.POST
    },
    getAttendanceById: {
        api: "/api/attendance/{{id}}",
        method: methods.GET
    },
    putAttendanceById: {
        api: "/api/attendance/{{id}}",
        method: methods.PUT
    },
    deleteAttendanceById: {
        api: "/api/attendance/{{id}}",
        method: methods.DELETE
    },
    batchUpdateAttendance: {
        api: "/api/attendance/batch_update",
        method: methods.POST
    },
    batchDeleteAttendance: {
        api: "/api/attendance/batch_delete",
        method: methods.POST
    },
}

export default attendanceApi