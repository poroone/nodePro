
const errorType = require("../constents/error-type")
const errorHandle = (error, ctx) => {
    let status, message
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "账号或密码不能为空"
            break;
        case errorType.USER_ALREADY_EXISTS:
            status = 409;// 冲突
            message = "用户已存在"
            break;
        case errorType.USER_DOES_NOT_EXISTS:
            status = 400;// 参数错误
            message = "用户名不存在"
            break;
        case errorType.PASSWORD_IS_ERROR:
            status = 400;// 参数错误
            message = "用户密码错误"
            break;
        case errorType.UNAUTHORIZATION:
            status = 401;// 未授权
            message = "无效的token"
            break;
        case errorType.TOKEN_IS_NULL:
            status = 401;// 未携带token
            message = "未携带token"
            break;
        case errorType.NULLUNAUTHORIZATION:
            status = 401;// 无权限
            message = "没有权限"
            break;
        case errorType.NULLARGUMENT:
            status = 401;
            message = "缺少参数"
            break;

        default:
            status = 404;
            message = "NOT FOUND"
    }

    ctx.status = status;
    ctx.body = {
        status,
        message
    }
}

module.exports = errorHandle;