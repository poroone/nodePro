const app = require("./app")
const config=require("./app/config")



app.listen(8888, () => {
    console.log(`服务器端口${config.APP_PORT}启动成功`)
})