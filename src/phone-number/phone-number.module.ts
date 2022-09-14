import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumber } from './entities/phone-number.entity';
import { PhoneNumberService } from './phone-number.service';

@Module({
    imports: [TypeOrmModule.forFeature([Contact, PhoneNumber])],
    controllers: [PhoneNumberController],
    providers: [PhoneNumberService],
})
export class PhoneNumberModule { }
