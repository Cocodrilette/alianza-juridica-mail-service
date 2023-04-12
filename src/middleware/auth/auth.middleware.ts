import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  use(req: any, res: any, next: () => void) {
    passport.authenticate(
      'headerapikey',
      {
        session: false,
        failureRedirect: '/api/unauthorized',
      },
      (value) => {
        if (value) {
          next();
        } else {
          throw new UnauthorizedException();
        }
      },
    )(req, res, next);
  }
}
