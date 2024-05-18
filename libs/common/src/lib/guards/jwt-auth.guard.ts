import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma/client';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from '../decorators';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AUTH_SERVICE) private readonly authClientProxy: ClientProxy
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const jwt =
      request.headers['Authentication'] || request.cookies['Authentication'];

    if (!jwt) return false;

    return this.authClientProxy.send<User>('authenticate', jwt).pipe(
      tap((res: User) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
