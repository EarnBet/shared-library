import { ICurrencyPriceService, IPriceMap } from "./interfaces";

//initial prices
const PRICES = {
  BTC: 41897.46,
  ETH: 3155.55,
  EOS: 2.8,
  BET: 0.054894,
  LTC: 130.84,
  XRP: 0.754477,
  BCH: 377.32,
  BNB: 439.21,
  WAX: 0.421,
  TRX: 0.066462,
  LINK: 28.01,
  BET_ETH: 0.054894,

  DAI: 1,
  USDC: 1,
  USDT: 1,
  USDT_TRON: 1,

  STACK: 3.11,

  EBET: 0.00001,

  USD: 1,
  FUN: 0,
};

export class MockCurrencyPriceService implements ICurrencyPriceService {
  constructor(private updateInterval: number) {}

  async getPriceInUSD(currencySymbol: string): Promise<number> {
    return PRICES[currencySymbol];
  }

  subscribe(callback: (price: IPriceMap) => void): void {
    // call fake subscriber on specified intervals with the same prices
    setInterval(() => {
      this.changePrices();
      callback(PRICES);
    }, this.updateInterval);
  }

  changePrices() {
    // change prices slightly for testing purposes
    for (const symbol in PRICES) {
      if (symbol === "USD" || symbol === "FUN") {
        continue;
      }
      const minus = Math.random() > 0.5 ? -1 : 1;
      const rnd = Math.random();
      const limiter = PRICES[symbol] * 0.01; //1% of the initial price
      const change = Math.min(limiter, rnd);

      const proposed_price = PRICES[symbol] + change * minus;

      PRICES[symbol] = Math.max(0.0001, proposed_price);
    }
  }
}
