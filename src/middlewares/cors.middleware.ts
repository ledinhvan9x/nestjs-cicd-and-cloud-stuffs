import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  RequestMethod,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const getMethod = (method: number) => RequestMethod[method];

    const origins = request.headers.origin;

    const origin = (Array.isArray(origins) ? origins[0] : origins) || '';

    const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);

    const isDev = process.env.NODE_ENV === 'development';

    const allowedMethods = [
      RequestMethod.GET,
      RequestMethod.POST,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.DELETE,
      RequestMethod.HEAD,
    ];

    const allowedHeaders = [
      'Authorization',
      'Content-Type',
      'Origin',
      'Session-Id',
    ];

    const isAllowed = allowedOrigins.includes(origin);

    if (origin && (isAllowed || isDev)) {
      response.setHeader('Access-Control-Allow-Origin', origin);
    }

    response.header('Access-Control-Allow-Credentials', 'true');

    response.header('Access-Control-Allow-Headers', allowedHeaders.join(','));

    response.header(
      'Access-Control-Allow-Methods',
      allowedMethods.map(getMethod).join(','),
    );

    response.header('Access-Control-Max-Age', '86400');

    if (request.method === getMethod(RequestMethod.OPTIONS)) {
      return response.sendStatus(HttpStatus.NO_CONTENT);
    }

    next();
  }
}
