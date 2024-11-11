import { AuthResetDTO } from '../auth/dto/auth-reset-dto';
import { resetToken } from './resetToken.mock';

export const AuthResetUserDTO: AuthResetDTO = {
  password: 'Abc@1234',
  token: resetToken,
};
