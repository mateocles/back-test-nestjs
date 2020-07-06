import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";

@Entity("person")
export class person {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  @Column("varchar", { nullable: false, length: 255 })
  name: string;

  @Column("varchar", { nullable: true, length: 255 })
  lastname: string | null;

  @OneToOne(() => user, user => user.person)
  user: user;
}