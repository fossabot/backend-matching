import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwkToPem from 'jwk-to-pem';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  http;

  constructor(private readonly configService: ConfigService) {
    this.http = axios.create();
  }

  async getSigningKey(): Promise<string> {
    const jwks = await this.http.get(this.configService.get<string>('AUTH_JWKS_URI'));

    if (jwks.status === 200) {
      const key = jwks.data.keys.filter((key) => {
        if (key.kid === this.configService.get<string>('AUTH_JWK_KID')) {
          return true;
        }
      });

      if (key.length === 1) {
        return jwkToPem(key[0]);
      } else {
        throw new InternalServerErrorException('Verification of the JWT could not be performed successfully.');
      }
    } else {
      throw new InternalServerErrorException('Verification of the JWT could not be performed successfully.');
    }
  }
}
