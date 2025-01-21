import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

export enum VipMode {
  ON = 1,
  OFF = 2,
}

@Entity({ name: "vip_user" })
export class VipUser {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;

  @Column({ type: "smallint", default: VipMode.ON })
  status: VipMode;

  @CreateDateColumn()
  created_at: Date;
}
