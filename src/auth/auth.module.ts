import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy,RefreshTokenStrategy],
})
export class AuthModule {}
