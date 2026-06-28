const { PERMISSION_IS_NOT_ALLOW } = require("../config/error");
const permissionService = require("../service/permission.service");

const SUPER_ADMIN_ROLE_ID = 1;

const verifyPermission = (permissionCode) => {
  return async (ctx, next) => {
    const roleId = ctx.user?.roleId;

    if (!roleId) {
      return ctx.app.emit("error", PERMISSION_IS_NOT_ALLOW, ctx);
    }

    if (Number(roleId) === SUPER_ADMIN_ROLE_ID) {
      await next();
      return;
    }

    const allowed = await permissionService.roleHasPermission(roleId, permissionCode);
    if (!allowed) {
      return ctx.app.emit("error", PERMISSION_IS_NOT_ALLOW, ctx);
    }

    await next();
  };
};

module.exports = {
  verifyPermission,
  SUPER_ADMIN_ROLE_ID,
};
