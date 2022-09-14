import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ContactController } from './contact.controller';
import { Contact } from './entities/contact.entity';
import { ContactService } from './contact.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Contact])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule { }
