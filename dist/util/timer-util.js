"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
function sleep(delayInMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delayInMilliseconds);
    });
}
//# sourceMappingURL=timer-util.js.map