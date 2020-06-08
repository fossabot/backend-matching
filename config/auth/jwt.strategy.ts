import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as fsj from 'fs-jetpack';

/**
 * This class defines jwt passport strategy.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: `${fsj.read(fsj.cwd())}/config/auth/signingKey.pem`
      secretOrKey: fsj.read('C:/Users/Tobi/Desktop/WebDev/Projekte/impact/oauth/config/auth/signingKey.pem')
    });
  }

  /**
   * Validates a given jwt payload.
   */
  async validate(payload: any): Promise<any> {
    return payload;
  }
}
