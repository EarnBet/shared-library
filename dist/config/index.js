"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBooleanFromEnv = parseBooleanFromEnv;
function parseBooleanFromEnv(VARIABLE_NAME) {
    return process.env[VARIABLE_NAME] === "true";
}
//# sourceMappingURL=index.js.map