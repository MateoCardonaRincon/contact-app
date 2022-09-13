import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ContactDto, UpdateContactDto } from '../dto/contact-dto';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) { }

    @Post('save')
    async createContact(@Body() contactDto: ContactDto, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.CREATED)
            return await this.contactService.createContact(contactDto)
        } catch (error) {
            response.status(HttpStatus.NOT_ACCEPTABLE)
            return { message: error.message, trace: error }
        }
    }

    @Get('all')
    async getAllContacts(@Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.OK)
            return await this.contactService.getAll()
        } catch (error) {
            response.status(HttpStatus.NO_CONTENT)
            return { message: error.message, trace: error }
        }
    }

    @Get('get/:id')
    async getContactById(@Param('id') contactId: number, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.FOUND)
            return await this.contactService.getContactById(contactId)
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND)
            return { message: error.message, trace: error }
        }
    }


    @Get('get/by-user/:userId')
    async getContactsByUserId(@Param('userId') userId: number, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.FOUND)
            return await this.contactService.getContactsByUserId(userId)
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND)
            return { message: error.message, trace: error }
        }
    }

    @Put('update/:id')
    async updateContact(@Param('id') id: number, @Body() contactDto: UpdateContactDto, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.ACCEPTED)
            return await this.contactService.updateContact(id, contactDto)
        } catch (error) {
            response.status(HttpStatus.NOT_ACCEPTABLE)
            return { message: error.message, trace: error }
        }
    }

    @Delete('delete/:id')
    async deleteContact(@Param('id') contactId: number, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.OK)
            return await this.contactService.deleteContact(contactId)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }

}
