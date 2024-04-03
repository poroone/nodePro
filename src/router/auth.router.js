const Router = require("koa-router")
const {
    login,
    seccess
} = require("../controller/auth.controller.js")
const {
    verifyLogin,
    verifyAuth
} = require("../middleware/auth.middleware.js")

const authRouter = new Router()

authRouter.post("/login", verifyLogin, login)
authRouter.post("/test", verifyAuth, seccess)

module.exports = authRouter