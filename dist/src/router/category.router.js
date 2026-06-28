const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const categoryController = require("../controller/category.controller");

const categoryRouter = new KoaRouter({ prefix: "/categories" });

categoryRouter.get("/list", verifyAuth, categoryController.getCategoriesList);
categoryRouter.post("/", verifyAuth, categoryController.createCategory);
categoryRouter.patch("/:id", verifyAuth, categoryController.updateCategory);
categoryRouter.delete("/:id", verifyAuth, categoryController.deleteCategory);

module.exports = categoryRouter;
