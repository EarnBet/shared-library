import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { IAuthenticatedUser } from "../../auth/util/interfaces";

@Entity({ name: "user" })
export class User implements IAuthenticatedUser {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({
    nullable: false,
    unique: true,
    length: 100,
    collation: "utf8mb4_unicode_ci",
    transformer: {
      to: (value: string | null) => {
        return value && value.trim ? value.trim() : value;
      },
      from: (value: string) => value,
    },
  })
  username: string;

  @Column({
    nullable: false,
    length: 100,
  })
  password: string;

  @Column({ nullable: false, length: 30 })
  ip: string;

  @Column({ nullable: false, type: "date" })
  date_of_birth: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    nullable: true,
    unique: false,
    length: 100,
    transformer: {
      to: (value: string | null) => {
        return value ? value.toLowerCase().trim() : value;
      },
      from: (value: string) => value,
    },
  })
  email?: string;

  @Column({
    type: "datetime",
    nullable: true,
    default: null,
  })
  email_verified_at: string;

  @Column({ type: "varchar", length: 1, nullable: true })
  gender: string;

  @Column({ type: "varchar", length: 2, nullable: true })
  country: string;

  @UpdateDateColumn()
  updated_at: Date;
}
