import { Column, Entity,OneToOne,PrimaryGeneratedColumn, JoinColumn, OneToMany} from "typeorm";
import { person } from "./person";
import {rol} from "./rol";


@Entity("user", { schema: "public" })
export class user {

    @PrimaryGeneratedColumn({type: "bigint"})
    id: string;

    @Column("character varying", { nullable: false,length: 200})
    email: string;

    @Column("text", {select: false,nullable: false})
    password: string;

    @Column("character varying", {nullable: false,length: 10})
    state: string;

    @Column("timestamp without time zone", { nullable: false,})
    date_registration: Date;   
    
    @OneToOne(() => person, person => person.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name:'fk_person'})
    person: person;
    
    @OneToMany(() => rol, rol => rol.user,)
    roles: rol[];

}