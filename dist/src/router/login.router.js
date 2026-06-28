const KoaRouter = require("@koa/router");
const {
  verifyLogin,
  handleLoginPassword,
} = require("../middleware/login.middleware");
const { verifyAuth } = require("../middleware/auth.middleware");
const loginController = require("../controller/login.controller");
const roleController = require("../controller/role.controller");
const menuController = require("../controller/menu.controller");
const permissionController = require("../controller/permission.controller");

const loginRouter = new KoaRouter({ prefix: "/login" });

// 用户登录接口
loginRouter.post("/", verifyLogin, handleLoginPassword, loginController.login);

// 根据ID查询角色信息接口
loginRouter.get("/role/:id", verifyAuth, roleController.getRoleById);
// 根据角色获取菜单接口
loginRouter.get("/role/:id/menus", verifyAuth, menuController.getMenusByRoleId);
// 根据角色获取操作权限接口
loginRouter.get(
  "/role/:id/permissions",
  verifyAuth,
  permissionController.getPermissionsByRoleId
);

// 测试 token 验证接口
loginRouter.get("/test", verifyAuth, async (ctx, next) => {
  ctx.body = {
    message: "Token 验证成功",
    data: {
      user: ctx.user,
    },
  };
});

module.exports = loginRouter;
