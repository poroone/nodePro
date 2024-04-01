const connection = require("../../app/database")
// 和数据库进行连接并且返回结果
class UserService {
    async create(user) {
        const { username, password } = user
        const statement = ` INSERT INTO users (username,password) VALUES(?,?);`
        // 讲user存储到数据库中
        const result = await connection.execute(statement, [username, password])
        return result
    }
}
module.exports = new UserService();