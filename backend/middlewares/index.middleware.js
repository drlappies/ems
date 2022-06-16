import services from '../services/index.service'
import jwt from 'jwt'
import UserMiddleware from "./user.middleware";


const container = {
    userMiddleware: new UserMiddleware({ jwt, services })
}

export default container