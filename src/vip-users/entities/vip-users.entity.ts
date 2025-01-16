import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "vip_user" })
export class VipUser {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;
  @CreateDateColumn()
  created_at: Date;
}
