"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const error_codes_1 = require("./error-codes");
class GenericApplicationError extends Error {
    constructor(statusCode, data) {
        super();
        this.statusCode = statusCode;
        this.data = data;
    }
}
class ApplicationError extends GenericApplicationError {
    constructor(statusCode) {
        super(statusCode, null);
    }
}
class UnauthorizedError extends ApplicationError {
    constructor() {
        super(error_codes_1.ApplicationErrorCode.UNAUTHORIZED);
        this.message = "Unauthorized";
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=application-errors.js.map