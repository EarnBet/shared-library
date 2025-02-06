import { sleep } from "../../../util/timer-util";
import { httpGetJson } from "../../../util/http-util";
import { ICoinsService } from "../../coins/services/interfaces";
import { ICurrencyPriceService } from "./interfaces";

import { EventEmitter } from "events"; //we'll use built-in EventEmitter instead of the one from NestJS
import { SharedLibraryEvent } from "src/events";

class CoinPriceService implements ICurrencyPriceService {
  //this class should be used in factory pattern
  private symbols: string[] = [];
  private prices: { [coin: string]: number } = {};

  private isInit = false;

  private eventEmitter: EventEmitter;

  constructor(database: ICoinsService) {
    this.eventEmitter = new EventEmitter();
    this.init(database);
  }

  subscribe(subscriber: (...args: any[]) => void) {
    this.eventEmitter.on(SharedLibraryEvent.COIN_PRICE_UPDATED, subscriber);
  }

  private async init(database: ICoinsService) {
    const coins = await database.getAllCoins();

    this.symbols = coins.map((row) => row.symbol);

    setInterval(this.updateCoinPrices, 1000 * 60 * 60);

    await this.updateCoinPrices();

    console.log("CoinPriceService initialized: ", this.prices);

    this.isInit = true;
  }

  private updateCoinPrices = async () => {
    for (let symbol of this.symbols) {
      symbol = symbol.split("_")[0];

      const price = await fetchPriceOfCoin(symbol);

      if (price != undefined) {
        this.prices[symbol] = price;
      }
    }

    this.eventEmitter.emit(SharedLibraryEvent.COIN_PRICE_UPDATED, this.prices);
  };

  async getPriceInUSD(symbol: string): Promise<number> {
    await this.waitForInit();

    symbol = symbol.split("_")[0];

    if (symbol == "FUN") {
      return 0;
    }

    if (symbol == "USD") {
      return 1;
    }

    const price = this.prices[symbol.toUpperCase()];

    if (price == undefined) {
      console.log({ prices: this.prices });

      throw new Error(symbol + " Price is UNDEFINED!");
    }

    return price;
  }

  private async waitForInit() {
    while (!this.isInit) {
      await sleep(10);
    }
  }
}

interface ICoinPriceData {
  price: number;
}

async function fetchPriceOfCoin(symbol: string): Promise<number> {
  const priceServerHost =
    process.env.CURRENCY_PRICE_SERVER_HOST || "internal.eosbet.io";

  const url = priceServerHost + "/token_price/" + symbol.toUpperCase();

  try {
    const data = await httpGetJson<ICoinPriceData>(url);
    // console.log(data);

    return Number(data.price);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}

let coinPriceService: CoinPriceService;

export function getRealCoinPriceService(
  database: ICoinsService
): ICurrencyPriceService {
  if (coinPriceService == undefined) {
    coinPriceService = new CoinPriceService(database);
  }

  return coinPriceService;
}
