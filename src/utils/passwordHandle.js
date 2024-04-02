// node中的加密方式
const crypto = require("crypto")

const md5password = (password) => {
    // 使用md5的加密格式
    const md5 = crypto.createHash("md5")
    // md5进行加密并且从二进制传换成16进制
    const result = md5.update(password).digest('hex')
    return result
}

module.exports = md5password