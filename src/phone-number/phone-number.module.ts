import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { PhoneNumberController } from './controllers/phone-number.controller';
import { PhoneNumber } from './entities/phone-number.entity';
import { PhoneNumberService } from './services/phone-number.service';

@Module({
    imports: [TypeOrmModule.forFeature([Contact, PhoneNumber])],
    controllers: [PhoneNumberController],
    providers: [PhoneNumberService],
})
export class PhoneNumberModule { }
