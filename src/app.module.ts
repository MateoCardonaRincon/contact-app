import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/controllers/user.controller';
import { ContactController } from './contact/controllers/contact.controller';
import { PhoneNumberController } from './phone-number/controllers/phone-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Contact } from './contact/entities/contact.entity';
import { PhoneNumber } from './phone-number/entities/phone-number.entity';
import { UserService } from './user/services/user.service';
import { ContactService } from './contact/services/contact.service';
import { PhoneNumberService } from './phone-number/services/phone-number.service';

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
    }),
    TypeOrmModule.forFeature([User, Contact, PhoneNumber])
  ],
  controllers: [AppController, UserController, ContactController, PhoneNumberController],
  providers: [AppService, UserService, ContactService, PhoneNumberService],
})
export class AppModule { }
