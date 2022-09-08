import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { PhoneNumberDto } from '../dto/phone-number-dto';
import { PhoneNumber } from '../entities/phone-number.entity';

@Injectable()
export class PhoneNumberService {

    constructor(
        @InjectRepository(PhoneNumber)
        private phoneNumberRepository: Repository<PhoneNumber>,
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async getPhoneNumberById(phoneNumberId: number): Promise<PhoneNumber> {
        return await this.phoneNumberRepository.findOneBy({ id: phoneNumberId })
    }

    async getAllByContactId(contactId: number): Promise<PhoneNumber[]> {
        const relatedContact = await this.contactRepository.findOneBy({ id: contactId })
        return await this.phoneNumberRepository.createQueryBuilder('phoneNumber').where({ contact: relatedContact }).execute()
    }

    async createPhoneNumber(phoneNumberDto: PhoneNumberDto): Promise<PhoneNumber> {
        const phoneNumber = new PhoneNumber()
        const relatedContact = await this.contactRepository.findOneBy({ id: phoneNumberDto.contactId })

        if (!relatedContact) {
            throw new Error(`Specified contact id ${phoneNumberDto.contactId} does not exist`)
        }

        phoneNumber.contact = relatedContact
        phoneNumber.phoneNumber = phoneNumberDto.phoneNumber

        return await this.phoneNumberRepository.save(phoneNumber)
    }

    async updatePhoneNumber(phoneNumberDto: PhoneNumberDto): Promise<PhoneNumber> {
        const phoneNumberToUpdate = await this.phoneNumberRepository.findOneBy({ id: phoneNumberDto.id })
        const relatedContact = await this.contactRepository.findOneBy({ id: phoneNumberDto.contactId })

        if (!phoneNumberToUpdate) {
            throw new Error(`Specified phone number (id: ${phoneNumberDto.id}) was not found`)
        }

        if (!relatedContact) {
            throw new Error(`Specified contact (userId: ${phoneNumberDto.contactId}) was not found`)
        }

        phoneNumberToUpdate.contact = relatedContact
        phoneNumberToUpdate.phoneNumber = phoneNumberDto.phoneNumber

        return await this.phoneNumberRepository.save(phoneNumberToUpdate)
    }

    async deletePhoneNumber(phoneNumberId: number): Promise<any> {
        return await this.phoneNumberRepository.delete(phoneNumberId)
    }
}
