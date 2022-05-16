"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
function sleep(delayInMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delayInMilliseconds);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=timer-util.js.map