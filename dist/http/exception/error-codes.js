"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationErrorCode = void 0;
var ApplicationErrorCode;
(function (ApplicationErrorCode) {
    ApplicationErrorCode[ApplicationErrorCode["UNAUTHORIZED"] = 600] = "UNAUTHORIZED";
    ApplicationErrorCode[ApplicationErrorCode["USERNAME_ALREADY_EXISTS"] = 601] = "USERNAME_ALREADY_EXISTS";
    ApplicationErrorCode[ApplicationErrorCode["INCORRECT_USERNAME_OR_PASSWORD"] = 602] = "INCORRECT_USERNAME_OR_PASSWORD";
    ApplicationErrorCode[ApplicationErrorCode["EMAIL_MUST_BE_CONFIRMED"] = 603] = "EMAIL_MUST_BE_CONFIRMED";
    ApplicationErrorCode[ApplicationErrorCode["INVALID_TOKEN"] = 604] = "INVALID_TOKEN";
    ApplicationErrorCode[ApplicationErrorCode["EXPIRED_TOKEN"] = 605] = "EXPIRED_TOKEN";
    ApplicationErrorCode[ApplicationErrorCode["EMAIL_ALREADY_EXISTS"] = 606] = "EMAIL_ALREADY_EXISTS";
    ApplicationErrorCode[ApplicationErrorCode["INSUFFICIENT_FUNDS"] = 607] = "INSUFFICIENT_FUNDS";
    ApplicationErrorCode[ApplicationErrorCode["UNABLE_TO_PERFORM_UNSTAKING_REQUEST"] = 608] = "UNABLE_TO_PERFORM_UNSTAKING_REQUEST";
})(ApplicationErrorCode = exports.ApplicationErrorCode || (exports.ApplicationErrorCode = {}));
//# sourceMappingURL=error-codes.js.map