import { Column, Entity, PrimaryColumn } from "typeorm";
import { ISavedCoinRow } from "./interfaces";

@Entity({ name: "coin" })
export class Coin implements ISavedCoinRow {
  @PrimaryColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 10, nullable: false })
  symbol: string;

  @Column({ type: "int", nullable: false })
  precision: number;

  @Column({ type: "tinyint", unsigned: true, nullable: false })
  uses_memo_for_deposits: number;

  @Column({ type: "decimal", nullable: false, precision: 40, scale: 20 })
  minimum_withdrawal_amount: string;
}
