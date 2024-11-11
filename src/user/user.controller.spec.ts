import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .overrideGuard(ThrottlerGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validação de definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('getAll', async () => {
      const result = await userController.getAll();
      expect(result).toEqual(userEntityList);
    });
    test('getById', async () => {
      const result = await userController.getById(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update', async () => {
      const result = await userController.update(updatePutUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
    test('updatePartial', async () => {
      const result = await userController.updatePartial(updatePatchUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual(true);
    });
  });
});
