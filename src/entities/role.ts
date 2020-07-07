import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { permission_role } from './permission_role';
import { user } from './user';

@Index('rol_pkey', ['id'], { unique: true })
@Entity('role')
export class role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { nullable: true, length: 255 })
  key: string | null;

  @Column('varchar', { nullable: true, length: 10, default: 'active' })
  state: string | null;

  @Column('varchar', { nullable: true, length: 1000 })
  description: string | null;

  @OneToMany(() => permission_role,permission_role => permission_role.role)
  permissionRoles: permission_role[];

  @ManyToOne(() => user, user => user.roles, { onUpdate: 'CASCADE' },)
  @JoinColumn([{ name: 'fk_user', referencedColumnName: 'id' }])
  user: user;

}