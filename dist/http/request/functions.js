"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddress = getIpAddress;
function getIpAddress(request) {
    const forwardedForIps = request.headers["x-forwarded-for"];
    const firstForwardedForIp = forwardedForIps
        ? forwardedForIps.split(",")[0].trim()
        : null;
    return firstForwardedForIp || request.ip;
}
//# sourceMappingURL=functions.js.map