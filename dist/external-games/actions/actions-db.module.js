"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalGameActionsDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const action_repository_1 = require("./repositories/action.repository");
const softswiss_connection_module_1 = require("../../database/softswiss-connection.module");
const action_group_entity_1 = require("./entities/action-group.entity");
const action_entity_1 = require("./entities/action.entity");
let ExternalGameActionsDatabaseModule = class ExternalGameActionsDatabaseModule {
};
exports.ExternalGameActionsDatabaseModule = ExternalGameActionsDatabaseModule;
exports.ExternalGameActionsDatabaseModule = ExternalGameActionsDatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            softswiss_connection_module_1.SoftswissDatabaseConnectionModule,
            typeorm_1.TypeOrmModule.forFeature([action_entity_1.ExternalGameAction, action_group_entity_1.ExternalGameActionGroup]),
        ],
        providers: [action_repository_1.ExternalGameActionRepository],
        exports: [action_repository_1.ExternalGameActionRepository],
    })
], ExternalGameActionsDatabaseModule);
//# sourceMappingURL=actions-db.module.js.map