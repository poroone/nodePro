const app = require("./app")
require("./app/database")

const config = require("./app/config")



app.listen(config.APP_PORT, () => {
    console.log(`服务器端口${config.APP_PORT}启动成功`)
})