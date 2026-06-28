const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const categoryController = require("../controller/category.controller");

const categoryRouter = new KoaRouter({ prefix: "/categories" });

categoryRouter.get(
  "/list",
  verifyAuth,
  verifyPermission("product:category:view"),
  categoryController.getCategoriesList
);
categoryRouter.post(
  "/",
  verifyAuth,
  verifyPermission("product:category:create"),
  categoryController.createCategory
);
categoryRouter.patch(
  "/:id",
  verifyAuth,
  verifyPermission("product:category:update"),
  categoryController.updateCategory
);
categoryRouter.delete(
  "/:id",
  verifyAuth,
  verifyPermission("product:category:delete"),
  categoryController.deleteCategory
);

module.exports = categoryRouter;
