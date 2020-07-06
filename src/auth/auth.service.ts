import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { user } from '../entities/user';
import { LoginDto } from './dto/login.dto';
import { person } from '../entities/person';
import { SignUpDto } from './dto/signUp.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('CryptoService') private readonly cryptoService,
    private readonly jwtService: JwtService,
    @InjectRepository(user) private readonly userRepository: Repository<user>,
    @InjectRepository(person) private readonly personRepository: Repository<person>,
    private readonly userService: UserService,
  ) { }

  async getStructureToken(email) {
    return await this.personRepository.createQueryBuilder()
      .select([
        'person.name',
        'person.lastname'
      ])
      .addSelect(['user.id', 'user.email', 'user.state'])
      .innerJoin('person.user', 'user')
      .leftJoinAndSelect('user.roles','roles')
      .leftJoinAndSelect('roles.permissionRols','permissionRols')
      .leftJoinAndSelect('permissionRols.permission','permission')
      .where("user.state = 'active' and user.email = :email",{ email }, )
      .getOne();
  }

  async login(body: LoginDto) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'state'],
      where: body,
    });

    if (!user)
      return {
        error: 'USER_NOT_EXIST',
        detail: 'Tu correo electronico o contraseña no son válidos.',
      };
    else if (user.state === 'inactive')
      return { error: 'USER_INACTIVE', detail: 'Usuario inactivo.' };

    return await this.getStructureToken(user.email);
  }

  async signUp(body: SignUpDto) {
    console.log(body)
    body.password = this.cryptoService.encrypt(body.password);

    const validateUser = await this.userRepository.findOne({
      where: { email: body.email, state: 'active' },
    });

    if (validateUser)
      return { error: 'EMAIL_IN_USE', detail: 'Ese correo electronico ya está siendo utilizado.' };

    try {
      const person = await this.personRepository.save({ name: body.name, lastname: body.lastname });

      await this.userRepository.save({ email: body.email, password: body.password, person: { id: person.id } });

      return { success: 'OK' };
    } catch (error) {
      return { error };
    }
  }

  async validateUser(token: string): Promise<any> {
    let payload: any = this.jwtService.decode(token);
    if (payload) {
      const user = await this.userRepository.findOne({
        select: ["id", "email"],
        relations: ["person"],
        where: { email: payload.user.email }
      })

      //const permissions = await this.userService.getPermissions(user.id);

      return { ...user };
    }

    return false;
  }
}
