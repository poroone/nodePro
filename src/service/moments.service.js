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
        try {
            const statement = `
       
				SELECT m.id id, m.context context, m.createAt createTime, m.updateAt updateTime,
                JSON_OBJECT('id', u.id, 'username', u.username) user,
                IF(COUNT(c.id),
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                            'id',c.id ,'content',c.content,'userId',c.user_id,'commentId',c.comment_id,'createTime',c.createAt,"username",JSON_OBJECT("id",cu.i"username",cu.username)
                    )
                ),
                NULL
                ) comments,
                IF(
                    COUNT(l.id),
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id',l.id ,'name',l.name
                        )
                    ),
                    NULL
                )  labels
                FROM moments m 
                LEFT JOIN users u ON m.user_id = u.id
                        LEFT JOIN comment c ON c.moment_id = m.id
                        LEFT JOIN users cu ON c.user_id = cu.id
                        LEFT JOIN moment_label ml ON m.id = ml.moment_id
                        LEFT JOIN label l ON  ml.label_id=l.id  
                        WHERE m.id = ?
                        GROUP BY m.id;
                        `
            console.log(MomentId)
            const [result] = await connection.execute(statement, [MomentId])
            console.log(result)
            return result[0]
        }
        catch (err) {
            console.log(err)
        }

    }

    async getMomentList(offset, size) {
        console.log("result")
        const statement = `SELECT m.id id, m.context context, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'username', u.username) user,
        ( SELECT COUNT(*) from comment c WHERE c.moment_id = m.id  ) commentCount,
        ( SELECT COUNT(*) from moment_label ml WHERE ml.moment_id = m.id  ) labelCount
        FROM moments m 
        LEFT JOIN users u ON m.user_id = u.id 
        LIMIT ?,?;`
        const [result] = await connection.execute(statement, [offset, size])
        console.log(result)
        return result
    }
    async setMomentUpdate(momentId, context) {
        const statement = `UPDATE moments SET context = ? WHERE id = ?`;
        console.log("123")
        const [result] = await connection.execute(statement, [context, momentId])
        console.log(result)
        return result
    }
    async removeMoment(momentId) {
        const statement = `DELETE FROM moments WHERE id = ?`;
        console.log(momentId, "***")
        const [result] = await connection.execute(statement, [momentId])
        console.log(result)
        return result[0]
    }
    async isMomentLabel(labelId, momentId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?`;
        const [result] = await connection.execute(statement, [momentId, labelId])
        console.log(result)
        return result[0] ? true : false
    }
    async setMomentLabel(labelId, momentId) {
        const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`;
        console.log(momentId, labelId, "132")
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result
    }

}

module.exports = new MomentService()