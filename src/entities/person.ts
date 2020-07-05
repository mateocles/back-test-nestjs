import { Column, Entity, JoinColumn, OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";


@Entity("person", { schema: "public" })
export class person {

  @PrimaryGeneratedColumn({type: "bigint"})
  id: string;

  @Column("character varying", {nullable: false,length: 255})
  name: string;

  @Column("character varying", {nullable: true,length: 255})
  lastname: string | null;

  @OneToOne(() => user, user => user.person, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

  @JoinColumn({ name: 'fk_user' })
  user: user | null;
}