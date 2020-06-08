import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const req = context.switchToHttp().getRequest();

    /* If their are no explicit roles specified, return true, otherwise check for appropriate permissions */
    if (permissions.length === 0) {
      return true;
    } else {
      return permissions.filter(permission => req.user.roles.includes(permission)).length > 0;
    }
  }
}
