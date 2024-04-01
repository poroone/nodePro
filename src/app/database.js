// 数据库
const mysql = require("mysql2")
const config = require("./config")
const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_ROOT,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
})

connections.getConnection((err, connection) => {
    connection.connect((err) => {
        if (err) {
            console.log("连接失败", err)
        } else {
            console.log("连接成功")
        }

    })
});

module.exports = connections.promise()