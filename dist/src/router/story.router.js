const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");
const storyController = require("../controller/story.controller");

const storyRouter = new KoaRouter({ prefix: "/stories" });

storyRouter.get(
  "/list",
  verifyAuth,
  verifyPermission("story:view"),
  storyController.getStoriesList
);
storyRouter.get(
  "/:id",
  verifyAuth,
  verifyPermission("story:view"),
  storyController.getStoryDetail
);
storyRouter.post(
  "/",
  verifyAuth,
  verifyPermission("story:create"),
  storyController.createStory
);
storyRouter.patch(
  "/:id",
  verifyAuth,
  verifyPermission("story:update"),
  storyController.updateStory
);
storyRouter.delete(
  "/:id",
  verifyAuth,
  verifyPermission("story:delete"),
  storyController.deleteStory
);
storyRouter.put(
  "/:id/messages",
  verifyAuth,
  verifyPermission("story:update"),
  storyController.saveChatMessages
);

module.exports = storyRouter;
