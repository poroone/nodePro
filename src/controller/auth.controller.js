const jwt = require("jsonwebtoken")
const { TOKEN_PRIVATE } = require("../app/config")

class AuthController {
    async login(ctx, next) {
        const { id, username } = ctx.user
        const token = jwt.sign({ id, username }, TOKEN_PRIVATE, {
            expiresIn: 60 * 60 * 24,
            algorithm: "RS256"
        })

        console.log(ctx.user, "-------")

        ctx.body = {
            id,
            username,
            token
        }
    }
    async seccess(ctx, next) {
        console.log("进入授权")
        ctx.body="已授权"
    }
}

module.exports = new AuthController()