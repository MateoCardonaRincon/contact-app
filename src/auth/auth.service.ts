import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { UserDto } from 'src/user/dtos';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ) { }

  async registerUser(userDto: UserDto) {
    try {
      const { password, username } = userDto

      const createdUser = this.userRepository.create({ username, password: hashSync(password, 10) });

      const user = await this.userRepository.save(createdUser)

      return { ...user, token: this.getJwt({ id: user.id }) }

    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  async loginUser(userDto: UserDto) {

    const { password, username } = userDto

    const user = await this.userRepository.findOne({
      where: { username }
    },)

    if (!user) {
      throw new UnauthorizedException("Not valid credentials (username)")
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException("Not valid credentials (password)")
    }

    return { ...user, token: this.getJwt({ id: user.id }) }
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload) // signing token with secrete
  }
}
