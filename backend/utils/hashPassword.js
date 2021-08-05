const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash
}

module.exports.checkPassword = async (plainPassword, hashedPassword) => {
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    return isValid
}