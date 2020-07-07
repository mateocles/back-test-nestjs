import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const rols = this.reflector.get<string[]>('roles', context.getHandler());

    if (!rols) return true
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => user.roles.some((role) => !!rols.find((item) => item === role));
    
    return user && user.roles && hasRole();
  }
}