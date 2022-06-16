import bcrypt from 'bcrypt'
import PasswordUtil from './password.util'

const container = {
    password: new PasswordUtil({ salt: 10, bcrypt }),
}

export default container