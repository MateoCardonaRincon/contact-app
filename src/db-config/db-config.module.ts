import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { PhoneNumber } from 'src/phone-number/entities/phone-number.entity';
import { User } from 'src/user/entities/user.entity';
require("dotenv").config()

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Contact, PhoneNumber],
            synchronize: true,
        })
    ]
})
export class ConfigModule { }
