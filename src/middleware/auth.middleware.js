const jwt = require("jsonwebtoken")
const errorType = require("../constents/error-type.js")
const service = require("../service/user.service")
const md5 = require("../utils/passwordHandle.js")
const { TOKEN_PUBLIC } = require("../app/config.js")
// 验证用户登录
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
    // console.log(user)
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
    // 存储用户信息
    ctx.user = user
    await next()
}
// 验证用户是否登陆过
const verifyAuth = async (ctx, next) => {
    console.log("验证授权")
    // 1.拿到authorization
    try {
        const authorization = ctx.headers.authorization
        // 进行截取
        const token = authorization.replace("Bearer ", "")
        // 验证token
        const result = jwt.verify(token, TOKEN_PUBLIC, {
            algorithms: ["RS256"]
        })
        ctx.user = result;
        await next()
    } catch (err) {
        console.log("失败")
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit("error", error, ctx)
    }

}
module.exports = {
    verifyLogin,
    verifyAuth
}