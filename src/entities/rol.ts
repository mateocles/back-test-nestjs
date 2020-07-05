import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { permission_rol } from '../entities/permission_rol';
import { user } from '../entities/user';
@Index('rol_pkey', ['id'], { unique: true })
@Entity('rol', { schema: "public" })

export class rol {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { nullable: true, length: 255 })
  name: string | null;

  @Column('character varying', { nullable: true, length: 255 })
  key: string | null;

  @Column('character varying', { nullable: true, length: 10, default: 'active' })
  state: string | null;

  @Column('character varying', { nullable: true, length: 1000 })
  description: string | null;

  @OneToMany(() => permission_rol,permission_rol => permission_rol.rol)
  permissionRols: permission_rol[];

  @ManyToOne(() => user,user => user.roles,{ onUpdate: 'CASCADE' },)
  @JoinColumn([{ name: 'fk_user', referencedColumnName: 'id' }])
  user: user;

}