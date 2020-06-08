import { SetMetadata } from '@nestjs/common';

export const Persmissions = (...permissions: string[]) => SetMetadata('permissions', permissions);
