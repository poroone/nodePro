const jwt = require("jsonwebtoken")
const errorType = require("../constents/error-type.js")
const autoService = require("../service/auth.service.js")
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
    const authorization = ctx.headers.authorization
    // console.log(authorization)
    if (!authorization) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit("error", error, ctx)
    }
    // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsInVzZXJuYW1lIjoibGV6aWRkIiwiaWF0IjoxNzEyMTY3Mzk3LCJleHAiOjE3MTIyNTM3OTd9.HiAchCejQcah3zo5u-2K8ykZkfxSR9cc8QgOCQG3rOokJTEHcuul1YUfX_vSo2cFGGa-S5zZCIwO_Cq_NHKZDwB5kJ10wuEjvAkggG6TAmnHwVMw8f3fir3CsV-z4T-IC2NuNy_KWpQVcjEwp28NaDiG4QtoYpnBB7bHC4EOqftHWjk8b3SgA3sqDSt3KS5RMd4k4ZWkdVJpdL0d9XqZ9jmnomqa2o7LG8LQTFIxPzvODmJKpA9SAz6L4dYEcNQmDwU74n_3PMAHoDQ-vEV50VS1lOCLMBV7EuBH3LgMUhoBiXzorIECzjPy4_HFw8Hd-PdWdNmgAVQO5AJyelXgPg"
    // 进行截取
    const token = authorization.replace("Bearer ", "")
    console.log(token)
    // 验证token
    try {
        const result = jwt.verify(token, TOKEN_PUBLIC, {
            algorithms: ["RS256"]
        })

        ctx.user = result;
        console.log("next");
        await next()

    } catch (err) {
        console.log("失败")
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit("error", error, ctx)
    }
}
// 用户是否有权限
const verifyPermission = (tableName) => {
    return async (ctx, next) => {
        console.log("1")
        const [resourceKey] = Object.keys(ctx.params)
        const resourceId = ctx.params[resourceKey];
        const { id } = ctx.user
        console.log(resourceId, id,tableName, ctx.params)
        try {
            const isPermission = await autoService.checkAll(tableName, resourceId, id)
            if (!isPermission) throw new Error()
            console.log("***")
            await next()
        } catch (err) {
            const error = new Error(errorType.NULLUNAUTHORIZATION)
            ctx.app.emit('error', error, ctx)
        }
    }


}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}