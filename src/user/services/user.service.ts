import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import validator, { validate } from 'class-validator';
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
        const createUser = this.userRepository.create(userDto)

        return await this.userRepository.save(createUser)
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async getUserById(userId: number): Promise<User> {
        try {
            return await this.userRepository.findOneByOrFail({ id: userId })
        } catch (error) {
            throw new Error(`Specified user {id: ${userId}} does not exist`)
        }

    }

    async updateUser(userId: number, userDto: UpdateUserDto): Promise<User> {
        const userToUpdate = await this.userRepository.findOneBy({ id: userId })

        if (!userToUpdate) {
            throw new Error(`Specified user {id: ${userId}} was not found`)
        }
        
        this.userRepository.merge(userToUpdate, userDto)

        return await this.userRepository.save(userToUpdate)
    }

    async deleteUser(userId: number): Promise<any> {
        return await this.userRepository.delete(userId)
    }
}
