"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const application_errors_1 = require("../../http/exception/application-errors");
const auth_service_1 = require("../services/auth.service");
let AuthGuard = class AuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userData = this.getAuthorizedUserData(request.headers);
        console.log({ userData });
        if (!userData || !userData.user_id) {
            throw new application_errors_1.UnauthorizedError();
        }
        request.authorizedUserData = userData;
        return true;
    }
    getAuthorizedUserData(headers) {
        const token = getAuthTokenFromRequestHeaders(headers);
        return token ? this.authService.getUserDataFromToken(token) : null;
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
function getAuthTokenFromRequestHeaders(headers) {
    if ((headers === null || headers === void 0 ? void 0 : headers.authorization) || (headers === null || headers === void 0 ? void 0 : headers.Authorization)) {
        let auth;
        if (headers.authorization)
            auth = headers.authorization;
        if (headers.Authorization)
            auth = headers.Authorization;
        return auth.split(" ")[1];
    }
    return null;
}
//# sourceMappingURL=auth.guard.js.map