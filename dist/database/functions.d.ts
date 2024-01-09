import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SharedDatabaseConnectionName } from "./constants";
export declare function getTypeOrmConnectionConfig(connectionName: SharedDatabaseConnectionName): TypeOrmModuleOptions;
export declare function escapeStringInput(input: string): string;
//# sourceMappingURL=functions.d.ts.map