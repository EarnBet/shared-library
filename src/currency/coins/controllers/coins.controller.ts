import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CoinsService } from "../services/coins.service";

@ApiTags("coins")
@Controller("coins")
export class CoinsController {
  constructor(private coinsService: CoinsService) {}

  @Get("all")
  async getAllCoins() {
    return await this.coinsService.getAllCoins();
  }
}
