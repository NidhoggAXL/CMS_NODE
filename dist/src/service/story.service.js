const connection = require("../app/database");

function mapStoryRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    genre: row.genre,
    summary: row.summary,
    content: row.content,
    createdAt: row.create_at,
    updatedAt: row.update_at,
  };
}

function mapMessageRow(row) {
  return {
    id: row.id,
    storyId: row.story_id,
    role: row.role,
    content: row.content,
    timestamp: row.create_at,
  };
}

class StoryService {
  async getStoriesList(userId, { offset = 0, limit = 100, title = "", genre = "" } = {}) {
    let statement = `
      SELECT id, user_id, title, genre, summary, content, create_at, update_at
      FROM stories
      WHERE user_id = ?
    `;
    const params = [userId];

    if (title) {
      statement += ` AND title LIKE ?`;
      params.push(`%${title}%`);
    }

    if (genre) {
      statement += ` AND genre = ?`;
      params.push(genre);
    }

    statement += ` ORDER BY update_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await connection.query(statement, params);
    return rows.map(mapStoryRow);
  }

  async getStoriesCount(userId, { title = "", genre = "" } = {}) {
    let statement = `SELECT COUNT(*) as count FROM stories WHERE user_id = ?`;
    const params = [userId];

    if (title) {
      statement += ` AND title LIKE ?`;
      params.push(`%${title}%`);
    }

    if (genre) {
      statement += ` AND genre = ?`;
      params.push(genre);
    }

    const [rows] = await connection.query(statement, params);
    return rows[0].count;
  }

  async getStoryById(id, userId) {
    const statement = `
      SELECT id, user_id, title, genre, summary, content, create_at, update_at
      FROM stories
      WHERE id = ? AND user_id = ?
    `;
    const [rows] = await connection.query(statement, [id, userId]);
    return mapStoryRow(rows[0]);
  }

  async createStory(userId, story) {
    const { title, genre, summary = null, content } = story;
    const statement = `
      INSERT INTO stories (user_id, title, genre, summary, content)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(statement, [
      userId,
      title,
      genre,
      summary,
      content,
    ]);
    return this.getStoryById(result.insertId, userId);
  }

  async updateStory(id, userId, story) {
    const { title, genre, summary = null, content } = story;
    const statement = `
      UPDATE stories
      SET title = ?, genre = ?, summary = ?, content = ?
      WHERE id = ? AND user_id = ?
    `;
    const [result] = await connection.query(statement, [
      title,
      genre,
      summary,
      content,
      id,
      userId,
    ]);
    return result;
  }

  async deleteStory(id, userId) {
    const statement = `DELETE FROM stories WHERE id = ? AND user_id = ?`;
    const [result] = await connection.query(statement, [id, userId]);
    return result;
  }

  async getChatMessages(storyId, userId) {
    const story = await this.getStoryById(storyId, userId);
    if (!story) return null;

    const statement = `
      SELECT id, story_id, role, content, create_at
      FROM story_chat_messages
      WHERE story_id = ?
      ORDER BY id ASC
    `;
    const [rows] = await connection.query(statement, [storyId]);
    return rows.map(mapMessageRow);
  }

  async replaceChatMessages(storyId, userId, messages = []) {
    const story = await this.getStoryById(storyId, userId);
    if (!story) return null;

    await connection.query(`DELETE FROM story_chat_messages WHERE story_id = ?`, [storyId]);

    if (!messages.length) {
      return [];
    }

    const statement = `
      INSERT INTO story_chat_messages (story_id, role, content)
      VALUES ?
    `;
    const values = messages.map((item) => [storyId, item.role, item.content]);
    await connection.query(statement, [values]);

    return this.getChatMessages(storyId, userId);
  }
}

module.exports = new StoryService();
