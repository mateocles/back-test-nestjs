import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, CreateDateColumn } from "typeorm";
import { person } from "./person";
import { role } from "./role";

@Entity("user")
export class user {

  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", { nullable: false, length: 50 })
  email: string;

  @Column("varchar", { select: false, nullable: false, length: 200 })
  password: string;

  @Column("varchar", { nullable: false, length: 10, default: 'active' })
  state: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => role, role => role.user)
  roles: role[];

  @OneToOne(() => person, person => person.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'fk_person' })
  person: person;



}