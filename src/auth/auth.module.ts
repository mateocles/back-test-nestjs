import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'back-test-nestjs',
      signOptions: { expiresIn: '15d' },

    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
