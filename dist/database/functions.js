"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeOrmConnectionConfig = void 0;
const config_1 = require("../config");
const defaultTypeORMOptions = {
    type: "mariadb",
    autoLoadEntities: true,
    keepConnectionAlive: true,
    logging: ["error"],
};
function getTypeOrmConnectionConfig(connectionName) {
    return Object.assign(Object.assign({}, defaultTypeORMOptions), { name: connectionName, synchronize: (0, config_1.parseBooleanFromEnv)("TYPE_ORM_SYNCHRONIZE"), host: process.env[connectionName + "_DB_HOST"], port: Number(process.env[connectionName + "_DB_PORT"]), database: process.env[connectionName + "_DB_NAME"], username: process.env[connectionName + "_DB_USER"], password: process.env[connectionName + "_DB_PASS"] });
}
exports.getTypeOrmConnectionConfig = getTypeOrmConnectionConfig;
//# sourceMappingURL=functions.js.map