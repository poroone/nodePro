const Router = require("koa-router")
const momentRouter = new Router({ prefix: "/moment" })

const {
    verifyAuth,
    verifyPermission
} = require("../middleware/auth.middleware.js")
const {
    create,
    getMomentDetail,
    list,
    updateMoment,
    removeMoment
} = require("../controller/moment.controller.js")

//  
momentRouter.post("/", verifyAuth, create)
// 分页查询
momentRouter.get("/list", list)
// 查询某个商品
momentRouter.get("/:momentId", getMomentDetail)
// 修改内容
momentRouter.put("/:momentId", verifyAuth, verifyPermission("moments"), updateMoment)
// 删除
momentRouter.delete("/:momentId", verifyAuth, verifyPermission("moments"), removeMoment)
module.exports = momentRouter;