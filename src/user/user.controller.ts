import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdatePutUserDTO } from './dto/update-put-user-dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user-dto';
import { UserService } from './user.service';

import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { Role } from '../enums/role.enum';
import { ParamId } from '../decorators/param-id.decorator';

@Roles(Role.Admin) // Permissionamento de usuário
@UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @SkipThrottle() // Ignora o throttler
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@ParamId() id: number) {
    return this.userService.getById(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.userService.delete(id);
  }
}
