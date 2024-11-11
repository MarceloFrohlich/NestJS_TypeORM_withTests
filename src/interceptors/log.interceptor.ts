import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//Interceptador a fins didaticos para mostrar funcionamento, ele está interceptando as rotas e adicionando um console com o tempo de execução

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();

        console.log(`URL ${request.url}`);
        console.log(`Execução levou ${Date.now() - dt} milisegundos`);
      }),
    );
  }
}
