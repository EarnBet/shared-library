export interface ICurrencyPriceService {
  getPriceInUSD(currencySymbol: string): Promise<number>;
  subscribe(callback: (price: number) => void): void;
}
