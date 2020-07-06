import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags("Usuario")
@Controller('user')
export class UserController {
constructor(private readonly userService:UserService){}

@Get('get-all')
async getAll(){
  return await this.userService.getPermissions
}

}