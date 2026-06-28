const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const permissionController = require("../controller/permission.controller");

const permissionRouter = new KoaRouter({ prefix: "/permissions" });

permissionRouter.get("/list", verifyAuth, permissionController.getAllPermissions);
permissionRouter.get(
  "/role/:id",
  verifyAuth,
  permissionController.getPermissionsByRoleId
);
permissionRouter.put(
  "/role/:id",
  verifyAuth,
  verifyPermission("system:role:assign"),
  permissionController.updateRolePermissions
);

module.exports = permissionRouter;
