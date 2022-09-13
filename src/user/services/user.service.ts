import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto, UserDto } from '../dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(userDto: UserDto): Promise<User> {
        try {
            const { password, username } = userDto

            const createUser = this.userRepository.create({ username, password: hashSync(password, 10) });

            return await this.userRepository.save(createUser)
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

        return user

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
        const userToUpdate = await this.userRepository.findOneBy({ id: userId })

        if (!userToUpdate) {
            throw new NotFoundException(`Specified user {id: ${userId}} was not found`)
        }

        userDto.password = hashSync(userDto.password, 10)

        this.userRepository.merge(userToUpdate, userDto)

        return await this.userRepository.save(userToUpdate)
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
