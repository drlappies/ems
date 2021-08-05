const { hashPassword, checkPassword } = require('../utils/hashPassword');

class UserController {
    constructor(userService) {
        this.userService = userService
    }

    getAllUser = async (req, res) => {
        try {
            const user = await this.userService.getAllUser()
            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    createUser = async (req, res) => {
        try {
            const { username, password, role } = req.body;
            if (!username || !password || !role) {
                return res.status(401).json({ error: 'Missing either username, password, or role.' })
            }
            const isUsernameTaken = await this.userService.checkDuplicate(username);
            if (isUsernameTaken.length >= 1) {
                return res.status(409).json({ error: 'Username is already taken.' })
            }
            const hashedPassword = await hashPassword(password);
            const { user } = await this.userService.createUser(username, hashedPassword, role);
            return res.status(200).json({
                success: `Successfully created user: ${user.username} id: ${user.id} role: ${user.role}`,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const { id } = req.params
            const hashedPassword = await hashPassword(password)
            const { user } = await this.userService.updateUser(id, username, hashedPassword, role);
            return res.status(200).json({
                success: `Successfully updated to: username: ${user.username} role: ${user.role}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(401).json({ error: 'Missing user id' })
            }
            const { user } = await this.userService.deleteUser(id);
            return res.status(200).json({
                success: `Successfully removed user: ${user.username} id: ${user.id}`
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err })
        }
    }
}

module.exports = UserController