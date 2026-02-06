import { ExternalGameActionGroup } from "./action-group.entity";
export declare class ExternalGameAction {
    id: number;
    action_group_id: number;
    user_id: number;
    action_id: string;
    type: string;
    currency_symbol: string;
    amount_integer: string;
    amount_decimal: string;
    jackpot_contribution: string;
    jackpot_win: string;
    original_action_id: string;
    rolled_back_at: Date;
    group: ExternalGameActionGroup;
}
//# sourceMappingURL=action.entity.d.ts.map