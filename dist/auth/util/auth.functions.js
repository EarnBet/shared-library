"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizedUserIdForValidator = exports.generateAuthToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateAuthToken = (user) => {
    const newData = {
        user_id: user.id,
        username: user.username,
    };
    return (0, jsonwebtoken_1.sign)(newData, process.env.JWT_SECRET);
};
exports.generateAuthToken = generateAuthToken;
function getAuthorizedUserIdForValidator(validationArguments) {
    const userData = validationArguments.object
        ._authorizedUserData;
    return userData.user_id;
}
exports.getAuthorizedUserIdForValidator = getAuthorizedUserIdForValidator;
//# sourceMappingURL=auth.functions.js.map