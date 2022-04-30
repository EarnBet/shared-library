export interface ICurrencyPriceService {
  // init():Promise<void>;
  getPriceInUSD(currencySymbol: string): Promise<number>;
}
