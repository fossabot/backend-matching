import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../config/auth/jwt.strategy';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [AuthService],
      useFactory: async (authService: AuthService) => ({
        publicKey: await authService.getSigningKey()
      })
    })
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtModule, AuthService],
  controllers: []
})
export class AuthModule {}
