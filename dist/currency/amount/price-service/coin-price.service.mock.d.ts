import { ICurrencyPriceService, IPriceMap } from "./interfaces";
declare class MockCurrencyPriceService implements ICurrencyPriceService {
    private updateInterval;
    constructor(updateInterval: number);
    getPriceInUSD(currencySymbol: string): Promise<number>;
    subscribe(callback: (price: IPriceMap) => void): void;
}
export declare const mockCurrencyPriceService: MockCurrencyPriceService;
export {};
//# sourceMappingURL=coin-price.service.mock.d.ts.map