import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("external_game_action_group")
export class ExternalGameActionGroup {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({ type: "varchar", length: 256, nullable: false })
  username: string;

  @Column({ type: "varchar", length: 256, nullable: false })
  game_identifier: string;

  @CreateDateColumn({
    type: "datetime",
    nullable: false,
  })
  processed_at: Date;
}
