import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ContactDto, UpdateContactDto } from './dtos';
import { ContactService } from './contact.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('contact')
export class ContactController {

    constructor(private readonly contactService: ContactService) { }

    @Post('save')
    async createContact(@Body() contactDto: ContactDto) {
        return await this.contactService.createContact(contactDto)
    }

    @Get('all')
    async getAllContacts() {
        return await this.contactService.getAll()
    }

    @Get('get/:id')
    async getContactById(@Param('id') contactId: string) {
        return await this.contactService.getContactById(contactId)
    }


    @Get('get/by-user/:userId')
    async getContactsByUserId(@Param('userId') userId: string) {
        return await this.contactService.getContactsByUserId(userId)
    }

    @Put('update/:id')
    async updateContact(@Param('id') contactId: string, @Body() contactDto: UpdateContactDto) {
        return await this.contactService.updateContact(contactId, contactDto)
    }

    @Delete('delete/:id')
    async deleteContact(@Param('id') contactId: string) {
        return await this.contactService.deleteContact(contactId)
    }

}
