import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfEmpty } from 'rxjs';
import { Contact } from 'src/contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { PhoneNumberDto, UpdatePhoneNumberDto } from '../dto/phone-number-dto';
import { PhoneNumber } from '../entities/phone-number.entity';

@Injectable()
export class PhoneNumberService {

    constructor(
        @InjectRepository(PhoneNumber)
        private phoneNumberRepository: Repository<PhoneNumber>,
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async createPhoneNumber(phoneNumberDto: PhoneNumberDto): Promise<PhoneNumber> {
        const relatedContact = await this.contactRepository.findOneBy({ id: phoneNumberDto.contact.id })

        if (!relatedContact) {
            throw new Error(`Specified contact {id: ${phoneNumberDto.contact.id}} does not exist`)
        }

        const createdPhoneNumber = this.phoneNumberRepository.create(phoneNumberDto)

        return await this.phoneNumberRepository.save(createdPhoneNumber)
    }

    async getAll(): Promise<PhoneNumber[]> {
        return await this.phoneNumberRepository.find()
    }

    async getPhoneNumberById(phoneNumberId: number): Promise<PhoneNumber> {
        try {
            return await this.phoneNumberRepository.findOneByOrFail({ id: phoneNumberId })
        } catch (error) {
            throw new Error(`Specified phone number {id: ${phoneNumberId}} does not exist`)
        }
    }

    async getAllByContactId(contactId: number): Promise<PhoneNumber[]> {
        try {
            const relatedContact = await this.contactRepository.findOneByOrFail({ id: contactId })
            return await this.phoneNumberRepository.findBy({
                contact: relatedContact
            })
        } catch (error) {
            throw new Error(`Specified contact {id: ${contactId}} does not exist`)
        }
    }

    async updatePhoneNumber(phoneNumberId: number, phoneNumberDto: UpdatePhoneNumberDto): Promise<PhoneNumber> {
        const phoneNumberToUpdate = await this.phoneNumberRepository.findOneBy({ id: phoneNumberId })

        if (!phoneNumberToUpdate) {
            throw new Error(`Specified phone number {id: ${phoneNumberId}} was not found`)
        }

        this.phoneNumberRepository.merge(phoneNumberToUpdate, phoneNumberDto)

        return await this.phoneNumberRepository.save(phoneNumberToUpdate)
    }

    async deletePhoneNumber(phoneNumberId: number): Promise<any> {
        return await this.phoneNumberRepository.delete(phoneNumberId)
    }
}
