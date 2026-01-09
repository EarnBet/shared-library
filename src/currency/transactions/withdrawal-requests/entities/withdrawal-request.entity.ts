import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../../../../users/entities/user.entity";
import { DateTimeColumn } from "../../../../database/date-util";

@Entity({ name: "withdrawal_request" })
export class WithdrawalRequest {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @DateTimeColumn({
    type: "timestamp",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP()",
  })
  requested_at: Date;

  @Index()
  @Column({ type: "int", unsigned: true, nullable: false })
  user_id: number;

  @Column({ type: "varchar", length: 10, nullable: false })
  currency_symbol: string;

  @Column({ type: "decimal", precision: 40, scale: 20, nullable: false })
  decimal_amount: string;

  @Column({ type: "decimal", precision: 20, scale: 6, nullable: false })
  usd_amount: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  withdraw_address: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  withdraw_memo: string;

  @Column({ type: "int", unsigned: true, nullable: false })
  confirmation_token_id: number;

  @Column({ type: "tinyint", unsigned: true, nullable: false, default: 1 })
  is_on_hold: number;

  @Column({ type: "datetime", nullable: true })
  confirmed_at: Date;

  @Column({ type: "int", unsigned: true, nullable: true })
  confirmed_by_user_id: number;

  @Column({ type: "datetime", nullable: true })
  approved_at: Date;

  @Column({ type: "int", unsigned: true, nullable: true })
  approved_by_user_id: number;

  @Column({ type: "datetime", nullable: true })
  reprocessed_at: Date;

  @Column({ type: "int", unsigned: true, nullable: true })
  reprocessed_by_user_id: number;

  @Column({ type: "datetime", nullable: true })
  processed_at: Date;

  @Column({ type: "datetime", nullable: true })
  insufficient_funds_at: Date;

  @Column({ type: "text", nullable: true })
  error_message: string;

  @Column({ type: "datetime", nullable: true })
  cancelled_at: Date;

  @Column({ type: "int", unsigned: true, nullable: true })
  cancelled_by_user_id: number;

  @Column({ type: "datetime", nullable: true })
  refunded_at: Date;

  @Column({ type: "int", unsigned: true, nullable: true })
  refunded_by_user_id: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  transaction_hash: string;

  @Column({ type: "int", unsigned: true, nullable: true })
  transaction_id: number;

  @OneToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}
