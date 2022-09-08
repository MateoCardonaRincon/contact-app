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

    async getContactById(contactId: number): Promise<Contact> {
        return await this.contactRepository.findOneBy({ id: contactId })
    }

    async getContactsByUserId(userId: number): Promise<Contact[]> {
        const relatedUser = await this.userRepository.findOneBy({ id: userId })

        return await this.contactRepository.findBy({
            user: relatedUser
        })
    }

    async createContact(contactDto: ContactDto): Promise<Contact> {
        const relatedUser = await this.userRepository.findOneBy({ id: contactDto.user.id })

        if (!relatedUser) {
            throw new Error(`Specified user id ${contactDto.user.id} does not exist`)
        }
        const createdContact = this.contactRepository.create(contactDto)

        return await this.contactRepository.save(createdContact)
    }

    async updateContact(contactId: number, contactDto: UpdateContactDto): Promise<Contact> {

        const contactToUpdate = await this.contactRepository.findOneBy({ id: contactId })

        const relatedUser = await this.userRepository.findOneBy({ id: contactDto.user.id })

        if (!contactToUpdate) {
            throw new Error(`Specified contact (id: ${contactDto.id}) was not found`)
        }

        if (!relatedUser) {
            throw new Error(`Specified user (userId: ${contactDto.user.id}) was not found`)
        }

        this.contactRepository.merge(contactToUpdate, contactDto)

        return await this.contactRepository.save(contactToUpdate)
    }

    async deleteContact(contactId: number): Promise<any> {
        return await this.contactRepository.delete(contactId)
    }


}
