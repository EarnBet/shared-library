"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereClauseForSimilarUsername = void 0;
const emoji_regex_1 = require("emoji-regex");
const functions_1 = require("../../database/functions");
function whereClauseForSimilarUsername({ columnName, username, }) {
    return `REGEXP_REPLACE( CONVERT( LOWER(${columnName}) USING utf8), '\\\\?', '')  = ${(0, functions_1.escapeStringInput)(username.replace((0, emoji_regex_1.default)(), "").toLowerCase())}`;
}
exports.whereClauseForSimilarUsername = whereClauseForSimilarUsername;
//# sourceMappingURL=functions.js.map