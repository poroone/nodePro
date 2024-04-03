const Router = require("koa-router")
const momentRouter = new Router({ prefix: "/moment" })

const {
    verifyAuth
} = require("../middleware/auth.middleware.js")
const {
    create,
    getMomentDetail,
    list
} = require("../controller/moment.controller.js")


momentRouter.post("/", verifyAuth, create)
momentRouter.get("/list",list)
momentRouter.get("/:momentId", getMomentDetail)
module.exports = momentRouter;