const errorType = require("../../constents/error-type")
const verifyUser = async (ctx, next) => {
    // 1.获取用户名密码

    const { username, password } = ctx.request.body
    // 判断用户名或者密码不能为空
    if (!username || !password || username === '' || password === '') {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }
    // await next()
}

module.exports = {
    verifyUser
}