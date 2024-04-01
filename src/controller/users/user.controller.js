const {create} = require("../../service/users/user.service")
// 处理接口
class UserController {
    async create(ctx, next) {
        // 获取用户传递的参数
        const user=ctx.request.body;
        // 查询数据库 service
        const result = await create(user)
        // 返回数据
        ctx.body = result
    }
}
module.exports = new UserController();