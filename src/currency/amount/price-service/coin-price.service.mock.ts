import { ICurrencyPriceService, IPriceMap } from "./interfaces";

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
  STACK: 3.11,

  EBET: 0.00001,

  USD: 1,
  FUN: 0,
};

class MockCurrencyPriceService implements ICurrencyPriceService {
  async getPriceInUSD(currencySymbol: string): Promise<number> {
    return PRICES[currencySymbol];
  }

  subscribe(callback: (price: IPriceMap) => void): void {
    // fake subscriber
  }
}

export const mockCurrencyPriceService = new MockCurrencyPriceService();
