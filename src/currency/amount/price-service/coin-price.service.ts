import { httpGetJson } from "../../../util/http-util";
import { ICoinsService } from "../../coins/services/interfaces";
import { ICurrencyPriceService } from "./interfaces";

class CoinPriceService implements ICurrencyPriceService {
  private symbols: string[] = [];
  private prices: { [coin: string]: number } = {};

  constructor() {}

  async init(database: ICoinsService) {
    const coins = await database.getAllCoins();

    this.symbols = coins.map((row) => row.symbol);

    setInterval(this.updateCoinPrices, 1000 * 60 * 60);

    await this.updateCoinPrices();
  }

  private updateCoinPrices = async () => {
    for (let symbol of this.symbols) {
      symbol = symbol.split("_")[0];

      const price = await fetchPriceOfCoin(symbol);

      if (price != undefined) {
        this.prices[symbol] = price;
      }
    }
  };

  async getPriceInUSD(symbol: string): Promise<number> {
    symbol = symbol.split("_")[0];

    if (symbol == "FUN") {
      return 0;
    }

    if (symbol == "USD") {
      return 1;
    }

    const price = this.prices[symbol.toUpperCase()];

    if (price == undefined) {
      console.log(this.prices);

      throw new Error(symbol + " Price is UNDEFINED!");
    }

    return price;
  }
}

let coinPriceService: CoinPriceService;

export async function getRealCoinPriceService(
  database: ICoinsService
): Promise<ICurrencyPriceService> {
  if (coinPriceService == undefined) {
    coinPriceService = new CoinPriceService();

    await coinPriceService.init(database);
  }

  return coinPriceService;
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
