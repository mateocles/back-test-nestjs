import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { permission } from './permission';
import { role } from './role';

@Index('permission_rol_pkey', ['id'], { unique: true })
@Entity('permission_roel')
export class permission_role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { nullable: true, length: 255, default: 'active' })
  state: string | null;

  @ManyToOne(() => permission, permission => permission.permissionRoles, { onUpdate: 'CASCADE' },)
  @JoinColumn([{ name: 'fk_permission', referencedColumnName: 'id' }])
  permission: permission;

  @ManyToOne(() => role, role => role.permissionRoles, { onUpdate: 'CASCADE' })
  @JoinColumn([{ name: 'fk_role', referencedColumnName: 'id' }])
  role: role;
}