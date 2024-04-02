const connection = require("../../app/database")
// 和数据库进行连接并且返回结果
class UserService {
    // 创建用户
    async create(user) {
        const { username, password } = user
        const statement = `INSERT INTO users (username,password) VALUES (?,?)`
        // 讲user存储到数据库中
        console.log(username, password)
        const result = await connection.execute(statement, [username, password])

        console.log(result, "****")

        return result[0]
    }
    // 查询是否创建过
    async getUserByName(name) {
        const statement = ` SELECT * FROM users WHERE username = ?;`
        const result = await connection.execute(statement, [name])
        console.log(result[0])
        return result[0]
    }
}
module.exports = new UserService();