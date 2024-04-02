const Router = require("koa-router")
const {
    login
} = require("../controller/auth.controller.js")
const {
    verifyLogin
} = require("../middleware/auth.middleware.js")

const authRouter = new Router()

authRouter.post("/login", verifyLogin, login)


module.exports = authRouter