import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserDto } from 'src/user/dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() userDto: UserDto) {
    return this.authService.registerUser(userDto);
  }

  @Get('login')
  loginUser(@Body() userDto: UserDto) {
    return this.authService.loginUser(userDto);
  }
}
