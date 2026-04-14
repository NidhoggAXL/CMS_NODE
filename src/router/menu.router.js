const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const menuController = require("../controller/menu.controller");

const menuRouter = new KoaRouter({ prefix: "/menus" });

// 获取菜单树形列表
menuRouter.get("/list", verifyAuth, menuController.getMenusList);
// 创建菜单
menuRouter.post("/create", verifyAuth, menuController.createMenu);
// 根据id删除菜单
menuRouter.delete("/delete/:id", verifyAuth, menuController.deleteMenu);
// 更新菜单
menuRouter.patch("/update/:id", verifyAuth, menuController.updateMenu);

module.exports = menuRouter;
