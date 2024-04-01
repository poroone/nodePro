
const errorType = require("../constents/error-type")
const errorHandle = (error, ctx) => {
    let status, message
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "账号或密码不能为空"
            break;
        default:
            status = 404;
            message = "NOT FOUND"
    }
    ctx.status = status;
    ctx.body = message
}

module.exports = errorHandle;