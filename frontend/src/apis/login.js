import { methods } from '../axios/index'

const loginApi = {
    postLogin: {
        api: "/api/login",
        method: methods.POST
    }
}

export default loginApi