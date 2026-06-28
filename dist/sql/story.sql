-- 故事模块表结构
USE cms;

CREATE TABLE IF NOT EXISTS stories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL COMMENT '创建用户 ID',
  title VARCHAR(100) NOT NULL COMMENT '故事标题',
  genre VARCHAR(20) NOT NULL DEFAULT '其他' COMMENT '故事类型',
  summary VARCHAR(255) DEFAULT NULL COMMENT '故事摘要',
  content MEDIUMTEXT NOT NULL COMMENT '故事正文',
  create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_stories_user_id (user_id),
  INDEX idx_stories_genre (genre),
  INDEX idx_stories_update_at (update_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI 故事表';

CREATE TABLE IF NOT EXISTS story_chat_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  story_id INT NOT NULL COMMENT '关联故事 ID',
  role ENUM('user', 'assistant') NOT NULL COMMENT '消息角色',
  content MEDIUMTEXT NOT NULL COMMENT '消息内容',
  create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_story_chat_story_id (story_id),
  CONSTRAINT fk_story_chat_story_id
    FOREIGN KEY (story_id) REFERENCES stories(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='故事 AI 对话记录';
