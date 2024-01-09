"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateAuthToken = (user) => {
    const newData = {
        user_id: user.id,
        username: user.username,
    };
    return (0, jsonwebtoken_1.sign)(newData, process.env.JWT_SECRET);
};
exports.generateAuthToken = generateAuthToken;
//# sourceMappingURL=auth.functions.js.map