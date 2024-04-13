const Router = require("koa-router")
const comment = new Router({ prefix: "/comment" })
const {
    verifyAuth,
    verifyPermission
} = require("../middleware/auth.middleware.js")
const {
    create,
    reply,
    update,
    remove,
    list
} = require("../controller/comment.controller.js")
// 评论
comment.post("/", verifyAuth, create)
// 回复哦ing论
comment.post("/:commentId/reply", verifyAuth, reply)
// 修改评论
comment.patch("/:commentId", verifyAuth, verifyPermission("comment"), update)
// 删除评论
comment.delete("/:commentId", verifyAuth, verifyPermission("comment"), remove)
// 获取评论列表
comment.get("/", list)
module.exports = comment