const KoaRouter = require("@koa/router");
const {
  verifyUser,
  handlePassword,
} = require("../middleware/users.middleware");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const usersController = require("../controller/users.controller");

// 创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });

// 用户注册接口
userRouter.post(
  "/",
  verifyAuth,
  verifyPermission("system:user:create"),
  verifyUser,
  handlePassword,
  usersController.create
);

// 获取用户列表信息接口
userRouter.get(
  "/list",
  verifyAuth,
  verifyPermission("system:user:view"),
  usersController.getUsersList
);
// 删除用户
userRouter.delete(
  "/:id",
  verifyAuth,
  verifyPermission("system:user:delete"),
  usersController.deleteUser
);
// 根据ID修改用户信息
userRouter.patch(
  "/:id",
  verifyAuth,
  verifyPermission("system:user:update"),
  usersController.updateUser
);
// 用户列表参数查询接口
userRouter.get(
  "/list/query",
  verifyAuth,
  verifyPermission("system:user:view"),
  usersController.queryUsersList
);

// 导出路由对象
module.exports = userRouter;
