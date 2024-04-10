const Router = require("koa-router")
const comment = new Router({ prefix: "/comment" })
const {
    verifyAuth,
    verifyPermission
} = require("../middleware/auth.middleware.js")
const {
    create,
    reply,
    update
} = require("../controller/comment.controller.js")
// 评论
comment.post("/", verifyAuth, create)
// 回复哦ing论
comment.post("/:commentId/reply", verifyAuth, reply)
// 修改评论
comment.patch("/:commentId", verifyAuth, verifyPermission("comment"), update)
// 删除评论
// comment.post("/", verifyAuth, remove)

module.exports = comment