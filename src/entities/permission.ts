import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { permission_rol } from '../entities/permission_rol';

@Index('permission_pkey', ['id'], { unique: true })
@Entity('permission', { schema: "public" })

export class permission {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('character varying', { nullable: true, length: 255 })
  name: string | null;

  @Column('character varying', { nullable: true, length: 255 })
  key: string | null;

  @Column('character varying', { nullable: true, length: 20, default: 'active' })
  state: string | null;

  @OneToMany(() => permission_rol,permission_rol => permission_rol.permission,)
  permissionRoles: permission_rol[];
}