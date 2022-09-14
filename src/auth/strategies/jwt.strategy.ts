
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/user/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload

        const user = await this.userRepository.findOneBy({ id })

        if (!user) {
            throw new UnauthorizedException('Not valid token')
        }

        return user
    }
}