import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    /* If their are no explicit roles specified, return true, otherwise check for appropriate permissions */
    if (roles.length === 0) {
      return true;
    } else {
      return roles.filter(role => req.user.roles.includes(role)).length > 0;
    }
  }
}
