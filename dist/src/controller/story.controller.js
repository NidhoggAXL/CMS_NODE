const storyService = require("../service/story.service");

class StoryController {
  async getStoriesList(ctx) {
    try {
      const userId = ctx.user.id;
      const offset = parseInt(ctx.query.offset, 10) || 0;
      const size = parseInt(ctx.query.size, 10) || 100;
      const title = ctx.query.title || "";
      const genre = ctx.query.genre || "";

      const list = await storyService.getStoriesList(userId, {
        offset,
        limit: size,
        title,
        genre,
      });
      const totalCount = await storyService.getStoriesCount(userId, { title, genre });

      ctx.body = {
        code: 0,
        data: {
          list,
          totalCount,
          offset,
          size,
        },
      };
    } catch (error) {
      console.error("获取故事列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async getStoryDetail(ctx) {
    try {
      const userId = ctx.user.id;
      const { id } = ctx.params;
      const story = await storyService.getStoryById(id, userId);

      if (!story) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "故事不存在" };
        return;
      }

      const messages = await storyService.getChatMessages(id, userId);

      ctx.body = {
        code: 0,
        data: {
          ...story,
          messages: messages || [],
        },
      };
    } catch (error) {
      console.error("获取故事详情失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async createStory(ctx) {
    try {
      const userId = ctx.user.id;
      const { title, genre, summary, content, messages = [] } = ctx.request.body;

      if (!title || !genre || !content) {
        ctx.status = 400;
        ctx.body = { code: -1, message: "标题、类型和内容为必填项" };
        return;
      }

      const story = await storyService.createStory(userId, {
        title,
        genre,
        summary,
        content,
      });

      if (Array.isArray(messages) && messages.length) {
        await storyService.replaceChatMessages(story.id, userId, messages);
      }

      ctx.body = {
        code: 0,
        message: "故事创建成功",
        data: story,
      };
    } catch (error) {
      console.error("创建故事失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async updateStory(ctx) {
    try {
      const userId = ctx.user.id;
      const { id } = ctx.params;
      const { title, genre, summary, content } = ctx.request.body;

      const existingStory = await storyService.getStoryById(id, userId);
      if (!existingStory) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "故事不存在" };
        return;
      }

      await storyService.updateStory(id, userId, {
        title: title ?? existingStory.title,
        genre: genre ?? existingStory.genre,
        summary: summary ?? existingStory.summary,
        content: content ?? existingStory.content,
      });

      const story = await storyService.getStoryById(id, userId);

      ctx.body = {
        code: 0,
        message: "故事更新成功",
        data: story,
      };
    } catch (error) {
      console.error("更新故事失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async deleteStory(ctx) {
    try {
      const userId = ctx.user.id;
      const { id } = ctx.params;

      const existingStory = await storyService.getStoryById(id, userId);
      if (!existingStory) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "故事不存在" };
        return;
      }

      await storyService.deleteStory(id, userId);

      ctx.body = {
        code: 0,
        message: "故事删除成功",
      };
    } catch (error) {
      console.error("删除故事失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async saveChatMessages(ctx) {
    try {
      const userId = ctx.user.id;
      const { id } = ctx.params;
      const { messages = [] } = ctx.request.body;

      const result = await storyService.replaceChatMessages(id, userId, messages);
      if (!result) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "故事不存在" };
        return;
      }

      ctx.body = {
        code: 0,
        message: "对话记录保存成功",
        data: result,
      };
    } catch (error) {
      console.error("保存对话记录失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }
}

module.exports = new StoryController();
