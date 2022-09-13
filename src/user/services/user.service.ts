import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto, UserDto } from '../dto/user-dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(userDto: UserDto): Promise<User> {
        try {
            const createUser = this.userRepository.create(userDto)

            return await this.userRepository.save(createUser)
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getUserById(userId: number): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ id: userId })
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} does not exist`)
        }

    }

    async updateUser(userId: number, userDto: UpdateUserDto): Promise<User> {
        try {
            const userToUpdate = await this.userRepository.findOneByOrFail({ id: userId })

            this.userRepository.merge(userToUpdate, userDto)

            return await this.userRepository.save(userToUpdate)
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }
    }

    async deleteUser(userId: number): Promise<any> {
        try {
            await this.userRepository.findOneByOrFail({ id: userId })
            return await this.userRepository.delete(userId)
        } catch (error) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }
    }
}
