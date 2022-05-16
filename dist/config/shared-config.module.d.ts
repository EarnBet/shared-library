import { DynamicModule } from "@nestjs/common";
import { SharedConfigService } from "./shared-config.service";
export declare class SharedConfigModule {
    static forRoot(envFileRelativePath?: string): DynamicModule;
    constructor(service: SharedConfigService);
}
//# sourceMappingURL=shared-config.module.d.ts.map