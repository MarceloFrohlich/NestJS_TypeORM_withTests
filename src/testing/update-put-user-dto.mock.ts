import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user-dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  birthAt: '2000-01-01',
  email: 'marcelo@gmail.com',
  name: 'Marcelo Frohlich',
  password: 'Abc@1234',
  role: Role.User,
};
