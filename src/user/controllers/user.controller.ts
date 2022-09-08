import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserDto } from '../dto/user-dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('save')
    createUser(@Body() userDto: UserDto, @Res() response) {
        this.userService.createUser(userDto)
            .then((user) => {
                response.status(HttpStatus.CREATED).json(user);
            })
            .catch(() => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: 'Something went wrong creating user' })
            })
    }

    @Get('all')
    getAllUsers(@Res() response) {
        this.userService.getAll()
            .then((users) => {
                response.status(HttpStatus.OK).json(users);
            })
            .catch(() => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: 'Something went wrong getting users' })
            })
    }

    @Get('get/:id')
    getUser(@Param('id') userId: number, @Res() response) {
        this.userService.getUserById(userId)
            .then((user) => {
                if (!user) {
                    throw new Error(`Something went wrong getting the user with id ${userId}`)
                }
                response.status(HttpStatus.OK).json(user);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }

    @Put('update/:id')
    updateUser(@Body() userDto: UserDto, @Res() response) {
        this.userService.updateUser(userDto)
            .then((user) => {
                response.status(HttpStatus.OK).json(user);
            })
            .catch(() => {
                response.status(HttpStatus.BAD_REQUEST)
                    .json({ errorMessage: `Something went wrong updating the user with id ${userDto.id}` });
            })
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') userId: number, @Res() response) {
        this.userService.deleteUser(userId)
            .then((res) => {
                response.status(HttpStatus.OK).json(res);
            })
            .catch((error) => {
                response.status(HttpStatus.BAD_REQUEST).json({ errorMessage: error.message });
            })
    }
}
