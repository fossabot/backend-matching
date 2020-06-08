import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...permissions: any) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard('jwt'), PermissionsGuard),
    ApiBearerAuth()
  );
}
