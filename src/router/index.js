const fs = require("fs")
// 动态加载所有路由
const userRouters = function () {
    fs.readdirSync(__dirname).forEach(file => {
        if (file == "index.js") return
        const router = require(`./${file}`)
        console.log(router)
        this.use(router.routes())
        this.use(router.allowedMethods())
    })
}

module.exports = userRouters