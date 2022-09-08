import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ContactDto, UpdateContactDto } from '../dto/contact-dto';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) { }

    @Post('save')
    createContact(@Body() contactDto: ContactDto, @Res({ passthrough: true }) response) {

        try {
            response.status(HttpStatus.OK)
            return this.contactService.createContact(contactDto)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }

    @Get('get/:id')
    getContactById(@Param('id') contactId: number, @Res({ passthrough: true }) response) {

        try {
            response.status(HttpStatus.OK)
            return this.contactService.getContactById(contactId)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }


    @Get('get/by-user/:userId')
    getContactsByUserId(@Param('userId') userId: number, @Res({ passthrough: true }) response) {

        try {
            response.status(HttpStatus.OK)
            return this.contactService.getContactsByUserId(userId)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }

    @Put('update/:id')
    updateContact(@Param('id') id: number, @Body() contactDto: UpdateContactDto, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.OK)
            return this.contactService.updateContact(id, contactDto)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }

    @Delete('delete/:id')
    deleteContact(@Param('id') contactId: number, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.OK)
            return this.contactService.deleteContact(contactId)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }

}
