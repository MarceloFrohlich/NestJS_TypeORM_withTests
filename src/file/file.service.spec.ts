import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhoto } from '../testing/get-photo.mock';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(FileService).toBeDefined();
  });

  describe('Teste do file service', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const filename = 'photo-teste.png';
      fileService.upload(photo, filename);
    });
  });
});
