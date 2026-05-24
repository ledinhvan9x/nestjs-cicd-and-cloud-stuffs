import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // ✅ SKIP metrics endpoint
    if (req.url.includes('/metrics')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((response) => {
        const hasMeta =
          response &&
          typeof response === 'object' &&
          'meta' in response &&
          'items' in response;

        return {
          success: true,
          data: hasMeta ? response.items : response,
          meta: hasMeta ? response.meta : null,
        };
      }),
    );
  }
}
