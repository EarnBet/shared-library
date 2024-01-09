import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "username_banned_word" })
export class UsernameBannedWord {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({
    unique: true,
  })
  word: string;
}
