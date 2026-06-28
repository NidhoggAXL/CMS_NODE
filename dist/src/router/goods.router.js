const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const goodsController = require("../controller/goods.controller");

const goodsRouter = new KoaRouter({ prefix: "/goods" });

goodsRouter.get(
  "/list",
  verifyAuth,
  verifyPermission("product:goods:view"),
  goodsController.getGoodsList
);
goodsRouter.get(
  "/all",
  verifyAuth,
  verifyPermission("product:goods:view"),
  goodsController.getAllGoods
);
goodsRouter.post(
  "/",
  verifyAuth,
  verifyPermission("product:goods:create"),
  goodsController.createGoods
);
goodsRouter.patch(
  "/:id",
  verifyAuth,
  verifyPermission("product:goods:update"),
  goodsController.updateGoods
);
goodsRouter.delete(
  "/:id",
  verifyAuth,
  verifyPermission("product:goods:delete"),
  goodsController.deleteGoods
);

module.exports = goodsRouter;
