const momentService = require("../service/moments.service")
class MomentController {
    async create(ctx, next) {
        const { id } = ctx.user
        const { context } = ctx.request.body
        console.log(id, context)
        const result = await momentService.create(id, context)

        ctx.body = result
    }
    async getMomentDetail(ctx, next) {
        const momentId = ctx.params.momentId;
        const result = await momentService.getMomentById(momentId)
        ctx.body = result
    }
    async list(ctx, next) {
        const { offset, size } = ctx.query;
        console.log(offset, size)
        const result = await momentService.getMomentList(offset, size)
        ctx.body = result
    }
}

module.exports = new MomentController()