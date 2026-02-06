export interface IPriceMap {
  [coin: string]: number;
}

export interface ICurrencyPriceService {
  getPriceInUSD(currencySymbol: string): Promise<number>;
  subscribe(callback: (price: IPriceMap) => void): void;
}
