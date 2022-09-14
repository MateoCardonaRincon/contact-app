import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PhoneNumberDto, UpdatePhoneNumberDto } from './dtos';
import { PhoneNumberService } from './phone-number.service';

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
    async getPhoneNumberById(@Param('id') phoneNumberId: string) {
        return await this.phoneNumberService.getPhoneNumberById(phoneNumberId)
    }

    @Get('get/by-contact/:contactId')
    async getAllByContactId(@Param('contactId') contactId: string) {
        return await this.phoneNumberService.getAllByContactId(contactId)
    }

    @Put('update/:id')
    async updatePhoneNumber(@Param('id') phoneNumberId: string, @Body() phoneNumberDto: UpdatePhoneNumberDto) {
        return await this.phoneNumberService.updatePhoneNumber(phoneNumberId, phoneNumberDto)
    }

    @Delete('delete/:id')
    async deletePhoneNumber(@Param('id') phoneNumberId: string) {
        return await this.phoneNumberService.deletePhoneNumber(phoneNumberId)
    }
}
