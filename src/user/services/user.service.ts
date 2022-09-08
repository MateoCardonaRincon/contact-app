import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user-dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async getUserById(userId: number): Promise<User> {
        return await this.userRepository.findOneBy({ id: userId })
    }

    async createUser(userDto: UserDto): Promise<User> {
        const user = new User()
        user.username = userDto.username
        user.password = userDto.password

        return await this.userRepository.save(user)
    }

    async updateUser(userDto: UserDto, userId: number): Promise<User> {
        const userToUpdate = await this.userRepository.findOneBy({ id: userId })
        userToUpdate.username = userDto.username
        userToUpdate.password = userDto.password

        return await this.userRepository.save(userToUpdate)
    }

    async deleteUser(userId: number): Promise<any> {
        return await this.userRepository.delete(userId)
    }
}
