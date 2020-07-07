import { Controller, Get, UseGuards,Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/roles.decorator';
import { PermissionsGuard } from '../common/guards/permission.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ADMIN } from '../common/constanst/rol'

@ApiTags("Usuario")
@Controller('user')
export class UserController {
constructor(private readonly userService:UserService){}

@Get('/get-all')
@ApiOperation({ summary: 'Obtener usuarios registrados' })
@ApiCreatedResponse({ description: 'OK' })
@ApiForbiddenResponse({ description: 'FORBIDDEN' })
@UseGuards(AuthGuard('bearer'), PermissionsGuard, RolesGuard)
@Roles(ADMIN.key)
async getAllUser() {
  return await this.userService.getUsers()
}

}
