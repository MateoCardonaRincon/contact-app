
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy } from 'passport-jwt'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({})
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { username } = payload

        const user = await this.userRepository.findOneBy({ username })

        if(!user) {
            throw new UnauthorizedException('Not valid token')
        }

        return user
    }

}