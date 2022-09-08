import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { PhoneNumberDto } from '../dto/phone-number-dto';
import { PhoneNumberService } from '../services/phone-number.service';

@Controller('phone-number')
export class PhoneNumberController {

    constructor(private phoneNumberService: PhoneNumberService) { }

    @Post('save')
    createPhoneNumber(@Body() phoneNumberDto: PhoneNumberDto, @Res() response) {
        this.phoneNumberService.createPhoneNumber(phoneNumberDto)
            .then((phoneNumber) => {
                response.status(HttpStatus.CREATED).json(phoneNumber)
            })
            .catch(() => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: 'Something went wrong creating phone number' })
            })
    }

    @Get('get/:id')
    getPhoneNumberById(@Param('id') phoneNumberId: number, @Res() response) {
        this.phoneNumberService.getPhoneNumberById(phoneNumberId)
            .then((phoneNumber) => {
                if (!phoneNumber) {
                    throw new Error(`Something went wrong getting the phone number with id ${phoneNumberId}`)
                }
                response.status(HttpStatus.OK).json(phoneNumber);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }


    @Get('get/by-contact/:contactId')
    getAllByContactId(@Param('contactId') contactId: number, @Res() response) {
        this.phoneNumberService.getAllByContactId(contactId)
            .then((phoneNumbers) => {
                response.status(HttpStatus.OK).json(phoneNumbers);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }

    @Put('update')
    updatePhoneNumber(@Body() phoneNumberDto: PhoneNumberDto, @Res() response) {
        this.phoneNumberService.updatePhoneNumber(phoneNumberDto)
            .then((phoneNumber) => {
                response.status(HttpStatus.OK).json(phoneNumber);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST)
                    .json({ errorMessage: error.message });
            })
    }

    @Delete('delete/:id')
    deletePhoneNumber(@Param('id') phoneNumberId: number, @Res() response) {
        this.phoneNumberService.deletePhoneNumber(phoneNumberId)
            .then((res) => {
                response.status(HttpStatus.OK).json(res);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }
}
