import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ContactDto, UpdateContactDto } from '../dto/contact-dto';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createContact(contactDto: ContactDto): Promise<Contact> {

        const relatedUser = await this.userRepository.findOneBy({ id: contactDto.user.id })

        if (!relatedUser) {
            throw new Error(`Specified user {id: ${contactDto.user.id}} does not exist`)
        }

        const createdContact = this.contactRepository.create(contactDto)

        return await this.contactRepository.save(createdContact)
        // try {
        //     await this.userRepository.findOneByOrFail({ id: contactDto.user.id })

        //     const createdContact = this.contactRepository.create(contactDto)

        //     return await this.contactRepository.save(createdContact)
        // } catch (error) {
        //     throw new Error(`Specified user {id: ${contactDto.user.id}} does not exist`)
        // }
    }

    async getAll(): Promise<Contact[]> {
        return await this.contactRepository.find()
    }

    async getContactById(contactId: number): Promise<Contact> {
        try {
            return await this.contactRepository.findOneByOrFail({ id: contactId })
        } catch (error) {
            throw new Error(`Specified contact {id: ${contactId}} does not exist`)
        }
    }

    async getContactsByUserId(userId: number): Promise<Contact[]> {
        try {
            const relatedUser = await this.userRepository.findOneBy({ id: userId })
            return await this.contactRepository.findBy({
                user: relatedUser
            })
        } catch (error) {
            throw new Error(`Specified user {id: ${userId}} does not exist`)
        }
    }

    async updateContact(contactId: number, contactDto: UpdateContactDto): Promise<Contact> {
        try {
            const contactToUpdate = await this.contactRepository.findOneByOrFail({ id: contactId })

            this.contactRepository.merge(contactToUpdate, contactDto)

            return await this.contactRepository.save(contactToUpdate)
        } catch (error) {
            throw new Error(`Specified contact {id: ${contactId}} was not found`)
        }
    }

    async deleteContact(contactId: number): Promise<any> {
        return await this.contactRepository.delete(contactId)
    }


}
