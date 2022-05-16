import { ICurrencyPriceService } from "./interfaces";
declare class MockCurrencyPriceService implements ICurrencyPriceService {
    getPriceInUSD(currencySymbol: string): Promise<number>;
}
export declare const mockCurrencyPriceService: MockCurrencyPriceService;
export {};
//# sourceMappingURL=coin-price.service.mock.d.ts.map