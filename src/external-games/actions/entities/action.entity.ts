import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExternalGameActionGroup } from "./action-group.entity";

@Entity("external_game_action")
export class ExternalGameAction {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: false })
  action_group_id: number;

  @Column({ type: "int", unsigned: true, nullable: true })
  user_id: number;

  @Column({ type: "varchar", length: 256, nullable: false, unique: true })
  action_id: string; //Required id of the action on GCP side.

  @Column({ type: "varchar", length: 100, nullable: false })
  type: string; //Required "bet" , "win", rollback , cancelled_win , cancelled_bet

  @Column({ type: "varchar", length: 10, nullable: false })
  currency_symbol: string;

  @Column({ name: "amount", type: "bigint", nullable: true })
  amount_integer: string; // Required not negative amount in subunits

  @Column({ type: "decimal", precision: 40, scale: 20, nullable: true })
  amount_decimal: string;

  @Column({ type: "int", default: 0 })
  jackpot_contribution: string; //Optional jackpot contribution of the bet. Amount provided in subunits with 3 decimal places (check the example below). May beomitted.

  @Column({ type: "int", default: 0 })
  jackpot_win: string; //Optional Not negative amount in subunits.

  @Column({ type: "varchar", length: 256, nullable: true })
  original_action_id: string;

  @Column({ type: "datetime", nullable: true })
  rolled_back_at: Date;

  @ManyToOne(() => ExternalGameActionGroup, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "action_group_id" })
  group: ExternalGameActionGroup;
}
