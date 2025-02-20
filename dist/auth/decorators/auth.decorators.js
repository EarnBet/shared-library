"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyWithUser = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../../http/request/functions");
function BodyWithUser() {
    return (0, common_1.createParamDecorator)((data, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        return Object.assign(Object.assign({}, (request.body || {})), { ip: (0, functions_1.getIpAddress)(request), user_id: request.authorizedUserData.user_id, username: request.authorizedUserData.username, _authorizedUserData: request.authorizedUserData });
    })();
}
exports.BodyWithUser = BodyWithUser;
//# sourceMappingURL=auth.decorators.js.map