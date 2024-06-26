const errorType = require("../constents/error-type")
const service = require("../service/user.service")
const md5 = require("../utils/passwordHandle")

const verifyUser = async (ctx, next) => {
    // 1.获取用户名密码
    const { username, password } = ctx.request.body
    // 判断用户名或者密码不能为空

    if (!username || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }
    // 判断注册的用户名是否没有被注册过
    const result = await service.getUserByName(username);

    if (result.length) {
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit("error", error, ctx)
    }

    await next()
}

const handlePassword = async (ctx, next) => {
    let { password } = ctx.request.body
    console.log(password)
    ctx.request.body.password = md5(password)
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}