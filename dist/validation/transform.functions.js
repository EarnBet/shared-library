"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimTransform = trimTransform;
exports.lowercaseTransform = lowercaseTransform;
exports.emailTransform = emailTransform;
function trimTransform({ value }) {
    return value.trim();
}
function lowercaseTransform({ value }) {
    return value.toLowerCase();
}
function emailTransform({ value }) {
    return value ? value.toLowerCase().trim() : value;
}
//# sourceMappingURL=transform.functions.js.map