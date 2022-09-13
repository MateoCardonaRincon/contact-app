import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ContactModule,
    PhoneNumberModule,
    ConfigModule,
    AuthModule
  ]
})
export class AppModule { }
