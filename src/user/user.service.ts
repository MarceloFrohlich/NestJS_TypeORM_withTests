import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (
      await this.usersRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este email já está sendo usado');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async getAll() {
    return this.usersRepository.find();
  }

  async getById(id: number) {
    await this.exists(id);
    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    { birthAt, email, name, password, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(id, {
      birthAt: birthAt ? new Date(birthAt) : null,
      email,
      name,
      password,
      role,
    });

    return this.getById(id);
  }

  async updatePartial(
    id: number,
    { birthAt, email, name, password, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    await this.usersRepository.update(id, {
      birthAt,
      email,
      name,
      password,
      role,
    });

    return this.getById(id);
  }

  async delete(id: number) {
    await this.exists(id);
    await this.usersRepository.delete(id);

    return true;
  }

  async exists(id: number) {
    if (
      !(await this.usersRepository.exists({
        where: { id },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
