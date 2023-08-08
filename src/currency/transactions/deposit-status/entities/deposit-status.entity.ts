import { Column, Entity } from "typeorm";
import { ISavedDepositStatusRow } from "./interfaces";

@Entity({ name: "deposit_status" })
export class DepositStatus implements ISavedDepositStatusRow {
  @Column({ type: "int", nullable: false, primary: true })
  transaction_id: number;

  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({
    type: "decimal",
    nullable: false,
    precision: 40,
    scale: 20,
  })
  decimal_amount: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  currency_symbol: string;

  @Column({ type: "decimal", default: null, precision: 40, scale: 20 })
  usd_amount: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  transaction_hash: string;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP()",
  })
  created_at: Date;

  @Column({ type: "datetime", default: null })
  notified_as_pending_at: Date;

  @Column({ type: "datetime", default: null })
  confirmed_at: Date;

  @Column({ type: "datetime", default: null })
  credited_at: Date;
}
