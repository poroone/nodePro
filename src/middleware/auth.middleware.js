const errorType = require("../constents/error-type.js")
const service = require("../service/user.service")
const md5 = require("../utils/passwordHandle.js")

const verifyLogin = async (ctx, next) => {

    const { username, password } = ctx.request.body;
    // 账号或者密码是否为空
    if (!username || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }
    // 用户是否存在
    const result = await service.getUserByName(username);
    const user = result[0]
    console.log(user)
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit("error", error, ctx)
    }
    // 密码是否正确(加密后)
    const md5Password = md5(password)
    if (md5Password != user.password) {
        const error = new Error(errorType.PASSWORD_IS_ERROR)
        return ctx.app.emit("error", error, ctx)
    }
    await next()
}

module.exports = {
    verifyLogin
}