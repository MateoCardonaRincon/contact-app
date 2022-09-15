import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos';
import { User } from './entities/user.entity';
import { ObjectID } from 'mongodb';

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
            return await this.userRepository.findOneByOrFail(new ObjectID(userId))
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} does not exist`)
        }
    }

    async updateUser(userId: string, userDto: UpdateUserDto): Promise<User> {
        try {
            const userToUpdate = await this.userRepository.findOneByOrFail(new ObjectID(userId))

            userDto.password = hashSync(userDto.password, 10)

            this.userRepository.merge(userToUpdate, userDto)

            console.log({ userToUpdate })

            return await this.userRepository.save(userToUpdate)
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            await this.userRepository.findOneByOrFail(new ObjectID(userId))
            return await this.userRepository.delete(userId)
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }
    }

}
