import services from '../services/index.service'
import jwt from 'jsonwebtoken'
import utils from '../utils/index.util'
import UserMiddleware from "./user.middleware";


const container = {
    user: new UserMiddleware({ utils, services, jwt })
}

export default container