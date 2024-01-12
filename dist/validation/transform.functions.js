"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTransform = exports.lowercaseTransform = exports.trimTransform = void 0;
function trimTransform({ value }) {
    return value.trim();
}
exports.trimTransform = trimTransform;
function lowercaseTransform({ value }) {
    return value.toLowerCase();
}
exports.lowercaseTransform = lowercaseTransform;
function emailTransform({ value }) {
    return value ? value.toLowerCase().trim() : value;
}
exports.emailTransform = emailTransform;
//# sourceMappingURL=transform.functions.js.map