const connection = require("../app/database")
class autoService {
    async checkAll(tableName, momentId, id) {
        try {
            const statement = `SELECT * FROM ${tableName}  WHERE id = ? AND user_id= ?; `;
         
            const [result] = await connection.execute(statement, [momentId, id]);
            console.log(result)
            console.log(result.length)
            return result.length === 0 ? false : true
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new autoService()