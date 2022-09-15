import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { DataBaseConfigModule } from './db-config/db-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    ContactModule,
    PhoneNumberModule,
    DataBaseConfigModule,
    AuthModule
  ]
})
export class AppModule { }
