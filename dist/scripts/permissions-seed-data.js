const PERMISSIONS = [
  { name: "查看用户", code: "system:user:view", description: "查看用户列表" },
  { name: "新建用户", code: "system:user:create", description: "创建用户" },
  { name: "编辑用户", code: "system:user:update", description: "编辑用户" },
  { name: "删除用户", code: "system:user:delete", description: "删除用户" },

  { name: "查看角色", code: "system:role:view", description: "查看角色列表" },
  { name: "新建角色", code: "system:role:create", description: "创建角色" },
  { name: "编辑角色", code: "system:role:update", description: "编辑角色" },
  { name: "删除角色", code: "system:role:delete", description: "删除角色" },
  { name: "分配权限", code: "system:role:assign", description: "为角色分配操作权限" },

  { name: "查看菜单", code: "system:menu:view", description: "查看菜单列表" },
  { name: "新建菜单", code: "system:menu:create", description: "创建菜单" },
  { name: "编辑菜单", code: "system:menu:update", description: "编辑菜单" },
  { name: "删除菜单", code: "system:menu:delete", description: "删除菜单" },

  { name: "查看部门", code: "system:department:view", description: "查看部门列表" },
  { name: "新建部门", code: "system:department:create", description: "创建部门" },
  { name: "编辑部门", code: "system:department:update", description: "编辑部门" },
  { name: "删除部门", code: "system:department:delete", description: "删除部门" },

  { name: "查看分类", code: "product:category:view", description: "查看商品分类" },
  { name: "新建分类", code: "product:category:create", description: "创建商品分类" },
  { name: "编辑分类", code: "product:category:update", description: "编辑商品分类" },
  { name: "删除分类", code: "product:category:delete", description: "删除商品分类" },

  { name: "查看商品", code: "product:goods:view", description: "查看商品列表" },
  { name: "新建商品", code: "product:goods:create", description: "创建商品" },
  { name: "编辑商品", code: "product:goods:update", description: "编辑商品" },
  { name: "删除商品", code: "product:goods:delete", description: "删除商品" },

  { name: "查看故事", code: "story:view", description: "查看故事列表" },
  { name: "新建故事", code: "story:create", description: "创建故事" },
  { name: "编辑故事", code: "story:update", description: "编辑故事" },
  { name: "删除故事", code: "story:delete", description: "删除故事" },
];

const ROLE_PERMISSION_CODES = {
  1: PERMISSIONS.map((item) => item.code),
  2: [
    "system:user:view",
    "system:user:create",
    "system:user:update",
    "system:role:view",
    "system:role:create",
    "system:role:update",
    "system:department:view",
    "product:category:view",
    "product:category:create",
    "product:category:update",
    "product:category:delete",
    "product:goods:view",
    "product:goods:create",
    "product:goods:update",
    "product:goods:delete",
  ],
  3: ["story:view", "story:create", "story:update", "story:delete"],
};

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSION_CODES,
};
