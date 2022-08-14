import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'secretkey123',
    signOptions: {
      expiresIn: 3600, // 3600秒、1時間
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy, JwtAuthGuard], // 外部モジュールで使用するクラスを追記
})
export class AuthModule { }
