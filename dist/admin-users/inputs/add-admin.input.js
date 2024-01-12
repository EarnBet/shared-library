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
exports.AddAdminUserInput = void 0;
const class_validator_1 = require("class-validator");
const auth_inputs_1 = require("../../auth/inputs/auth.inputs");
const decorators_1 = require("../../validation/decorators");
const add_admin_validator_1 = require("../validators/add-admin.validator");
class AddAdminUserInput extends auth_inputs_1.InputFromAuthorizedUser {
}
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.admin_user_id == undefined),
    (0, decorators_1.IsValidEmailFormat)(),
    __metadata("design:type", String)
], AddAdminUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.email == undefined),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddAdminUserInput.prototype, "admin_user_id", void 0);
__decorate([
    (0, class_validator_1.Validate)(add_admin_validator_1.AddAdminUserValidator),
    __metadata("design:type", String)
], AddAdminUserInput.prototype, "errorMessage", void 0);
exports.AddAdminUserInput = AddAdminUserInput;
//# sourceMappingURL=add-admin.input.js.map