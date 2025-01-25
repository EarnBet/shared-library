import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

import * as SqlString from "sqlstring";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { parseBooleanFromEnv } from "../config";
import { SharedDatabaseConnectionName } from "./constants";

export function getTypeOrmConnectionConfig(
  connectionName: SharedDatabaseConnectionName,
  charset?: string,
  connectionLimit = 10
): TypeOrmModuleOptions {
  const moduleOptions: TypeOrmModuleOptions = {
    autoLoadEntities: true,
    keepConnectionAlive: false,
    logging: ["error"],
  };

  const connectionOptions: MysqlConnectionOptions = {
    type: "mariadb",

    host: process.env[connectionName + "_DB_HOST"],
    port: Number(process.env[connectionName + "_DB_PORT"]),
    database: process.env[connectionName + "_DB_NAME"],
    username: process.env[connectionName + "_DB_USER"],
    password: process.env[connectionName + "_DB_PASS"],

    charset,

    extra: {
      connectionLimit, // Increase the pool size
      maxIdle: 1, // max idle connections, the default value is the same as `connectionLimit`
      idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
      waitForConnections: true, // Wait for a connection if the pool is exhausted
      queueLimit: 0, // No limit to queued connection requests
      //acquireTimeout: 30000, // Timeout for acquiring a connection
    },
  };

  return {
    ...moduleOptions,

    name: connectionName,
    // *** NOTE: we need to properly cast to boolean here! ***
    // IF NOT, then we run the risk of deleting all the data in the production database!!!
    synchronize: parseBooleanFromEnv("TYPE_ORM_SYNCHRONIZE"),
    /**/

    ...connectionOptions,

    namingStrategy: new SnakeNamingStrategy(),
  } as any;
}

export function escapeStringInput(input: string) {
  return SqlString.escape(input);
}
