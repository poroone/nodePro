const Router = require("koa-router")
const {
    login,
    success
} = require("../controller/auth.controller.js")
const {
    verifyLogin,
    verifyAuth
} = require("../middleware/auth.middleware.js")

const authRouter = new Router()

authRouter.post("/login", verifyLogin, login)
authRouter.post("/Register", verifyAuth, success)

module.exports = authRouter