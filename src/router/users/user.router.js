const Router = require("koa-router")
const { create } = require("../../controller/users/user.controller")
const { verifyUser } = require("../../middleware/user/user.middleware")
const userRouter = new Router({ prefix: "/users" })
// 接口 
// verifyUser前置判断
// create执行 
userRouter.post("/", verifyUser, create)

module.exports = userRouter