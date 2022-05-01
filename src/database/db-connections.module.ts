import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedConfigModule } from "../config/shared-config.module";

import { SharedDatabaseConnectionName } from "./constants";
import { getTypeOrmConnectionConfig } from "./functions";

@Module({})
export class SharedDatabaseConnectionsModule {
  /**
   * creates database connections forRoot
   *
   * @param envFileRelativePath - a path to the .env file relative to the working directory of the node.js process, defaults to ".env"
   * @returns a dynamic DatabaseConnectionsModule
   */
  static forRoot(envFileRelativePath: string = ".env"): DynamicModule {
    return {
      module: SharedDatabaseConnectionsModule,
      imports: [
        SharedConfigModule.forRoot(envFileRelativePath),

        TypeOrmModule.forRoot(
          getTypeOrmConnectionConfig(SharedDatabaseConnectionName.CURRENCY)
        ),
      ],
      exports: [SharedConfigModule, TypeOrmModule],
    };
  }
}
