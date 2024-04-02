const Koa = require('koa')
const bodyParse = require("koa-bodyparser")


const errorHandler = require("./error.handle")
const userRouters = require("../router")
const app = new Koa();
app.userRouters = userRouters

app.use(bodyParse())
app.userRouters()
// 全局错误
app.on("error", errorHandler)

module.exports = app;