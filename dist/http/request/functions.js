"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddress = void 0;
function getIpAddress(request) {
    return request.headers["x-forwarded-for"] || request.ip;
}
exports.getIpAddress = getIpAddress;
//# sourceMappingURL=functions.js.map