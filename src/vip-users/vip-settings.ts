import Big from "big.js";

export class VipSettings {
  static depositBonusPercentage: number = 20;
  static rakeback: number = 62.5;
  static minimumWagerAmountToBecomeVip: number = 1000000;
  static minimumBetAmountUsd: number = 100;

  static minimumBetToTokens(token_price: number, precision: number): number {
    return new Big(VipSettings.minimumBetAmountUsd)
      .div(token_price)
      .round(precision, Big.roundDown)
      .toNumber();
  }
}
