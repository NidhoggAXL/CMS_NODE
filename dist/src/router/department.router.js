const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const departmentController = require("../controller/department.controller");

const departmentRouter = new KoaRouter({ prefix: "/departments" });

departmentRouter.get(
  "/list",
  verifyAuth,
  verifyPermission("system:department:view"),
  departmentController.getDepartmentsList
);
departmentRouter.post(
  "/",
  verifyAuth,
  verifyPermission("system:department:create"),
  departmentController.createDepartment
);
departmentRouter.delete(
  "/:id",
  verifyAuth,
  verifyPermission("system:department:delete"),
  departmentController.deleteDepartment
);
departmentRouter.patch(
  "/:id",
  verifyAuth,
  verifyPermission("system:department:update"),
  departmentController.updateDepartment
);

module.exports = departmentRouter;
