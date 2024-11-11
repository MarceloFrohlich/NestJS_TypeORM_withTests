import { FileService } from '../file/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    upload: jest.fn().mockResolvedValue(''),
    getDestinationPath: jest.fn(),
  },
};
