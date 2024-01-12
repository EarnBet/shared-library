import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/user.entity";

import { AdminUserRole } from "./admin-roles";

@Entity({ name: "admin_user" })
export class AdminUser {
  @PrimaryColumn({ type: "int" })
  user_id: number;

  @Column({
    type: "int",
    nullable: false,
    default: AdminUserRole.REGULAR_ADMIN,
  })
  role: number;

  @Column({ type: "int", nullable: false })
  added_by_user_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
  added_at: Date;

  @UpdateDateColumn({ type: "datetime", default: null })
  updated_at: Date;

  @OneToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}
