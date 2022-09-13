import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ContactDto, UpdateContactDto } from '../dto/contact-dto';
import { ContactService } from '../services/contact.service';

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
    async getContactById(@Param('id', ParseIntPipe) contactId: number) {
        return await this.contactService.getContactById(contactId)
    }


    @Get('get/by-user/:userId')
    async getContactsByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return await this.contactService.getContactsByUserId(userId)
    }

    @Put('update/:id')
    async updateContact(@Param('id', ParseIntPipe) id: number, @Body() contactDto: UpdateContactDto) {
        return await this.contactService.updateContact(id, contactDto)
    }

    @Delete('delete/:id')
    async deleteContact(@Param('id', ParseIntPipe) contactId: number) {
        return await this.contactService.deleteContact(contactId)
    }

}
