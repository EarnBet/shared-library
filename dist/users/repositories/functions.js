"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whereClauseForSimilarUsername = whereClauseForSimilarUsername;
const typeorm_1 = require("typeorm");
const emoji_regex_1 = __importDefault(require("emoji-regex"));
const functions_1 = require("../../database/functions");
function whereClauseForSimilarUsername({ columnName, username, }) {
    return {
        [columnName]: (0, typeorm_1.Raw)(() => `REGEXP_REPLACE( CONVERT( LOWER(${columnName}) USING utf8), '\\\\?', '')  = ${(0, functions_1.escapeStringInput)(username.replace((0, emoji_regex_1.default)(), "").toLowerCase())}`),
    };
}
//# sourceMappingURL=functions.js.map