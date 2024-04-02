
class AuthController {
    async login(ctx, next) {
        const { username } = ctx.request.body;
        
        ctx.body = `登录成功欢迎${username}回来`
    }
}

module.exports = new AuthController()