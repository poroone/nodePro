const Router = require("koa-router")
const { verifyAuth } = require("../middleware/auth.middleware")

const { avatarHandler } = require("../middleware/file.middleware")
const {
     avatarCreate,
     getAvatarInfo
 } = require("../controller/file.controller")

const avatarRouter = new Router({ prefix: '/upload' })


avatarRouter.post("/:userId/avatar", verifyAuth, avatarHandler, avatarCreate)
avatarRouter.get("/:userId/avatar", getAvatarInfo)

module.exports = avatarRouter   