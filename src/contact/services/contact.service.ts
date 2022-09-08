import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ContactDto } from '../dto/contact-dto';
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
        return await this.contactRepository.createQueryBuilder('contact').where({ user: relatedUser }).execute()
    }

    async createContact(contactDto: ContactDto): Promise<Contact> {
        const contact = new Contact()
        const relatedUser = await this.userRepository.findOneBy({ id: contactDto.userId })

        if (!relatedUser) {
            throw new Error(`Specified user id ${contactDto.userId} does not exist`)
        }
        
        contact.user = relatedUser
        contact.name = contactDto.name
        contact.lastName = contactDto.lastName
        contact.status = contactDto.status

        return await this.contactRepository.save(contact)
    }

    async updateContact(contactDto: ContactDto): Promise<Contact> {
        const contactToUpdate = await this.contactRepository.findOneBy({ id: contactDto.id })
        const relatedUser = await this.userRepository.findOneBy({ id: contactDto.userId })

        if (!contactToUpdate) {
            throw new Error(`Specified contact (id: ${contactDto.id}) was not found`)
        }

        if (!relatedUser) {
            throw new Error(`Specified user (userId: ${contactDto.userId}) was not found`)
        }

        contactToUpdate.user = relatedUser
        contactToUpdate.name = contactDto.name
        contactToUpdate.lastName = contactDto.lastName
        contactToUpdate.status = contactDto.status

        return await this.contactRepository.save(contactToUpdate)
    }

    async deleteContact(contactId: number): Promise<any> {
        return await this.contactRepository.delete(contactId)
    }


}
