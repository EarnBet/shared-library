import { Test } from "@nestjs/testing";

import { SharedConfigModule } from "../../src/config/shared-config.module";

(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [SharedConfigModule.forRoot("test.env")],
  }).compile();
})();
