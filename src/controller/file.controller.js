const fs = require('fs');
const fileServer = require("../service/file.service")
const { AVATAR_PATH } = require("../constents/file-path")
const { APP_HOST, APP_PORT } = require("../app/config")
class FileController {
    async avatarCreate(ctx, next) {
        const { filename, mimetype, size } = ctx.req.file
        const { userId } = ctx.params
        console.log(filename, mimetype, size, userId)
        const result = await fileServer.createAvatar(filename, mimetype, size, userId)
        const avatarURL = `${APP_HOST}:${APP_PORT}/upload/${userId}/avatar`
        console.log(avatarURL)
        await fileServer.updateAvatarUser(userId, avatarURL)
        ctx.body = result
    }
    async getAvatarInfo(ctx, next) {
        const { userId } = ctx.params
        console.log(userId)
        const result = await fileServer.getAvatarInfo(userId)
        ctx.response.set("content-Type", result.mimetype)
        console.log(result)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
    }
}

module.exports = new FileController()