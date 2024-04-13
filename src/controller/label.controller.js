const service = require("../service/label.service")
class LabelController {
    async create(ctx, next) {

        const { name } = ctx.request.body
        const isLabel = await service.isLabel(name)
        if (!isLabel) {
            const result = await service.create(name)
            ctx.body = result
        }else{
       
            ctx.body = "此标签已存在"
        }
       
    }
    async list(ctx, next) {
        const { limit, offset } = ctx.query
        const result = await service.getLabels(limit, offset)
        ctx.body = result
    }
}

module.exports = new LabelController()