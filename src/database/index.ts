import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { parseBooleanFromEnv } from "../config";

export enum SharedDatabaseConnectionName {
  CURRENCY = "CURRENCY",
}

export const defaultTypeORMOptions: Partial<TypeOrmModuleOptions> = {
  type: "mariadb",
  autoLoadEntities: true,
  keepConnectionAlive: true,
  logging: ["error"],
};

export function getTypeOrmConnectionConfig(
  connectionName: SharedDatabaseConnectionName
): TypeOrmModuleOptions {
  return {
    ...defaultTypeORMOptions,

    name: connectionName,
    // *** NOTE: we need to properly cast to boolean here! ***
    // IF NOT, then we run the risk of deleting all the data in the production database!!!
    synchronize: parseBooleanFromEnv("TYPE_ORM_SYNCHRONIZE"),
    /**/

    host: process.env[connectionName + "_DB_HOST"],
    port: Number(process.env[connectionName + "_DB_PORT"]),
    database: process.env[connectionName + "_DB_NAME"],
    username: process.env[connectionName + "_DB_USER"],
    password: process.env[connectionName + "_DB_PASS"],
  } as any;
}
