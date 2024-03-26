import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import configuration from './core/config/configuration';
import { usersRepository } from './modules/users/users.repository';
import { UsersService } from './modules/users/users.service';
import { UsersController } from './modules/users/users.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { OtpModule } from './modules/otp/otp.module';
import { otpsRepository } from './modules/otp/otps.repository';
import { OtpService } from './modules/otp/otp.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.development', '.env.production'],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    OtpModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    ...usersRepository,
    ...otpsRepository,
    AppService,
    UsersService,
    AuthService,
    OtpService,
  ],
})
export class AppModule {}
