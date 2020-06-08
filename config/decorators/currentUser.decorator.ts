import { createParamDecorator } from '@nestjs/common';

/**
 * Creates CurrentUser-decorator.
 */
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user
);
