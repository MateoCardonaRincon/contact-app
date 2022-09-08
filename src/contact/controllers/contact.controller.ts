import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ContactDto } from '../dto/contact-dto';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) { }

    @Post('save')
    createContact(@Body() contactDto: ContactDto, @Res() response) {
        this.contactService.createContact(contactDto)
            .then((contact) => {
                response.status(HttpStatus.CREATED).json(contact);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }

    @Get('get/:id')
    getContactById(@Param('id') contactId: number, @Res() response) {
        this.contactService.getContactById(contactId)
            .then((contact) => {
                if (!contact) {
                    throw new Error(`Something went wrong getting the contact with id ${contactId}`)
                }
                response.status(HttpStatus.OK).json(contact);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }


    @Get('get/by-user/:userId')
    getContactsByUserId(@Param('userId') userId: number, @Res() response) {
        this.contactService.getContactsByUserId(userId)
            .then((contacts) => {
                response.status(HttpStatus.OK).json(contacts);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }

    @Put('update')
    updateContact(@Body() contactDto: ContactDto, @Res() response) {
        this.contactService.updateContact(contactDto)
            .then((contact) => {
                response.status(HttpStatus.OK).json(contact);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }

    @Delete('delete/:id')
    deleteContact(@Param('id') contactId: number, @Res() response) {
        this.contactService.deleteContact(contactId)
            .then((res) => {
                response.status(HttpStatus.OK).json(res);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }

}
