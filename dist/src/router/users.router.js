const KoaRouter = require("@koa/router");
const {
  verifyUser,
  handlePassword,
} = require("../middleware/users.middleware");
const { verifyAuth } = require("../middleware/auth.middleware");
const usersController = require("../controller/users.controller");

// 创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

// 用户注册接口
userRouter.post("/", verifyUser, handlePassword, usersController.create);

// 获取用户列表信息接口
userRouter.get("/list", verifyAuth, usersController.getUsersList);
// 删除用户
userRouter.delete("/:id", verifyAuth, usersController.deleteUser);
// 根据ID修改用户信息
userRouter.patch("/:id", verifyAuth, usersController.updateUser);
// 用户列表参数查询接口
userRouter.get("/list/query", verifyAuth, usersController.queryUsersList);

// 导出路由对象
module.exports = userRouter;
