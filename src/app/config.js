const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")

const TOKEN_PRIVATE = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"))
const TOKEN_PUBLIC = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"))
dotenv.config()

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD,
} = process.env

module.exports.TOKEN_PRIVATE = TOKEN_PRIVATE;
module.exports.TOKEN_PUBLIC = TOKEN_PUBLIC;