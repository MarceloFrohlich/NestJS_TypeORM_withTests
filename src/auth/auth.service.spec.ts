import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { usersRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/accessToken.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/resetToken.mock';
import { AuthRegisterUserDTO } from '../testing/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        usersRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar a definicao', () => {
    expect(authService).toBeDefined();
  });

  describe('token', () => {
    test('createToken', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({ accessToken });
    });

    test('checkToken', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('isValidToken', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('autenticação', () => {
    test('login', async () => {
      const result = await authService.login('marcelo@gmail.com', 'Abc@1234');
      expect(result).toEqual({ accessToken });
    });

    test('forget', async () => {
      const result = await authService.forget('marcelo@gmail.com');
      expect(result).toEqual({ success: true });
    });

    test('reset', async () => {
      const result = await authService.reset('Abc@1234', resetToken);
      expect(result).toEqual({ accessToken });
    });

    test('register', async () => {
      const result = await authService.register(AuthRegisterUserDTO);
      expect(result).toEqual({ accessToken });
    });
  });
});
