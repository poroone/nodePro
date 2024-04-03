const connection = require("../app/database")

const sqlFragment = `SELECT m.id id, m.context context, m.createAt createTime, m.updateAt updateTime,
JSON_OBJECT('id', u.id, 'username', u.username) user
FROM moments m 
LEFT JOIN users u 
ON m.user_id = u.id`

class MomentService {
    async create(userId, context) {
        const statement = `INSERT INTO moments (context,user_id) VALUES (?,?);`
        const [result] = await connection.execute(statement, [context, userId])
        return result
    }
    async getMomentById(MomentId) {
        const statement = `${sqlFragment} WHERE m.id = ?;`
        const [result] = await connection.execute(statement, [MomentId])
        console.log(result)
        return result[0]
    }
    async getMomentList(offset, size) {
        const statement = `${sqlFragment} LIMIT ?,?;`

        const [result] = await connection.execute(statement, [offset, size])
        console.log(result)
        return result
    }
}

module.exports = new MomentService()