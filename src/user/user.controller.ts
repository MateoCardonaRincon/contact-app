import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto, UserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('create')
    async createUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto)
    }

    @Get('all')
    @UseGuards(AuthGuard('jwt'))
    async getAllUsers() {
        return await this.userService.getAll()
    }

    @Get('get/:id')
    async getUserById(@Param('id') userId: string) {
        return await this.userService.getUserById(userId)
    }

    @Put('update/:id')
    async updateUser(@Param('id') userId: string, @Body() userDto: UpdateUserDto) {
        return await this.userService.updateUser(userId, userDto)
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: string) {
        return await this.userService.deleteUser(userId)
    }
}
