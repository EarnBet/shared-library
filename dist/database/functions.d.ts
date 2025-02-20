import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SharedDatabaseConnectionName } from "./constants";
export declare function getTypeOrmConnectionConfig(connectionName: SharedDatabaseConnectionName, charset?: string, connectionLimit?: number): TypeOrmModuleOptions;
export declare function escapeStringInput(input: string): string;
//# sourceMappingURL=functions.d.ts.map