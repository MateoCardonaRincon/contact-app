import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDto } from './dto/user-dto';

@Controller('user')
export class UserController {

    @Post()
    createUser(@Body() userDto: UserDto) {
        return 'The user was created'
    }

    @Get()
    getAllUsers() {
        return 'user(id)'
    }

    @Get(':id')
    getUser(@Param() userId: string) {
        return 'user(id)'
    }

    @Put(':id')
    updateUser(@Param() userId: string) {
        return 'The user was updated'
    }

    @Delete(':id')
    deleteUser(@Param() userId: string) {
        return 'The user was deleted'
    }
}
