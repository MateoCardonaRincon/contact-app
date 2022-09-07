import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ContactController } from './contact/contact.controller';
import { PhoneNumberController } from './phone-number/phone-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Contact } from './contact/entities/contact.entity';
import { PhoneNumber } from './phone-number/entities/phone-number.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'MySQL_315660',
      database: 'contact-app',
      entities: [User, Contact, PhoneNumber],
      synchronize: true,
    })],
  controllers: [AppController, UserController, ContactController, PhoneNumberController],
  providers: [AppService],
})
export class AppModule { }
