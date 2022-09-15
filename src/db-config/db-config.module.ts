import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Contact } from 'src/contact/entities/contact.entity';
import { PhoneNumber } from 'src/phone-number/entities/phone-number.entity';
import { User } from 'src/user/entities/user.entity';
require("dotenv").config()

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.MONGODB_CONNECTION,
            useNewUrlParser: true,
            synchronize: true,
            logging: true,
            entities: [User, Contact, PhoneNumber],
          })
    ]
})
export class DataBaseConfigModule { }
