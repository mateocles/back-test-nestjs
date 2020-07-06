import {  Column,  Entity,  Index,  JoinColumn,  ManyToOne,  PrimaryGeneratedColumn} from 'typeorm';
import { permission } from './permission';
import { rol } from './rol';

@Index('permission_rol_pkey', ['id'], { unique: true })
@Entity('permission_rol')
export class permission_rol {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  
  @Column('varchar', { nullable: true, length: 255, default: 'active' })
  state: string | null;

  @ManyToOne(() => permission, permission => permission.permissionRoles,{ onUpdate: 'CASCADE' },)
  @JoinColumn([{ name: 'fk_permission', referencedColumnName: 'id' }])
  permission: permission;
  
  @ManyToOne(() => rol, rol => rol.permissionRols, { onUpdate: 'CASCADE' })
  @JoinColumn([{ name: 'fk_rol', referencedColumnName: 'id' }])
  rol: rol;
}