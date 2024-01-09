"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassSync = exports.bcryptCheckPass = exports.hashPass = void 0;
const bcryptjs_1 = require("bcryptjs");
const hashPass = async (password) => {
    const salt = await (0, bcryptjs_1.genSalt)(10);
    return await (0, bcryptjs_1.hash)(password, salt);
};
exports.hashPass = hashPass;
const bcryptCheckPass = async (userPassword, hashedPass) => {
    return await (0, bcryptjs_1.compare)(userPassword, hashedPass);
};
exports.bcryptCheckPass = bcryptCheckPass;
const hashPassSync = (password) => {
    const salt = (0, bcryptjs_1.genSaltSync)(10);
    return (0, bcryptjs_1.hashSync)(password, salt);
};
exports.hashPassSync = hashPassSync;
//# sourceMappingURL=bcrypt.functions.js.map