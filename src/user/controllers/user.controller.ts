import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UpdateUserDto, UserDto } from '../dtos';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    async createUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto)
    }

    @Post('login')
    async loginUser(@Body() userDto: UserDto) {
        return await this.userService.loginUser(userDto)
    }

    @Get('all')
    async getAllUsers() {
        return await this.userService.getAll()
    }

    @Get('get/:id')
    async getUserById(@Param('id', ParseIntPipe) userId: number) {
        return await this.userService.getUserById(userId)
    }

    @Put('update/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: UpdateUserDto) {
        return await this.userService.updateUser(id, userDto)
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id', ParseIntPipe) userId: number) {
        return await this.userService.deleteUser(userId)
    }
}
