import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../entities/user';
import { person } from '../entities/person';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user) private readonly userRepository: Repository<user>,
    @InjectRepository(person) private readonly personRepository: Repository<person>,
  ) { }

  async getPermissions(id: number) {
    const user = await this.userRepository.find({
      relations: ['roles', 'roles.permissionRoles', 'roles.permissionRoles.permission'],
      where: { user: { id }, state: 'active' }
    });
    if (!user)
      return { error: 'USER_NOT_EXIST', detail: 'Usuario no existe o se encuentra inactivo.' };
    const roles = [];
    const permissions = [];
    user.map(item => {
     /* item.roles.map(item2 => {
        roles.push(item2.key);
        item2.permissionRol.map(item3 => {
          permissions.push(item3.permission.key);
        });
      });*/
    });
    return { roles, permissions }
  }

  async getUsers(){
    return await this.userRepository.find({})

  }


}
