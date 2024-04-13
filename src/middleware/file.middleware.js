
const multer = require("koa-multer")
const {AVATAR_PATH}=require("../constents/file-path")
const avatarUpload = new multer({
    dest:AVATAR_PATH
})
// 处理 avatar 
const avatarHandler = avatarUpload.single("avatar")

module.exports = {
    avatarHandler
}