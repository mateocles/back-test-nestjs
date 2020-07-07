import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { user } from '../entities/user';
import { person } from '../entities/person';
import { UserService } from '../user/user.service';
import { HttpStrategy } from '../common/strategy/http.strategy';
import { role } from '../entities/role';


@Module({
  imports: [
    JwtModule.register({
      secret: 'mateo',
      signOptions: { expiresIn: '15d' },
    }),
    TypeOrmModule.forFeature([user, person,role]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy, UserService],
})
export class AuthModule { }
