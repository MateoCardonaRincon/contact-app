import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { PhoneNumberDto, UpdatePhoneNumberDto } from './dtos';
import { PhoneNumber } from './entities/phone-number.entity';

@Injectable()
export class PhoneNumberService {

    constructor(
        @InjectRepository(PhoneNumber)
        private phoneNumberRepository: Repository<PhoneNumber>,
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async createPhoneNumber(phoneNumberDto: PhoneNumberDto): Promise<PhoneNumber> {
        try {
            await this.contactRepository.findOneByOrFail({ id: phoneNumberDto.contact.id })

            const createdPhoneNumber = this.phoneNumberRepository.create(phoneNumberDto)

            return await this.phoneNumberRepository.save(createdPhoneNumber)
        } catch (error) {
            throw new NotAcceptableException(`Specified contact {id: ${phoneNumberDto.contact.id}} does not exist`)
        }
    }

    async getAll(): Promise<PhoneNumber[]> {
        try {
            return await this.phoneNumberRepository.find()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getPhoneNumberById(phoneNumberId: string): Promise<PhoneNumber> {
        try {
            return await this.phoneNumberRepository.findOneByOrFail({ id: phoneNumberId })
        } catch (error) {
            throw new NotFoundException(`Specified phone number {id: ${phoneNumberId}} does not exist`)
        }
    }

    async getAllByContactId(contactId: string): Promise<PhoneNumber[]> {
        try {
            const relatedContact = await this.contactRepository.findOneByOrFail({ id: contactId })
            return await this.phoneNumberRepository.findBy({
                contact: relatedContact
            })
        } catch (error) {
            throw new NotFoundException(`Specified contact {id: ${contactId}} does not exist`)
        }
    }

    async updatePhoneNumber(phoneNumberId: string, phoneNumberDto: UpdatePhoneNumberDto): Promise<PhoneNumber> {
        delete phoneNumberDto.contact

        const phoneNumberToUpdate = await this.phoneNumberRepository.findOneByOrFail({ id: phoneNumberId })

        if (!phoneNumberToUpdate) {
            throw new NotFoundException(`Specified phone number {id: ${phoneNumberId}} was not found`)
        }

        this.phoneNumberRepository.merge(phoneNumberToUpdate, phoneNumberDto)

        return await this.phoneNumberRepository.save(phoneNumberToUpdate)
    }

    async deletePhoneNumber(phoneNumberId: string): Promise<any> {
        try {
            await this.phoneNumberRepository.findOneByOrFail({ id: phoneNumberId })
            return await this.phoneNumberRepository.delete(phoneNumberId)

        } catch (error) {
            throw new NotFoundException(`Specified phone number {id: ${phoneNumberId}} was not found`)
        }
    }
}
