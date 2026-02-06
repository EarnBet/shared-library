import { ICurrencyPriceService, IPriceMap } from "./interfaces";
export declare class MockCurrencyPriceService implements ICurrencyPriceService {
    private updateInterval;
    constructor(updateInterval: number);
    getPriceInUSD(currencySymbol: string): Promise<number>;
    subscribe(callback: (price: IPriceMap) => void): void;
    changePrices(): void;
}
//# sourceMappingURL=coin-price.service.mock.d.ts.map