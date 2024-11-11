import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user-dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'marcelo@gmail.com',
  name: 'Marcelo Frohlich',
  password: 'Abc@1234',
  role: Role.User,
};
