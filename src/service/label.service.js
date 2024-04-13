const connection = require("../app/database")
class LabelServer {
    async create(name) {
        const statement = `INSERT INTO label (name) VALUES(?)`
        const [result] = await connection.execute(statement, [name])
        console.log(result)
        return result
    }
    async isLabel(name) {
        const stateMent = ` SELECT * FROM label WHERE name=?;`
        const [result] = await connection.execute(stateMent, [name])
        console.log(result)
        return result[0]
    }
    async getLabels(limit, offset) {
        const stateMent = ` SELECT * FROM label LIMIT ?,?;`
        const [result] = await connection.execute(stateMent, [limit,offset])
        console.log(result)
        return result
    }

}

module.exports = new LabelServer()