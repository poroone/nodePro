const commentService = require("../service/comment.service")
class CommentController {
    async create(ctx, next) {
        console.log(ctx)
        const { content, moment_id } = ctx.request.body
        const { id } = ctx.user;
        console.log(id)
        const result = await commentService.create(content, moment_id, id)
        ctx.body = result
    }
    async reply(ctx, next) {
        console.log(ctx)
        const {commentId}=ctx.params;
        const { content, moment_id,  } = ctx.request.body
        const { id } = ctx.user;
        console.log(id)
        const result = await commentService.reply(content, moment_id, commentId,id)
        ctx.body = result
    }
    async update(ctx,next){
        const {commentId}=ctx.params;
        const { content  } = ctx.request.body
        console.log(content,commentId)
        const result = await commentService.update(content, commentId)
        ctx.body = result
    }
}
module.exports = new CommentController()