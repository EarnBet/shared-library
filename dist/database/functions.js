"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConnectionConfig = getTypeOrmConnectionConfig;
exports.escapeStringInput = escapeStringInput;
const SqlString = __importStar(require("sqlstring"));
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const config_1 = require("../config");
const defaultTypeORMOptions = {
    type: "mariadb",
    autoLoadEntities: true,
    keepConnectionAlive: false,
    logging: ["error"],
};
function getTypeOrmConnectionConfig(connectionName) {
    return Object.assign(Object.assign({}, defaultTypeORMOptions), { name: connectionName, synchronize: (0, config_1.parseBooleanFromEnv)("TYPE_ORM_SYNCHRONIZE"), host: process.env[connectionName + "_DB_HOST"], port: Number(process.env[connectionName + "_DB_PORT"]), database: process.env[connectionName + "_DB_NAME"], username: process.env[connectionName + "_DB_USER"], password: process.env[connectionName + "_DB_PASS"], namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy() });
}
function escapeStringInput(input) {
    return SqlString.escape(input);
}
//# sourceMappingURL=functions.js.map