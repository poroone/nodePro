const { create, userInfo } = require("../service/user.service")
const errorType = require("../constents/error-type")
// 处理接口
class UserController {
    async create(ctx, next) {
        // 获取用户传递的参数
        const user = ctx.request.body;

        // 查询数据库 service
        const result = await create(user)
        // 返回数据
        ctx.body = result
    }
    async userInfo(ctx, next) {
        // 获取用户传递的参数

        const userId = ctx.request.params.userId;
        if (!!userId) {
            const error = new Error(errorType.NULLARGUMENT)
            return ctx.app.emit("error", error, ctx)
        }
        // 查询数据库 service
        const result = await userInfo(userId)
        // 返回数据
        ctx.body = result
    }
}
module.exports = new UserController();