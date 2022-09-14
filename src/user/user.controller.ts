import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('all')
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
