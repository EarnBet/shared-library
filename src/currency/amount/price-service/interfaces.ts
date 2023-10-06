export interface ICurrencyPriceService {
  getPriceInUSD(currencySymbol: string): Promise<number>;
}
