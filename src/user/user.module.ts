import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/entities/user';
import { person } from 'src/entities/person';

@Module({
  imports: [
    TypeOrmModule.forFeature([user, person])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
