"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddress = getIpAddress;
function getIpAddress(request) {
    return request.headers["x-forwarded-for"] || request.ip;
}
//# sourceMappingURL=functions.js.map