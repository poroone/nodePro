const Router = require("koa-router")
const { create, userInfo } = require("../controller/user.controller")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")
const {
    verifyAuth,
    verifyPermission,
    VerifyLabel
} = require("../middleware/auth.middleware.js")
const userRouter = new Router({ prefix: "/users" })
// 接口 
// verifyUser前置判断
// create执行 
userRouter.post("/", verifyUser, handlePassword, create)
// info
userRouter.get("/userInfo/:userId", verifyAuth, userInfo)

module.exports = userRouter