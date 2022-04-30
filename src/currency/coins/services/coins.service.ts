import { Injectable } from "@nestjs/common";

import { CoinRepository } from "../repositories/coin.repository";
import { ICoinsService } from "./interfaces";

@Injectable()
export class CoinsService implements ICoinsService {
  constructor(private repository: CoinRepository) {}

  getAllCoins() {
    return this.repository.getAllCoins();
  }
}
