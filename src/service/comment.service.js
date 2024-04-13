const connection = require("../app/database")

class CommentService {
    async create(content, moment_id, id) {
        try {
            const statement = `INSERT INTO comment (moment_id, content,user_id) VALUES ( ? , ? , ? );`
            console.log(content, moment_id, id)
            const result = await connection.execute(statement, [moment_id, content, id])
            console.log(result)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    async reply(content, moment_id, comment_id, id) {
        try {
            const statement = `INSERT INTO comment (moment_id, content,user_id,comment_id) VALUES ( ? , ? , ? , ? );`
            console.log(content, moment_id, id, comment_id)
            const result = await connection.execute(statement, [moment_id, content, id, comment_id])
            console.log(result)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    async update(content, comment_id) {
        try {
            const statement = `UPDATE comment SET content=? WHERE id=?;`
            console.log(content, comment_id)
            const result = await connection.execute(statement, [content, comment_id])
            console.log(result)
            return result
        } catch (err) {
            console.log(err)
        }
    }
    async remove(comment_id) {
        try {
            const statement = `DELETE FROM comment WHERE id =?`
            console.log(comment_id)
            const result = await connection.execute(statement, [comment_id])
            console.log(result, "------")
            return result
        } catch (err) {
            console.log(err)
        }
    }
    async getCommentByMomentId(momentId) {
        try {
            const statement = `SELECT c.id,c.content,c.comment_id commentID,c.createAt createTime ,
            JSON_OBJECT(
                'id',u.id,'username',u.username
            )
            FROM comment c
            LEFT JOIN users u ON c.user_id = u.id
            WHERE moment_id = ? `
            console.log(momentId)
            const [result] = await connection.execute(statement, [momentId])
            console.log(result, "------")
            return result
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new CommentService()