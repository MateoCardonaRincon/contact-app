import {
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getUserById(userId: string): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ id: userId })
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} does not exist`)
        }
    }

    async updateUser(userId: string, userDto: UpdateUserDto): Promise<User> {
        const userToUpdate = await this.userRepository.findOneBy({ id: userId })

        if (!userToUpdate) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }

        userDto.password = hashSync(userDto.password, 10)

        this.userRepository.merge(userToUpdate, userDto)

        return await this.userRepository.save(userToUpdate)
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            await this.userRepository.findOneByOrFail({ id: userId })
            return await this.userRepository.delete(userId)
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }
    }

}
