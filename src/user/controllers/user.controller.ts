import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UpdateUserDto, UserDto } from '../dto/user-dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('save')
    async createUser(@Body() userDto: UserDto, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.CREATED)
            return await this.userService.createUser(userDto)
        } catch (error) {
            response.status(HttpStatus.NOT_ACCEPTABLE)
            return { message: error.message, trace: error }
        }
    }

    @Get('all')
    async getAllUsers(@Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.OK)
            return await this.userService.getAll()
        } catch (error) {
            response.status(HttpStatus.NO_CONTENT)
            return { message: error.message, trace: error }
        }
    }

    @Get('get/:id')
    async getUserById(@Param('id') userId: number, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.FOUND)
            return await this.userService.getUserById(userId)
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND)
            return { message: error.message, trace: error }
        }
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.ACCEPTED)
            return await this.userService.updateUser(id, userDto)
        } catch (error) {
            response.status(HttpStatus.NOT_ACCEPTABLE)
            return { message: error.message, trace: error }
        }
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') userId: number, @Res({ passthrough: true }) response) {
        try {
            response.status(HttpStatus.OK)
            return await this.userService.deleteUser(userId)
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST)
            return { message: error.message, trace: error }
        }
    }
}
