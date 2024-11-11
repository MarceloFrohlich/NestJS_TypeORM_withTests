import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      if (filter) {
        return user[filter];
      } else {
        return user;
      }
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no request. Use o AuthGuard para obter o usuário!',
      );
    }
  },
);
