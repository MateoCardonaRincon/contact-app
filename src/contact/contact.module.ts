import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ContactController } from './controllers/contact.controller';
import { Contact } from './entities/contact.entity';
import { ContactService } from './services/contact.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Contact])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule { }
