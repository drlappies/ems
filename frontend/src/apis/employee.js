import { methods } from '../axios/index'

const employeeApi = {
    getEmployee: {
        api: "/api/employee",
        method: methods.GET
    }
}

export default employeeApi