import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
/**
 * This class defines jwt passport strategy.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authService.getSigningKey()
    });

    console.log(authService.getSigningKey());
  }

  /**
   * Validates a given jwt payload.
   */
  async validate(payload: any): Promise<any> {
    return payload;
  }
}
