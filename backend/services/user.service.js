class UserService {
    constructor(knex) {
        this.knex = knex
    }

    getAllUser = async () => {
        const user = await this.knex.select().from('users');
        return user
    }

    createUser = async (username, password, role) => {
        const [user] = await this.knex.insert({
            username: username,
            password: password,
            role: role,
        }).into('users').returning(['id', 'username', 'role']);
        return { user: user }
    }

    updateUser = async (id, username, password, role) => {
        const [user] = await this.knex('users').where('id', id).update({
            username: username,
            password: password,
            role: role
        }, ['id', 'username', 'role'])
        return { user: user }
    }

    deleteUser = async (id) => {
        const [user] = await this.knex('users').where('id', id).del(['id', 'username'])
        return { user: user }
    }

    checkDuplicate = async (username) => {
        const isUsernameTaken = await this.knex('users').where('username', username);
        return isUsernameTaken
    }
}

module.exports = UserService
