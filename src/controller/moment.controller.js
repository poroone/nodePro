const momentService = require("../service/moments.service")
class MomentController {
    async create(ctx, next) {
        const { id } = ctx.user
        const { context } = ctx.request.body
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

        const result = await momentService.getMomentList(offset, size)
        ctx.body = result
    }
    async updateMoment(ctx, next) {
        const momentId = ctx.params.momentId;
        const context = ctx.request.body.context;
        const result = await momentService.setMomentUpdate(momentId, context)
        console.log(result);
        ctx.body = result
    }
    async removeMoment(ctx, next) {
        const momentId = ctx.params.momentId

        const result = await momentService.removeMoment(momentId)
        ctx.body = result
    }
}

module.exports = new MomentController()