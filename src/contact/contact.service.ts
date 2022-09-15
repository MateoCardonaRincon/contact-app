import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ContactDto, UpdateContactDto } from './dtos';
import { Contact } from './entities/contact.entity';
import { ObjectID } from 'mongodb';


@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createContact(contactDto: ContactDto): Promise<Contact> {
        try {
            const relatedUser = await this.userRepository.manager.findOneByOrFail(User, new ObjectID(contactDto.user.id))

            contactDto.user = relatedUser

            const createdContact = this.contactRepository.create(contactDto)

            return await this.contactRepository.save(createdContact)
        } catch (error) {
            throw new NotAcceptableException(`Specified user {id: ${contactDto.user.id}} does not exist`)
        }
    }

    async getAll(): Promise<Contact[]> {
        try {
            return await this.contactRepository.find()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getContactById(contactId: string): Promise<Contact> {
        try {
            return await this.contactRepository.findOneByOrFail(new ObjectID(contactId))
        } catch (error) {
            throw new NotFoundException(`Specified contact {id: ${contactId}} does not exist`)
        }
    }

    async getContactsByUserId(userId: string): Promise<Contact[]> {
        try {
            const relatedUser = await this.userRepository.findOneByOrFail(new ObjectID(userId))

            return await this.contactRepository.manager.findBy(Contact, { user: relatedUser })
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} does not exist`)
        }
    }

    async updateContact(contactId: string, contactDto: UpdateContactDto): Promise<Contact> {
        try {
            delete contactDto.user

            const contactToUpdate = await this.contactRepository.findOneByOrFail(new ObjectID(contactId))

            console.log({ contactToUpdate })

            this.contactRepository.merge(contactToUpdate, contactDto)

            console.log({ contactToUpdate })

            const updt = await this.contactRepository.save(contactToUpdate)

            return updt
        } catch (error) {
            throw new NotFoundException(`Specified contact {id: ${contactId}} was not found`)
        }
    }

    async deleteContact(contactId: string): Promise<any> {
        try {
            await this.contactRepository.findOneByOrFail(new ObjectID(contactId))
            return await this.contactRepository.delete(contactId)
        } catch (error) {
            throw new NotFoundException(`Specified contact {id: ${contactId}} was not found`)
        }
    }


}
