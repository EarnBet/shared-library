import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SharedConfigModule } from "../config/shared-config.module";

import { getTypeOrmConnectionConfig, SharedDatabaseConnectionName } from ".";

@Module({})
export class DatabaseConnectionsModule {
  /**
   * creates database connections forRoot
   *
   * @param envFileRelativePath - a path to the .env file relative to the working directory of the node.js process, defaults to ".env"
   * @returns a dynamic DatabaseConnectionsModule
   */
  static forRoot(envFileRelativePath: string = ".env"): DynamicModule {
    return {
      module: DatabaseConnectionsModule,
      imports: [
        SharedConfigModule.forRoot(envFileRelativePath),

        TypeOrmModule.forRoot(
          getTypeOrmConnectionConfig(SharedDatabaseConnectionName.CURRENCY)
        ),
      ],
      exports: [SharedConfigModule],
    };
  }
}
