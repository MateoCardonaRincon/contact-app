import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { PhoneNumberDto, UpdatePhoneNumberDto } from '../dto/phone-number-dto';
import { PhoneNumberService } from '../services/phone-number.service';

@Controller('phone-number')
export class PhoneNumberController {

    constructor(private readonly phoneNumberService: PhoneNumberService) { }

    @Post('save')
    async createPhoneNumber(@Body() phoneNumberDto: PhoneNumberDto) {
        return await this.phoneNumberService.createPhoneNumber(phoneNumberDto)
    }

    @Get('all')
    async getAllPhoneNumbers() {
        return await this.phoneNumberService.getAll()
    }

    @Get('get/:id')
    async getPhoneNumberById(@Param('id', ParseIntPipe) phoneNumberId: number) {
        return await this.phoneNumberService.getPhoneNumberById(phoneNumberId)
    }

    @Get('get/by-contact/:contactId')
    async getAllByContactId(@Param('contactId', ParseIntPipe) contactId: number) {
        return await this.phoneNumberService.getAllByContactId(contactId)
    }

    @Put('update/:id')
    async updatePhoneNumber(@Param('id', ParseIntPipe) id: number, @Body() phoneNumberDto: UpdatePhoneNumberDto) {
        return await this.phoneNumberService.updatePhoneNumber(id, phoneNumberDto)
    }

    @Delete('delete/:id')
    async deletePhoneNumber(@Param('id', ParseIntPipe) phoneNumberId: number) {
        return await this.phoneNumberService.deletePhoneNumber(phoneNumberId)
    }
}
