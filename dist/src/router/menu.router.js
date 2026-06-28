const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const menuController = require("../controller/menu.controller");

const menuRouter = new KoaRouter({ prefix: "/menus" });

menuRouter.get(
  "/list",
  verifyAuth,
  verifyPermission("system:menu:view"),
  menuController.getMenusList
);
menuRouter.post(
  "/create",
  verifyAuth,
  verifyPermission("system:menu:create"),
  menuController.createMenu
);
menuRouter.delete(
  "/delete/:id",
  verifyAuth,
  verifyPermission("system:menu:delete"),
  menuController.deleteMenu
);
menuRouter.patch(
  "/update/:id",
  verifyAuth,
  verifyPermission("system:menu:update"),
  menuController.updateMenu
);

module.exports = menuRouter;
