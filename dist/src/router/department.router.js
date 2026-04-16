const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const departmentController = require("../controller/department.controller");

const departmentRouter = new KoaRouter({ prefix: "/departments" });

// 获取部门列表信息接口
departmentRouter.get(
  "/list",
  verifyAuth,
  departmentController.getDepartmentsList,
);
// 创建部门
departmentRouter.post("/", verifyAuth, departmentController.createDepartment);
// 删除部门
departmentRouter.delete("/:id", verifyAuth, departmentController.deleteDepartment);
// 修改部门
departmentRouter.patch("/:id", verifyAuth, departmentController.updateDepartment);

module.exports = departmentRouter;
