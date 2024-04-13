const connection = require("../app/database")
class FileService {
    async createAvatar(filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);`
        const result = await connection.execute(statement, [filename, mimetype, size, userId])
        console.log(result)
        return result
    }
    async getAvatarInfo(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id=?`;
        const [result] = await connection.execute(statement, [userId])
        console.log(result[0])
        return result[0]
    }
    async updateAvatarUser(userId, avatarURL) {
        const statement = `UPDATE users SET avatar_url=?  WHERE id=?`;
        const [result] = await connection.execute(statement, [avatarURL, userId])
        console.log(result)
        return result
    }
}

module.exports = new FileService()