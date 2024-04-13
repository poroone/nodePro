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
        console.log(result)
        ctx.body = result
    }
    async addMomentLabel(ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params
        for (const label of labels) {
            // 判断标签和动态是否已经有关联了 存在true 不存在false
            const isMomLabel = await momentService.isMomentLabel(label.id, momentId)
            console.log(isMomLabel)
            // 不存在就添加标签
            if (!isMomLabel) {
                await momentService.setMomentLabel(label.id, momentId)
            }
        }
        ctx.body = "创建成功"
    }
}

module.exports = new MomentController()