const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const roleController = require("../controller/role.controller");

// 创建路由对象
const roleRouter = new KoaRouter({ prefix: "/roles" });

// 获取角色列表信息接口
roleRouter.get("/list", verifyAuth, roleController.getRolesList);
// 新建角色
roleRouter.post("/", verifyAuth, roleController.createRole);
// 修改角色信息
roleRouter.patch("/:id", verifyAuth, roleController.updateRole);
// 删除角色
roleRouter.delete("/:id", verifyAuth, roleController.deleteRole);

// 导出路由对象
module.exports = roleRouter;
