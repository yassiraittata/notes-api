import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(email: string, password: string) {
    // see if the email is in use
    const users = await this.findUser(email);

    if (users.length) {
      throw new BadRequestException('Email in use!');
    }

    //  hashthe passwrod
    const hashedPw = await bcrypt.hash(password, 10);

    //  create an instance of the user Entity
    const newUser = this.repo.create({ email, password: hashedPw });

    //  Save the entity to the database
    return this.repo.save(newUser);
  }

  async signin(email: string, password: string) {
    const [user] = await this.findUser(email);

    if (!user) {
      throw new BadRequestException('User not exist');
    }

    const isPwMatch = await bcrypt.compare(password, user.password);

    if (!isPwMatch) {
      throw new BadRequestException('Incorect password');
    }

    return user;
  }

  findUser(email: string) {
    return this.repo.find({ where: { email } });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }
}
