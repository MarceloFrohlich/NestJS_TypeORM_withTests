import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    birthAt: new Date('2000-01-01'),
    id: 1,
    email: 'marcelo@gmail.com',
    name: 'Marcelo Frohlich',
    password: '$2b$10$XokiJQff/efrPGsgdu8MrOFTVfHJ1bVftAmz51GpvAu.ONrA3rHXq',
    role: Role.Admin,
    createdAt: new Date('2024-07-11'),
    updatedAt: new Date('2024-08-11'),
  },
  {
    birthAt: new Date('2000-01-01'),
    id: 2,
    email: 'everton@gmail.com',
    name: 'Everton Cadona',
    password: '$2b$10$XokiJQff/efrPGsgdu8MrOFTVfHJ1bVftAmz51GpvAu.ONrA3rHXq',
    role: Role.User,
    createdAt: new Date('2024-07-11'),
    updatedAt: new Date('2024-08-11'),
  },
  {
    birthAt: new Date('2000-01-01'),
    id: 3,
    email: 'vitor@gmail.com',
    name: 'Vitor Doidera',
    password: '$2b$10$XokiJQff/efrPGsgdu8MrOFTVfHJ1bVftAmz51GpvAu.ONrA3rHXq',
    role: Role.User,
    createdAt: new Date('2024-07-11'),
    updatedAt: new Date('2024-08-11'),
  },
];
