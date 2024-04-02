
# 目录结构 
- package.json
- src
    - index.js 入口文件
    - app 全局app的配置
      - config  环境配置
      - database 数据库配置
      - error 全局报错处理
      - index 全局挂载等
    - utils 工具
      - passwordHandler 对密码进行md5加密
    - constents 定义的一些常量
      - error-type 错误类型
    - router 路由
      - users 用户路由
      - auto 登录路由
    - controller 控制器
      - users 用户路由实现
      - auto 登录实现
    - service 和数据库进行操作
      - users 用户和数据库交互
    - middleware 做拦截处理
      - users 用户注册拦截
      - auto 登录拦截
- .env 配置信息


<!-- 项目依赖 -->
# 项目依赖
koa  
koa-router
koa-bodyparser
nodemon 
dotenv 

node中的crypto