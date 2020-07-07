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
    const user = await this.userRepository.createQueryBuilder("user")
      .innerJoinAndSelect("user.roles", "roles")
      .innerJoinAndSelect("roles.permissionRoles", "permissionRoles")
      .innerJoinAndSelect("permissionRoles.permission", "permission")
      .where("user.id= :id AND user.state='active' ", { id: id })
      .getMany();

    if (!user)
      return { error: 'USER_NOT_EXIST', detail: 'Usuario no existe o se encuentra inactivo.' };

    const roles = [];
    const permissions = [];
    await user.map(item => {
      item.roles.map(item2 => {
        roles.push(item2.key)
        item2.permissionRoles.map(item3 => {
          permissions.push(item3.permission.key)
        })
      })
    });
    return { roles, permissions }
  }

  async getUsers() {
    return await this.userRepository.find({})
  }


}
