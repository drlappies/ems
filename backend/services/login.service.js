class LoginService {
    constructor(knex) {
        this.knex = knex
    }

    getUserByUsername = async (username) => {
        const [user] = await this.knex('employee')
            .where('username', username)
        return user
    }
}

module.exports = LoginService