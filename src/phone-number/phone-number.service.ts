import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { Repository } from 'typeorm';
import { PhoneNumberDto, UpdatePhoneNumberDto } from './dtos';
import { PhoneNumber } from './entities/phone-number.entity';
import { ObjectID } from 'mongodb';

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
            await this.contactRepository.manager.findOneByOrFail(Contact, new ObjectID(phoneNumberDto.contactId))

            phoneNumberDto.contactId = new ObjectID(phoneNumberDto.contactId)

            const createdPhoneNumber = this.phoneNumberRepository.create(phoneNumberDto)

            return await this.phoneNumberRepository.save(createdPhoneNumber)
        } catch (error) {
            throw new NotAcceptableException(`Specified contact {id: ${phoneNumberDto.contactId}} does not exist`)
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
            return await this.phoneNumberRepository.findOneByOrFail(new ObjectID(phoneNumberId))
        } catch (error) {
            throw new NotFoundException(`Specified phone number {id: ${phoneNumberId}} does not exist`)
        }
    }

    async getAllByContactId(contactId: string): Promise<PhoneNumber[]> {
        try {
            await this.contactRepository.findOneByOrFail(new ObjectID(contactId))

            return await this.phoneNumberRepository.manager.findBy(PhoneNumber, { contactId: new ObjectID(contactId) })
        } catch (error) {
            throw new NotFoundException(`Specified contact {id: ${contactId}} does not exist`)
        }
    }

    async updatePhoneNumber(phoneNumberId: string, phoneNumberDto: UpdatePhoneNumberDto): Promise<PhoneNumber> {
        try {
            delete phoneNumberDto.contactId

            const phoneNumberToUpdate = await this.phoneNumberRepository.findOneByOrFail(new ObjectID(phoneNumberId))

            this.phoneNumberRepository.merge(phoneNumberToUpdate, phoneNumberDto)

            return await this.phoneNumberRepository.save(phoneNumberToUpdate)

        } catch (error) {
            throw new NotFoundException(`Specified phone number {id: ${phoneNumberId}} was not found`)
        }
    }

    async deletePhoneNumber(phoneNumberId: string): Promise<any> {
        try {
            await this.phoneNumberRepository.findOneByOrFail(new ObjectID(phoneNumberId))

            return await this.phoneNumberRepository.delete(phoneNumberId)
        } catch (error) {
            throw new NotFoundException(`Specified phone number {id: ${phoneNumberId}} was not found`)
        }
    }
}
