const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const storyController = require("../controller/story.controller");

const storyRouter = new KoaRouter({ prefix: "/stories" });

storyRouter.get("/list", verifyAuth, storyController.getStoriesList);
storyRouter.get("/:id", verifyAuth, storyController.getStoryDetail);
storyRouter.post("/", verifyAuth, storyController.createStory);
storyRouter.patch("/:id", verifyAuth, storyController.updateStory);
storyRouter.delete("/:id", verifyAuth, storyController.deleteStory);
storyRouter.put("/:id/messages", verifyAuth, storyController.saveChatMessages);

module.exports = storyRouter;
